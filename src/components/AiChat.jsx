import { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { MessageSquare, X, Send, Settings, Sparkles, Trash2, ChevronDown } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';

const PROVIDERS = [
  { id: 'openai', name: 'OpenAI', placeholder: 'sk-...' },
  { id: 'anthropic', name: 'Anthropic', placeholder: 'sk-ant-...' },
  { id: 'google', name: 'Google Gemini', placeholder: 'AIza...' },
];

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

function getStoredConfig() {
  try {
    const raw = localStorage.getItem('vitka_ai_config');
    if (raw) return JSON.parse(raw);
  } catch {}
  return null;
}

function setStoredConfig(config) {
  localStorage.setItem('vitka_ai_config', JSON.stringify(config));
}

export default function AiChat({ isOpen, onToggle, slideContent, courseId, dayId }) {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [provider, setProvider] = useState('openai');
  const [apiKey, setApiKey] = useState('');
  const [hasConfig, setHasConfig] = useState(false);
  const [streamingText, setStreamingText] = useState('');
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const abortRef = useRef(null);

  // Load config from localStorage
  useEffect(() => {
    const config = getStoredConfig();
    if (config?.apiKey && config?.provider) {
      setProvider(config.provider);
      setApiKey(config.apiKey);
      setHasConfig(true);
    }
  }, []);

  // Load chat history from Supabase
  useEffect(() => {
    if (!user || !courseId || !dayId) return;
    
    async function loadHistory() {
      const { data, error } = await supabase
        .from('ai_chat_messages')
        .select('role, content, created_at')
        .eq('user_id', user.id)
        .eq('course_id', courseId)
        .eq('day_id', parseInt(dayId))
        .order('created_at', { ascending: true });

      if (!error && data) {
        setMessages(data.map(m => ({ role: m.role, content: m.content })));
      }
    }
    loadHistory();
  }, [user, courseId, dayId]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, streamingText]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && hasConfig) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen, hasConfig]);

  const saveConfig = () => {
    if (!apiKey.trim()) return;
    setStoredConfig({ provider, apiKey: apiKey.trim() });
    setHasConfig(true);
    setIsConfigOpen(false);
  };

  const saveMessage = async (role, content) => {
    if (!user) return;
    await supabase.from('ai_chat_messages').insert({
      user_id: user.id,
      course_id: courseId,
      day_id: parseInt(dayId),
      role,
      content,
    });
  };

  const clearHistory = async () => {
    if (!user) return;
    await supabase
      .from('ai_chat_messages')
      .delete()
      .eq('user_id', user.id)
      .eq('course_id', courseId)
      .eq('day_id', parseInt(dayId));
    setMessages([]);
  };

  const sendMessage = useCallback(async (text) => {
    if (!text.trim() || isLoading || !hasConfig) return;

    const userMessage = { role: 'user', content: text.trim() };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);
    setStreamingText('');

    // Save user message to DB
    await saveMessage('user', userMessage.content);

    // Build the system prompt with slide context
    const systemMessage = {
      role: 'system',
      content: `Eres un asistente de IA tutor para un curso de programación. El estudiante está viendo actualmente el siguiente contenido de la lección:\n\n---\n${slideContent || 'No hay contenido de diapositiva disponible.'}\n---\n\nAyuda al estudiante a entender este material. Responde preguntas de forma clara y concisa. Usa ejemplos de código cuando sea útil. Responde siempre en español.`,
    };

    const apiMessages = [systemMessage, ...newMessages];

    try {
      const session = await supabase.auth.getSession();
      const accessToken = session?.data?.session?.access_token;

      const controller = new AbortController();
      abortRef.current = controller;

      const response = await fetch(`${SUPABASE_URL}/functions/v1/ai-chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
          'apikey': SUPABASE_ANON_KEY,
        },
        body: JSON.stringify({
          provider,
          apiKey,
          messages: apiMessages,
        }),
        signal: controller.signal,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Error ${response.status}`);
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let fullText = '';
      let buffer = '';

      while (reader) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (line === 'data: [DONE]') continue;
          if (!line.startsWith('data: ')) continue;

          try {
            const parsed = JSON.parse(line.slice(6));
            if (parsed.text) {
              fullText += parsed.text;
              setStreamingText(fullText);
            }
          } catch {}
        }
      }

      if (fullText) {
        const assistantMessage = { role: 'assistant', content: fullText };
        setMessages(prev => [...prev, assistantMessage]);
        await saveMessage('assistant', fullText);
      }
    } catch (err) {
      if (err.name !== 'AbortError') {
        const errorMsg = { role: 'assistant', content: `⚠️ Error: ${err.message}. Verifica tu API key e intenta de nuevo.` };
        setMessages(prev => [...prev, errorMsg]);
      }
    } finally {
      setIsLoading(false);
      setStreamingText('');
      abortRef.current = null;
    }
  }, [messages, isLoading, hasConfig, slideContent, provider, apiKey, user, courseId, dayId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleSuggestion = (text) => {
    sendMessage(text);
  };

  const suggestedQuestions = [
    '🤔 Dame un ejemplo',
    '❓ No entendí esto',
  ];

  // --- FAB Button (always rendered when chat is not open) ---
  if (!isOpen) {
    return createPortal(
      <button
        onClick={onToggle}
        className="ai-chat-fab"
        title="Asistente IA"
      >
        <Sparkles size={22} />
      </button>,
      document.body
    );
  }

  // --- Config Modal ---
  const renderConfig = () => (
    <div className="ai-chat-config">
      <div className="flex items-center gap-2 mb-4">
        <Settings size={18} className="text-primary" />
        <h3 className="font-bold text-white text-base">Configurar Asistente IA</h3>
      </div>
      <div className="space-y-3">
        <div>
          <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1 block">Proveedor</label>
          <div className="grid grid-cols-3 gap-2">
            {PROVIDERS.map(p => (
              <button
                key={p.id}
                onClick={() => setProvider(p.id)}
                className={`px-3 py-2 rounded-lg text-xs font-bold transition-all ${
                  provider === p.id
                    ? 'bg-primary/20 text-primary border border-primary/50'
                    : 'bg-gray-800 text-gray-400 border border-gray-700 hover:border-gray-500'
                }`}
              >
                {p.name}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1 block">API Key</label>
          <input
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder={PROVIDERS.find(p => p.id === provider)?.placeholder}
            className="w-full px-3 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-primary transition-colors"
            onKeyDown={(e) => e.key === 'Enter' && saveConfig()}
          />
        </div>
        <button
          onClick={saveConfig}
          disabled={!apiKey.trim()}
          className="w-full py-2.5 bg-primary text-background-dark font-bold rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed text-sm"
        >
          Guardar y conectar
        </button>
      </div>
      <p className="text-[10px] text-gray-500 mt-3 leading-relaxed">
        Tu API key se guarda únicamente en tu navegador y se usa para conectar directamente con el proveedor de IA.
      </p>
    </div>
  );

  // --- Chat Panel ---
  return createPortal(
    <>
      {/* Desktop Panel */}
      <div className="ai-chat-panel hidden lg:flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800 flex-shrink-0 bg-gray-800/50">
          <div className="flex items-center gap-2">
            <Sparkles size={16} className="text-primary" />
            <span className="font-bold text-sm text-white">Asistente IA</span>
          </div>
          <div className="flex items-center gap-1">
            {hasConfig && (
              <>
                <button onClick={clearHistory} className="p-1.5 text-gray-500 hover:text-red-400 transition-colors rounded-lg" title="Limpiar chat">
                  <Trash2 size={14} />
                </button>
                <button onClick={() => setIsConfigOpen(!isConfigOpen)} className="p-1.5 text-gray-500 hover:text-primary transition-colors rounded-lg" title="Configuración">
                  <Settings size={14} />
                </button>
              </>
            )}
            <button onClick={onToggle} className="p-1.5 text-gray-500 hover:text-white transition-colors rounded-lg">
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Body */}
        {(!hasConfig || isConfigOpen) ? (
          <div className="flex-1 flex items-center justify-center p-4">
            {renderConfig()}
          </div>
        ) : (
          <>
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
              {messages.length === 0 && !isLoading && (
                <div className="flex flex-col items-center justify-center h-full text-center gap-3 py-8">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Sparkles size={24} className="text-primary" />
                  </div>
                  <p className="text-gray-400 text-sm">¿Tenés alguna duda sobre esta diapositiva?</p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {suggestedQuestions.map((q, i) => (
                      <button
                        key={i}
                        onClick={() => handleSuggestion(q.replace(/^[^\s]+\s/, ''))}
                        className="px-3 py-1.5 bg-gray-800 border border-gray-700 rounded-full text-xs text-gray-300 hover:border-primary hover:text-primary transition-colors"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                    msg.role === 'user'
                      ? 'bg-primary/20 text-white rounded-br-md'
                      : 'bg-gray-800 text-gray-200 rounded-bl-md border border-gray-700'
                  }`}>
                    {msg.content}
                  </div>
                </div>
              ))}

              {/* Streaming message */}
              {isLoading && streamingText && (
                <div className="flex justify-start">
                  <div className="max-w-[85%] px-3.5 py-2.5 rounded-2xl rounded-bl-md text-sm leading-relaxed bg-gray-800 text-gray-200 border border-gray-700 whitespace-pre-wrap">
                    {streamingText}
                    <span className="ai-chat-cursor">▊</span>
                  </div>
                </div>
              )}

              {/* Loading dots */}
              {isLoading && !streamingText && (
                <div className="flex justify-start">
                  <div className="px-4 py-3 rounded-2xl rounded-bl-md bg-gray-800 border border-gray-700">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="flex-shrink-0 p-3 border-t border-gray-800 bg-gray-900/50">
              <div className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Preguntá algo..."
                  disabled={isLoading}
                  className="flex-1 px-3.5 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="p-2.5 bg-primary text-background-dark rounded-xl hover:bg-primary/90 transition-colors disabled:opacity-30 disabled:cursor-not-allowed flex-shrink-0"
                >
                  <Send size={16} />
                </button>
              </div>
            </form>
          </>
        )}
      </div>

      {/* Mobile Bottom Sheet */}
      <div className="ai-chat-bottomsheet lg:hidden">
        <div className="ai-chat-bottomsheet-overlay" onClick={onToggle}></div>
        <div className="ai-chat-bottomsheet-content">
          {/* Drag Handle */}
          <div className="flex justify-center py-2 flex-shrink-0">
            <div className="w-10 h-1 bg-gray-600 rounded-full"></div>
          </div>

          {/* Header */}
          <div className="flex items-center justify-between px-4 py-2 border-b border-gray-800 flex-shrink-0">
            <div className="flex items-center gap-2">
              <Sparkles size={16} className="text-primary" />
              <span className="font-bold text-sm text-white">Asistente IA</span>
            </div>
            <div className="flex items-center gap-1">
              {hasConfig && (
                <>
                  <button onClick={clearHistory} className="p-1.5 text-gray-500 hover:text-red-400 transition-colors rounded-lg" title="Limpiar chat">
                    <Trash2 size={14} />
                  </button>
                  <button onClick={() => setIsConfigOpen(!isConfigOpen)} className="p-1.5 text-gray-500 hover:text-primary transition-colors rounded-lg" title="Configuración">
                    <Settings size={14} />
                  </button>
                </>
              )}
              <button onClick={onToggle} className="p-1.5 text-gray-500 hover:text-white transition-colors rounded-lg">
                <ChevronDown size={18} />
              </button>
            </div>
          </div>

          {/* Body */}
          {(!hasConfig || isConfigOpen) ? (
            <div className="flex-1 flex items-center justify-center p-4 overflow-y-auto">
              {renderConfig()}
            </div>
          ) : (
            <>
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {messages.length === 0 && !isLoading && (
                  <div className="flex flex-col items-center justify-center h-full text-center gap-3 py-6">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Sparkles size={20} className="text-primary" />
                    </div>
                    <p className="text-gray-400 text-sm">¿Tenés alguna duda?</p>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {suggestedQuestions.map((q, i) => (
                        <button
                          key={i}
                          onClick={() => handleSuggestion(q.replace(/^[^\s]+\s/, ''))}
                          className="px-3 py-1.5 bg-gray-800 border border-gray-700 rounded-full text-xs text-gray-300 hover:border-primary hover:text-primary transition-colors"
                        >
                          {q}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {messages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                      msg.role === 'user'
                        ? 'bg-primary/20 text-white rounded-br-md'
                        : 'bg-gray-800 text-gray-200 rounded-bl-md border border-gray-700'
                    }`}>
                      {msg.content}
                    </div>
                  </div>
                ))}

                {isLoading && streamingText && (
                  <div className="flex justify-start">
                    <div className="max-w-[85%] px-3.5 py-2.5 rounded-2xl rounded-bl-md text-sm leading-relaxed bg-gray-800 text-gray-200 border border-gray-700 whitespace-pre-wrap">
                      {streamingText}
                      <span className="ai-chat-cursor">▊</span>
                    </div>
                  </div>
                )}

                {isLoading && !streamingText && (
                  <div className="flex justify-start">
                    <div className="px-4 py-3 rounded-2xl rounded-bl-md bg-gray-800 border border-gray-700">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <form onSubmit={handleSubmit} className="flex-shrink-0 p-3 border-t border-gray-800 bg-gray-900/80 backdrop-blur-sm">
                <div className="flex items-center gap-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Preguntá algo..."
                    disabled={isLoading}
                    className="flex-1 px-3.5 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors disabled:opacity-50"
                  />
                  <button
                    type="submit"
                    disabled={!input.trim() || isLoading}
                    className="p-2.5 bg-primary text-background-dark rounded-xl hover:bg-primary/90 transition-colors disabled:opacity-30 disabled:cursor-not-allowed flex-shrink-0"
                  >
                    <Send size={16} />
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </>,
    document.body
  );
}
