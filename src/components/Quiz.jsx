import { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, XCircle, Clock, X, AlertTriangle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';

export default function Quiz({ questions, moduleId, courseId }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [quizKey, setQuizKey] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const isFinalExam = moduleId === '30';
  const totalQuestions = isFinalExam ? 30 : 10;
  const passingScore = isFinalExam ? 24 : 8;
  const initialTime = isFinalExam ? 900 : 300;

  const [timeLeft, setTimeLeft] = useState(initialTime);

  const shuffledQuestions = useMemo(() => {
    return [...questions].sort(() => 0.5 - Math.random()).slice(0, totalQuestions);
  }, [questions, quizKey, totalQuestions]);

  const resetQuiz = useCallback(() => {
    setIsStarted(false);
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setIsFinished(false);
    setTimeLeft(initialTime);
    setQuizKey(prev => prev + 1);
  }, [initialTime]);

  const finishQuiz = useCallback(() => {
    setIsFinished(true);
  }, []);

  // UseEffect dedicado a guardar el progreso
  useEffect(() => {
    async function saveProgress() {
      if (isFinished && user && score >= passingScore) {
        const { error } = await supabase
          .from('user_progress')
          .upsert({
            user_id: user.id,
            course_id: courseId,
            day_id: parseInt(moduleId),
            score: score
          }, { onConflict: 'user_id, course_id, day_id' });
          
        if (error) {
          console.error("Error saving progress to Supabase:", error.message);
        }
      }
    }
    saveProgress();
  }, [isFinished, user, score, passingScore, courseId, moduleId]);

  useEffect(() => {
    let timer;
    if (isStarted && !isFinished && !isAnswered && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            finishQuiz();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isStarted, isFinished, isAnswered, timeLeft, finishQuiz]);

  const currentQuestion = shuffledQuestions[currentQuestionIndex];

  const handleSelect = (index) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);
    
    if (index === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < shuffledQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      finishQuiz();
    }
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  if (!isStarted && !isFinished) {
    return (
      <div className="p-8 rounded-2xl bg-gray-900 border border-gray-800 text-center space-y-6">
        <h3 className="text-2xl font-bold">Evaluación del Módulo {moduleId}</h3>
        <p className="text-gray-400">
          Demuestra lo que has aprendido. Tienes <strong className="text-white">{Math.floor(initialTime / 60)} minutos</strong> para completar {totalQuestions} preguntas. 
          Una vez iniciado, no podrás volver atrás sin perder tu progreso.
        </p>
        <button 
          onClick={() => setIsStarted(true)}
          className="px-8 py-3 bg-primary text-background-dark font-bold rounded-lg hover:scale-105 transition-transform"
        >
          Iniciar Quiz
        </button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] bg-background-dark/95 backdrop-blur-md flex flex-col items-center justify-center p-4 sm:p-6 animate-in fade-in duration-300 overflow-hidden">
      
      {/* Modal de Confirmación de Salida */}
      {showExitConfirm && (
        <div className="fixed inset-0 z-[200] bg-black/80 flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 max-w-md w-full shadow-2xl text-center space-y-6">
            <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto">
              <AlertTriangle className="text-red-500" size={32} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-2">¿Estás seguro de salir?</h3>
              <p className="text-gray-400">Perderás todo tu progreso actual en la evaluación y tendrás que empezar de nuevo.</p>
            </div>
            <div className="flex gap-4 pt-4">
              <button 
                onClick={() => setShowExitConfirm(false)}
                className="flex-1 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors"
              >
                Cancelar
              </button>
              <button 
                onClick={() => {
                  setShowExitConfirm(false);
                  resetQuiz();
                  navigate(`/${courseId}`);
                }}
                className="px-6 py-2 bg-red-500/20 text-red-400 font-bold rounded-lg border border-red-500/50 hover:bg-red-500/30 transition-colors"
              >
                Sí, salir
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Botón Cerrar Absolute */}
      <button 
        onClick={() => setShowExitConfirm(true)}
        className="absolute top-4 right-4 text-gray-400 hover:text-white bg-gray-800 hover:bg-gray-700 p-2 rounded-full transition-colors z-10"
      >
        <X size={24} />
      </button>

      {isFinished ? (
        <div className="w-full max-w-2xl p-10 rounded-2xl bg-gray-900 border border-gray-800 text-center space-y-6 shadow-2xl animate-in zoom-in-95">
          <h3 className="text-3xl font-bold">Resultados del Módulo {moduleId}</h3>
          
          {timeLeft === 0 && (
            <div className="flex items-center justify-center gap-2 text-yellow-500 bg-yellow-500/10 p-3 rounded-lg border border-yellow-500/20 mx-auto max-w-sm mb-4">
              <AlertTriangle size={20} /> ¡El tiempo se ha agotado!
            </div>
          )}

          <p className="text-7xl font-black text-primary">{score} / {shuffledQuestions.length}</p>
          <div className={`p-4 rounded-xl font-medium ${score >= passingScore ? 'bg-green-900/30 text-green-400 border border-green-800' : 'bg-red-900/30 text-red-400 border border-red-800'}`}>
            {score >= passingScore 
              ? `¡Felicidades! Has superado el puntaje mínimo de ${passingScore}/${totalQuestions} y completaste este desafío con éxito.` 
              : `No has alcanzado el puntaje mínimo de ${passingScore}/${totalQuestions}. Repasa la teoría e inténtalo de nuevo.`}
          </div>
          
          <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center">
            {score < passingScore ? (
              <>
                <button 
                  onClick={resetQuiz}
                  className="px-6 py-2.5 bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Reintentar Quiz
                </button>
                <button 
                  onClick={() => { resetQuiz(); navigate(`/${courseId}`); }}
                  className="px-6 py-2.5 bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Volver a la Ruta
                </button>
              </>
            ) : (
              <>
                <button 
                  onClick={() => { resetQuiz(); navigate(`/${courseId}`); }}
                  className="px-6 py-2.5 bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Volver a la Ruta
                </button>
                <button 
                  onClick={() => { resetQuiz(); navigate(isFinalExam ? `/${courseId}` : `/${courseId}/module/${parseInt(moduleId) + 1}`); }}
                  className="px-6 py-2.5 bg-primary text-background-dark font-bold rounded-lg hover:bg-primary/90 transition-colors"
                >
                  {isFinalExam ? 'Finalizar Curso' : 'Siguiente Lección'}
                </button>
              </>
            )}
          </div>
        </div>
      ) : (
        <div className="w-full max-w-5xl flex flex-col bg-gray-900 border border-gray-800 shadow-2xl rounded-2xl overflow-hidden max-h-[90vh]">
          
          {/* Header Compacto */}
          <div className="flex justify-between items-center bg-gray-800/50 px-6 py-4 border-b border-gray-800 flex-shrink-0">
            <div className="flex flex-col gap-1.5 w-1/2">
              <span className="text-sm font-bold text-gray-300">Pregunta {currentQuestionIndex + 1} de {shuffledQuestions.length}</span>
              <div className="w-full bg-gray-700 rounded-full h-1.5">
                <div className="bg-primary h-1.5 rounded-full transition-all duration-300" style={{ width: `${((currentQuestionIndex) / shuffledQuestions.length) * 100}%` }}></div>
              </div>
            </div>
            <div className={`flex items-center gap-2 font-mono text-lg font-bold px-4 py-1.5 rounded-lg border ${isAnswered ? 'bg-gray-800 text-gray-500 border-gray-700' : timeLeft < 60 ? 'bg-red-500/10 text-red-500 border-red-500/50 animate-pulse' : 'bg-gray-800 text-primary border-gray-700'}`}>
              <Clock size={18} /> {formatTime(timeLeft)} {isAnswered && <span className="text-xs text-gray-500 ml-1">⏸</span>}
            </div>
          </div>

          {/* Scrollable Body */}
          <div className="p-6 flex flex-col gap-6 overflow-y-auto flex-1">
            <h3 className="text-xl sm:text-2xl font-bold text-white leading-tight">{currentQuestion.question}</h3>
            
            {/* Grid 2x2 para las opciones */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {currentQuestion.options.map((option, index) => {
                let buttonStateClass = "border-gray-700 hover:border-gray-500 hover:bg-gray-800";
                
                if (isAnswered) {
                  if (index === currentQuestion.correctAnswer) {
                    buttonStateClass = "border-green-500 bg-green-500/10 text-green-400";
                  } else if (index === selectedOption) {
                    buttonStateClass = "border-red-500 bg-red-500/10 text-red-400";
                  } else {
                    buttonStateClass = "border-gray-800 opacity-50";
                  }
                }

                return (
                  <button
                    key={index}
                    onClick={() => handleSelect(index)}
                    disabled={isAnswered}
                    className={`text-left p-4 rounded-xl border-2 transition-all duration-200 flex items-start gap-3 ${buttonStateClass}`}
                  >
                    <div className="mt-0.5 flex-shrink-0">
                      {isAnswered && index === currentQuestion.correctAnswer && <CheckCircle size={20} className="text-green-500" />}
                      {isAnswered && index === selectedOption && index !== currentQuestion.correctAnswer && <XCircle size={20} className="text-red-500" />}
                      {(!isAnswered || (index !== currentQuestion.correctAnswer && index !== selectedOption)) && (
                        <div className="w-5 h-5 rounded-full border-2 border-current opacity-50"></div>
                      )}
                    </div>
                    <span className="flex-1 text-sm sm:text-base leading-snug">{option}</span>
                  </button>
                );
              })}
            </div>

            {/* Justificación (scrollable dentro del body) */}
            {isAnswered && (
              <div className="p-4 rounded-xl bg-background-card border border-gray-800 animate-in fade-in slide-in-from-bottom-4">
                <div className="flex items-center gap-2 mb-1.5">
                  {selectedOption === currentQuestion.correctAnswer ? (
                    <span className="text-green-400 font-bold flex items-center gap-1.5"><CheckCircle size={16}/> ¡Correcto!</span>
                  ) : (
                    <span className="text-red-400 font-bold flex items-center gap-1.5"><XCircle size={16}/> Incorrecto</span>
                  )}
                </div>
                <p className="text-gray-300 text-sm sm:text-base"><strong className="text-white">Justificación:</strong> {currentQuestion.justification}</p>
              </div>
            )}
          </div>

          {/* Botón Siguiente - Siempre visible al fondo */}
          {isAnswered && (
            <div className="flex-shrink-0 border-t border-gray-800 bg-gray-900 px-6 py-4 animate-in fade-in slide-in-from-bottom-2">
              <button 
                onClick={handleNext}
                className="w-full py-3.5 px-6 bg-primary text-background-dark font-bold text-lg rounded-xl hover:bg-primary/90 transition-transform hover:scale-[1.01]"
              >
                {currentQuestionIndex < shuffledQuestions.length - 1 ? 'Siguiente >>' : 'Finalizar'}
              </button>
            </div>
          )}

        </div>
      )}
    </div>
  );
}
