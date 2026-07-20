import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Loader2, ChevronLeft, ChevronRight } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import rehypeSlug from 'rehype-slug';
import Quiz from '../components/Quiz';
import SlideView from '../components/SlideView';
import AiChat from '../components/AiChat';

export default function ModuleView() {
  const { courseId, moduleId } = useParams();
  const [content, setContent] = useState('');
  const [quizzes, setQuizzes] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentSlideContent, setCurrentSlideContent] = useState('');
  const [isQuizActive, setIsQuizActive] = useState(false);
  // Default to open on desktop, closed on mobile
  const [isChatOpen, setIsChatOpen] = useState(window.innerWidth > 1024);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const markdownFiles = import.meta.glob('../data/*/*.md', { query: '?raw', import: 'default' });
        const jsonFiles = import.meta.glob('../data/*/quizzes.json', { import: 'default' });

        const mdPath = `../data/${courseId}/module${moduleId}.md`;
        if (markdownFiles[mdPath]) {
          const textContent = await markdownFiles[mdPath]();
          setContent(textContent);
        } else {
          setContent('# Módulo no disponible por ahora');
        }

        const jsonPath = `../data/${courseId}/quizzes.json`;
        if (jsonFiles[jsonPath]) {
          const quizzesData = await jsonFiles[jsonPath]();
          setQuizzes(quizzesData);
        } else {
          console.warn(`No quizzes found for ${courseId}`);
          setQuizzes(null);
        }
      } catch (err) {
        console.error("Error loading data:", err);
        setContent(`# Error cargando el contenido del módulo.\n\n${err.message || err.toString()}`);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [courseId, moduleId]);

  if (loading) {
    return <div className="flex items-center justify-center min-h-[50vh]"><Loader2 className="animate-spin text-primary" size={48}/></div>;
  }

  let moduleQuiz = null;
  if (quizzes) {
    if (moduleId === '30') {
      moduleQuiz = Object.values(quizzes).flat();
    } else {
      moduleQuiz = quizzes[`module${moduleId}`];
    }
  }

  const handleSlideChange = (slideText, isQuiz, index) => {
    setCurrentSlideContent(slideText);
    setIsQuizActive(isQuiz);
    setCurrentSlideIndex(index);
    // Auto-close chat when entering quiz
    if (isQuiz && isChatOpen) {
      setIsChatOpen(false);
    }
  };

  return (
    <div className="flex w-full h-[calc(100vh-64px)] overflow-hidden relative">
      {/* Theory/Slide Section */}
      <div 
        className={`transition-all duration-300 ease-in-out h-full flex flex-col
          ${isChatOpen ? 'w-full lg:w-[60%]' : 'w-full'}
        `}
      >
        <SlideView 
          content={content} 
          moduleQuiz={moduleQuiz} 
          moduleId={moduleId} 
          courseId={courseId} 
          onSlideChange={handleSlideChange}
        />
      </div>

      {/* Vertical Separator Bar (Desktop only) */}
      <div 
        className="hidden lg:flex flex-col items-center w-3 flex-shrink-0 bg-gray-800/60 hover:bg-gray-700/60 cursor-pointer transition-colors relative group"
        onClick={() => setIsChatOpen(!isChatOpen)}
        title={isChatOpen ? 'Cerrar chat' : 'Abrir chat'}
      >
        {/* Chevron toggle centered on the bar */}
        <div className="absolute top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-6 h-10 bg-gray-800 border border-gray-700 rounded-md group-hover:bg-gray-700 group-hover:border-gray-600 transition-colors shadow-lg">
          {isChatOpen ? (
            <ChevronRight size={16} className="text-gray-400 group-hover:text-primary transition-colors" />
          ) : (
            <ChevronLeft size={16} className="text-gray-400 group-hover:text-primary transition-colors" />
          )}
        </div>
      </div>

      {/* AI Chat Section (Desktop only, side-by-side) */}
      <div 
        className={`transition-all duration-300 ease-in-out hidden lg:flex flex-col h-full bg-[#0d0d0d]
          ${isChatOpen ? 'w-[40%] opacity-100' : 'w-0 opacity-0 overflow-hidden'}
        `}
      >
        <AiChat
          isOpen={isChatOpen}
          onToggle={() => setIsChatOpen(!isChatOpen)}
          slideContent={currentSlideContent}
          courseId={courseId}
          moduleId={moduleId}
          slideIndex={currentSlideIndex}
        />
      </div>

      {/* Mobile Chat (controlled inside AiChat via portal) */}
      <div className="lg:hidden">
        <AiChat
          isOpen={isChatOpen}
          onToggle={() => setIsChatOpen(!isChatOpen)}
          slideContent={currentSlideContent}
          courseId={courseId}
          moduleId={moduleId}
          slideIndex={currentSlideIndex}
        />
      </div>
    </div>
  );
}
