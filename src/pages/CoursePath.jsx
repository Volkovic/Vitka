import { Link, useParams, Navigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, Lock, ArrowRight, Code2, Terminal, Database, GitBranch, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import { useState, useEffect } from 'react';

import { pythonTitles, javascriptTitles, sqlTitles, gitTitles } from '../data/courseTitles';

export default function CoursePath() {
  const { courseId } = useParams();

  const { user, loading: authLoading } = useAuth();
  const [currentCompletedModules, setCurrentCompletedModules] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    async function loadProgress() {
      const { data, error } = await supabase
        .from('user_progress')
        .select('module_id')
        .eq('user_id', user.id)
        .eq('course_id', courseId);
      
      if (!error && data) {
        // Encontramos cuntos das complet. Asumimos que los das se completan secuencialmente.
        // O podemos simplemente habilitar el da = mximo da completado + 1
        const maxModule = data.reduce((max, curr) => Math.max(max, curr.module_id), 0);
        setCurrentCompletedModules(maxModule);
      }
      setLoading(false);
    }
    loadProgress();
  }, [user, courseId]);

  if (courseId !== 'python' && courseId !== 'javascript' && courseId !== 'sql' && courseId !== 'git') {
    return <Navigate to="/" />;
  }

  const isPython = courseId === 'python';
  const isSql = courseId === 'sql';
  const isGit = courseId === 'git';
  
  const moduleTitles = isPython ? pythonTitles : (isSql ? sqlTitles : (isGit ? gitTitles : javascriptTitles));
  const courseName = isPython ? 'Python' : (isSql ? 'SQL' : (isGit ? 'Git/GitHub' : 'JavaScript'));
  const Icon = isPython ? Terminal : (isSql ? Database : (isGit ? GitBranch : Code2));

  if (authLoading || loading) {
    return <div className="flex items-center justify-center min-h-[50vh]"><Loader2 className="animate-spin text-primary" size={48}/></div>;
  }

  // Si no estǭ logueado, lo mandamos a login para que guarde su progreso
  if (!user) {
    return <Navigate to="/login" />;
  }

  const modules = Array.from({ length: moduleTitles.length }, (_, i) => {
    const moduleId = i + 1;
    
    let status = 'locked';
    if (moduleId <= currentCompletedModules) {
      status = 'completed';
    } else if (moduleId === currentCompletedModules + 1) {
      status = 'available';
    }
    
    return {
      id: moduleId,
      title: moduleTitles[i] || `Tema ${moduleId}`,
      status: status
    };
  });

  const progressPercentage = Math.round((currentCompletedModules / moduleTitles.length) * 100);

  return (
    <div className="max-w-6xl mx-auto space-y-10 animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col gap-6 border-b border-gray-800 pb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-4xl sm:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-primary to-green-400">Ruta de {courseName}</h1>
            <span className="px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-bold border border-primary/20 shadow-[0_0_15px_rgba(209,254,23,0.2)]">{moduleTitles.length} Módulos</span>
          </div>
          <Icon size={48} className="text-gray-800 hidden sm:block" />
        </div>
        
        <div className="space-y-3 w-full max-w-2xl">
          <div className="flex justify-between text-sm font-medium">
            <span className="text-text-muted">Progreso del curso</span>
            <span className="text-primary font-bold">{progressPercentage}% ({currentCompletedModules}/{moduleTitles.length})</span>
          </div>
          <div className="w-full bg-gray-800/50 rounded-full h-3 overflow-hidden border border-gray-800 shadow-inner">
            <div className="bg-gradient-to-r from-green-500 to-primary h-full rounded-full transition-all duration-1000 ease-out" style={{ width: `${progressPercentage}%` }}></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {modules.map((module) => {
          const isLocked = module.status === 'locked';
          const isCompleted = module.status === 'completed';
          const isAvailable = module.status === 'available';
          
          let cardClasses = "group relative flex flex-col h-full min-h-[9rem] p-4 rounded-2xl border transition-all duration-300 overflow-hidden ";
          
          if (isLocked) {
            cardClasses += "border-gray-800 bg-gray-900/40 cursor-not-allowed";
          } else if (isCompleted) {
            cardClasses += "border-primary/40 bg-primary/10 shadow-[0_0_15px_rgba(209,254,23,0.05)] hover:border-primary hover:-translate-y-1 hover:shadow-[0_8px_20px_rgb(209,254,23,0.2)]";
          } else if (isAvailable) {
            // Estilo intermedio para "Disponible". Se le agrega un borde ligeramente iluminado y un hover fuerte.
            cardClasses += "border-gray-600 bg-background-card hover:border-primary hover:-translate-y-1 hover:shadow-[0_8px_20px_rgb(209,254,23,0.2)] ring-1 ring-white/5";
          }

          return (
            <Link 
              key={module.id} 
              to={`/${courseId}/module/${module.id}`}
              className={cardClasses}
            >
              {/* Resplandor de fondo al hacer hover en cards interactivos */}
              {!isLocked && (
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              )}

              <div className="flex justify-between items-start z-10">
                <span className={`text-4xl font-black tracking-tighter ${isCompleted ? 'text-primary' : isLocked ? 'text-gray-800' : 'text-gray-400 group-hover:text-primary transition-colors'}`}>
                  {module.id.toString().padStart(2, '0')}
                </span>
                
                {/* Icon Container */}
                <div className={`p-1.5 rounded-full backdrop-blur-sm transition-colors
                  ${isCompleted ? 'bg-primary/20 text-primary' : ''}
                  ${isLocked ? 'bg-gray-800 text-gray-600' : ''}
                  ${isAvailable ? 'bg-primary/10 text-primary animate-pulse shadow-[0_0_10px_rgba(209,254,23,0.3)] group-hover:bg-primary/20' : ''}
                `}>
                  {isCompleted && <CheckCircle2 size={18} strokeWidth={2.5}/>}
                  {isLocked && <Lock size={18} />}
                  {isAvailable && <ArrowRight size={18} />}
                </div>
              </div>
              
              <div className="mt-auto z-10">
                <h3 className={`font-bold text-base ${isLocked ? 'text-gray-600' : 'text-white'}`}>
                  {module.title}
                </h3>
                <p className={`text-[10px] font-bold uppercase tracking-widest mt-1 flex items-center gap-1
                  ${isCompleted ? 'text-primary drop-shadow-[0_0_5px_rgba(209,254,23,0.5)]' : ''}
                  ${isLocked ? 'text-gray-700' : ''}
                  ${isAvailable ? 'text-green-400' : ''}
                `}>
                  {isCompleted && 'COMPLETADO'}
                  {isLocked && 'BLOQUEADO'}
                  {isAvailable && (
                    <>
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-ping mr-1"></span>
                      DISPONIBLE
                    </>
                  )}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
