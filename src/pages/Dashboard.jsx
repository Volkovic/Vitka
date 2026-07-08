import { useState, useEffect } from 'react';
import CourseCard from '../components/CourseCard';
import { Terminal, Code2, Database, BookOpen, GitBranch, FileCode2, Atom, Palette, Server } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';

export default function Dashboard() {
  const { user } = useAuth();
  const [progress, setProgress] = useState({
    python: 0,
    javascript: 0,
    sql: 0
  });

  const TOTAL_DAYS = {
    python: 30,
    javascript: 23,
    sql: 15
  };

  useEffect(() => {
    if (!user) return;

    async function loadProgress() {
      const { data, error } = await supabase
        .from('user_progress')
        .select('course_id, day_id')
        .eq('user_id', user.id);

      if (!error && data) {
        const maxDays = {
          python: 0,
          javascript: 0,
          sql: 0
        };
        
        data.forEach(row => {
          if (row.course_id && row.day_id > maxDays[row.course_id]) {
            maxDays[row.course_id] = row.day_id;
          }
        });

        setProgress({
          python: Math.round((maxDays.python / TOTAL_DAYS.python) * 100),
          javascript: Math.round((maxDays.javascript / TOTAL_DAYS.javascript) * 100),
          sql: Math.round((maxDays.sql / TOTAL_DAYS.sql) * 100)
        });
      }
    }

    loadProgress();
  }, [user]);

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <section className="space-y-4 max-w-3xl">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
          Aprende a <span className="text-primary">razonar</span> sobre el código.
        </h1>
        <p className="text-xl text-text-muted">
          No solo escribas código. Aprende a leerlo, entender el "por qué" de cada decisión y domina la lógica detrás de la Inteligencia Artificial.
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <CourseCard 
          title="Python" 
          badge="30 Días"
          description="Aprende los fundamentos de Python, estructuras de datos y lógica de programación desde cero." 
          icon={Terminal} 
          to="/python" 
          progress={progress.python}
        />
        <CourseCard 
          title="JavaScript"
          badge="23 Días" 
          description="Domina el lenguaje de la web, asincronía y el ecosistema de JS." 
          icon={Code2} 
          to="/javascript"
          progress={progress.javascript}
        />
        <CourseCard 
          title="SQL" 
          badge="15 Días"
          description="Bases de datos relacionales, consultas complejas y modelado de datos." 
          icon={Database} 
          to="/sql"
          progress={progress.sql}
        />
        <CourseCard 
          title="Fundamentos de Programación" 
          description="Lógica, algoritmos y estructuras básicas para empezar en el mundo del código." 
          icon={BookOpen} 
          to="/fundamentos"
          isAvailable={false}
        />
        <CourseCard 
          title="Git/GitHub" 
          description="Control de versiones, trabajo colaborativo y buenas prácticas." 
          icon={GitBranch} 
          to="/git"
          isAvailable={false}
        />
        <CourseCard 
          title="TypeScript" 
          description="JavaScript con superpoderes: tipado estático, interfaces y más seguridad." 
          icon={FileCode2} 
          to="/typescript"
          isAvailable={false}
        />
        <CourseCard 
          title="React" 
          description="Crea interfaces de usuario interactivas y dinámicas basadas en componentes." 
          icon={Atom} 
          to="/react"
          isAvailable={false}
        />
        <CourseCard 
          title="Tailwind + shadcn" 
          description="Estilos rápidos y componentes accesibles para un diseño moderno." 
          icon={Palette} 
          to="/tailwind"
          isAvailable={false}
        />
        <CourseCard 
          title="Supabase" 
          description="Backend as a Service: bases de datos, autenticación y storage." 
          icon={Database} 
          to="/supabase"
          isAvailable={false}
        />
        <CourseCard 
          title="Node/npm/vite" 
          description="Entorno de ejecución, gestión de paquetes y bundlers modernos." 
          icon={Server} 
          to="/node"
          isAvailable={false}
        />
      </section>
    </div>
  );
}
