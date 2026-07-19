import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
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
  const [isChatOpen, setIsChatOpen] = useState(false);
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
        const keys = Object.keys(markdownFiles).join(', ');
        setContent(`# Error cargando el contenido del módulo.\n\n${err.message || err.toString()}\n\nKeys: ${keys}\n\nmdPath: ${mdPath}`);
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
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500 pb-20 relative pt-4">
      <SlideView 
        content={content} 
        moduleQuiz={moduleQuiz} 
        moduleId={moduleId} 
        courseId={courseId} 
        onSlideChange={handleSlideChange}
      />

      {/* AI Chat — hidden during quiz but kept mounted to preserve state */}
      <div className={isQuizActive ? 'hidden' : 'block'}>
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
