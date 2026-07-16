import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import rehypeSlug from 'rehype-slug';
import Quiz from '../components/Quiz';
import SlideView from '../components/SlideView';
import AiChat from '../components/AiChat';

export default function DayView() {
  const { courseId, dayId } = useParams();
  const [content, setContent] = useState('');
  const [quizzes, setQuizzes] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentSlideContent, setCurrentSlideContent] = useState('');
  const [isQuizActive, setIsQuizActive] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        let mdModule;
        try {
          mdModule = await import(`../data/${courseId}/day${dayId}.md?raw`);
        } catch (e) {
          mdModule = { default: '# Día no disponible por ahora' };
        }
        const textContent = mdModule.default;
        setContent(textContent);

        let quizModule;
        try {
          quizModule = await import(`../data/${courseId}/quizzes.json`);
          setQuizzes(quizModule.default);
        } catch (e) {
          console.warn(`No quizzes found for ${courseId}`);
          setQuizzes(null);
        }
      } catch (err) {
        console.error("Error loading data:", err);
        setContent('# Error cargando el contenido del día.');
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [dayId]);

  if (loading) {
    return <div className="flex items-center justify-center min-h-[50vh]"><Loader2 className="animate-spin text-primary" size={48}/></div>;
  }

  let dayQuiz = null;
  if (quizzes) {
    if (dayId === '30') {
      dayQuiz = Object.values(quizzes).flat();
    } else {
      dayQuiz = quizzes[`day${dayId}`];
    }
  }

  const handleSlideChange = (slideText, isQuiz) => {
    setCurrentSlideContent(slideText);
    setIsQuizActive(isQuiz);
    // Auto-close chat when entering quiz
    if (isQuiz && isChatOpen) {
      setIsChatOpen(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500 pb-20 relative pt-4">
      <SlideView 
        content={content} 
        dayQuiz={dayQuiz} 
        dayId={dayId} 
        courseId={courseId} 
        onSlideChange={handleSlideChange}
      />

      {/* AI Chat — hidden during quiz */}
      {!isQuizActive && (
        <AiChat
          isOpen={isChatOpen}
          onToggle={() => setIsChatOpen(!isChatOpen)}
          slideContent={currentSlideContent}
          courseId={courseId}
          dayId={dayId}
        />
      )}
    </div>
  );
}
