import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { ArrowLeft, ArrowRight, Home } from 'lucide-react';
import Quiz from './Quiz';

function preprocessSolutions(markdown) {
  if (!markdown) return '';
  
  // Match **[Solución]** followed by a fenced code block (```...```)
  return markdown.replace(
    /\*\*\[Solución\]\*\*\s*\n(```[\s\S]*?```)/g,
    (_, codeBlock) => {
      // Escape the code content for safe HTML embedding
      const lines = codeBlock.split('\n');
      // First line is ```lang, last line is ```
      const langMatch = lines[0].match(/^```(\w*)/);
      const lang = langMatch ? langMatch[1] : '';
      const codeContent = lines.slice(1, -1).join('\n')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
      
      return `<details class="solution-toggle">
<summary>💡 Ver Solución</summary>
<pre class="solution-code"><code class="language-${lang}">${codeContent}</code></pre>
</details>`;
    }
  );
}

export default function SlideView({ content, moduleQuiz, moduleId, courseId, onSlideChange }) {
  // Split markdown by horizontal rule (---)
  // We use regex to match lines that are exactly '---'
  const slides = content.split(/^---\s*$/m).filter(s => s.trim().length > 0);
  
  // Add a final slide for the Quiz
  const totalSlides = moduleQuiz ? slides.length + 1 : slides.length;

  const [currentSlide, setCurrentSlide] = useState(0);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentSlide]);

  const handleNext = () => {
    if (currentSlide < totalSlides - 1) {
      setCurrentSlide(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide(prev => prev - 1);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (
        e.target.tagName === 'INPUT' || 
        e.target.tagName === 'TEXTAREA' || 
        e.target.isContentEditable
      ) {
        return;
      }
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide, totalSlides]);

  const isQuizSlide = moduleQuiz && currentSlide === totalSlides - 1;

  // Notify parent of slide changes for AI chat context
  useEffect(() => {
    if (onSlideChange) {
      onSlideChange(isQuizSlide ? '' : slides[currentSlide] || '', isQuizSlide, currentSlide);
    }
  }, [currentSlide, totalSlides]);

  return (
    <div className="w-full flex flex-col bg-background-dark overflow-hidden h-full">
      
      {/* Header with Progress Bar and Controls */}
      <div className="flex flex-col bg-gray-800/50 px-4 sm:px-6 py-3 border-b border-gray-800 flex-shrink-0">
        <div className="flex justify-between items-center mb-3">
          
          {/* Left Navigation */}
          <div className="flex items-center gap-3 sm:gap-4">
            <Link to="/" className="text-gray-400 hover:text-primary transition-colors flex items-center gap-1.5" title="Inicio">
              <Home size={18} /> <span className="hidden sm:inline text-sm font-medium">Inicio</span>
            </Link>
            <div className="w-px h-4 bg-gray-700 hidden sm:block"></div>
            <Link to={`/${courseId || 'python'}`} className="text-gray-400 hover:text-primary transition-colors flex items-center gap-1.5" title="Volver al curso">
              <ArrowLeft size={18} /> <span className="hidden sm:inline text-sm font-medium">Curso</span>
            </Link>
          </div>

          {/* Center Title (Hidden on very small screens to avoid overflow) */}
          <span className="text-sm font-bold text-gray-300 hidden md:block">
            {isQuizSlide ? 'Evaluación' : `Diapositiva ${currentSlide + 1} de ${slides.length}`}
          </span>

          {/* Right Navigation (Next/Prev) */}
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              disabled={currentSlide === 0}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors ${
                currentSlide === 0 
                  ? 'opacity-50 cursor-not-allowed text-gray-500 bg-gray-800' 
                  : 'text-white bg-gray-800 hover:bg-gray-700'
              }`}
              title="Anterior"
            >
              <ArrowLeft size={16} /> <span className="hidden sm:inline">Anterior</span>
            </button>
            
            <button
              onClick={handleNext}
              disabled={currentSlide === totalSlides - 1}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-bold transition-colors ${
                currentSlide === totalSlides - 1
                  ? 'opacity-50 cursor-not-allowed text-gray-500 bg-gray-800'
                  : 'text-background-dark bg-primary hover:bg-primary/90'
              }`}
              title={isQuizSlide ? 'Finalizar' : 'Siguiente'}
            >
              <span className="hidden sm:inline">{isQuizSlide ? 'Finalizar' : 'Siguiente'}</span> <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-700 rounded-full h-1.5">
          <div 
            className="bg-primary h-1.5 rounded-full transition-all duration-300" 
            style={{ width: `${((currentSlide + 1) / totalSlides) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Slide Content Area */}
      <div ref={scrollRef} className="flex-1 flex flex-col p-8 lg:p-12 relative overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent bg-background-dark/30">
        {isQuizSlide ? (
          <div id="quiz-container" className="h-full flex items-center justify-center">
            <Quiz questions={moduleQuiz} moduleId={moduleId} courseId={courseId} />
          </div>
        ) : (
          <article className="prose prose-invert prose-p:text-gray-300 prose-p:text-lg prose-headings:text-white prose-a:text-primary hover:prose-a:text-primary/80 prose-pre:bg-gray-950 prose-pre:border prose-pre:border-gray-800 prose-pre:whitespace-pre-wrap prose-pre:break-words max-w-none w-full mx-auto my-auto block">
            <ReactMarkdown rehypePlugins={[rehypeRaw]}>
              {preprocessSolutions(slides[currentSlide])}
            </ReactMarkdown>
          </article>
        )}
      </div>
    </div>
  );
}
