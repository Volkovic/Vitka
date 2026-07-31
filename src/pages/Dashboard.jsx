import { useState, useEffect } from 'react';
import CourseCard from '../components/CourseCard';
import { 
  Terminal, Code2, Database, BookOpen, GitBranch, 
  FileCode2, Atom, Palette, Server, Smartphone, 
  Bug, Box, Workflow, Layers, Globe, Monitor, Shield
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';

const TOTAL_MODULES = {
  python: 30,
  javascript: 23,
  sql: 15,
  git: 8
};

export default function Dashboard() {
  const { user } = useAuth();
  const [progress, setProgress] = useState({
    python: 0,
    javascript: 0,
    sql: 0,
    git: 0
  });

  useEffect(() => {
    if (!user) return;

    async function loadProgress() {
      const { data, error } = await supabase
        .from('user_progress')
        .select('course_id, module_id')
        .eq('user_id', user.id);

      if (!error && data) {
        const maxModules = {
          python: 0,
          javascript: 0,
          sql: 0,
          git: 0
        };
        
        data.forEach(row => {
          if (row.course_id && row.module_id > maxModules[row.course_id]) {
            maxModules[row.course_id] = row.module_id;
          }
        });

        setProgress({
          python: Math.round((maxModules.python / TOTAL_MODULES.python) * 100),
          javascript: Math.round((maxModules.javascript / TOTAL_MODULES.javascript) * 100),
          sql: Math.round((maxModules.sql / TOTAL_MODULES.sql) * 100),
          git: Math.round((maxModules.git / TOTAL_MODULES.git) * 100)
        });
      }
    }

    loadProgress();
  }, [user]);

  const roadmapPhases = [
    {
      id: "fase-1",
      title: "Fase 1: Los Cimientos",
      description: "Antes de tocar React, necesitas dominar la lógica.",
      cards: [
        {
          title: "HTML5",
          description: "La estructura semántica de la web.",
          icon: Globe,
          to: "#",
          isAvailable: true,
          completed: true
        },
        {
          title: "CSS3",
          description: "Flexbox, Grid y diseño responsivo.",
          icon: Monitor,
          to: "#",
          isAvailable: true,
          completed: true
        },
        {
          title: "Fundamentos de Programación",
          description: "Lógica, algoritmos y estructuras básicas para empezar en el mundo del código.",
          icon: BookOpen,
          to: "#",
          isAvailable: true,
          completed: true
        }
      ]
    },
    {
      id: "fase-2",
      title: "Fase 2: Control de Versiones",
      description: "El estándar base de la industria para colaborar.",
      cards: [
        {
          title: "Git/GitHub",
          badge: "8 Módulos",
          description: "Control de versiones, trabajo colaborativo y buenas prácticas.",
          icon: GitBranch,
          to: "/git",
          isAvailable: true,
          progressId: "git"
        }
      ]
    },
    {
      id: "fase-3",
      title: "Fase 3: Desarrollo Web y Tipado",
      description: "Domina el ecosistema web moderno.",
      cards: [
        {
          title: "JavaScript",
          badge: "23 Módulos",
          description: "Domina el lenguaje de la web, asincronía y el ecosistema de JS.",
          icon: Code2,
          to: "/javascript",
          isAvailable: true,
          progressId: "javascript"
        },
        {
          title: "TypeScript",
          description: "JavaScript con superpoderes: tipado estático, interfaces y más seguridad.",
          icon: FileCode2,
          to: "/typescript",
          isAvailable: false
        },
        {
          title: "Node/npm/vite",
          description: "Entorno de ejecución, gestión de paquetes y bundlers modernos.",
          icon: Server,
          to: "/node",
          isAvailable: false
        }
      ]
    },
    {
      id: "fase-4",
      title: "Fase 4: Frontend Frameworks",
      description: "Crea interfaces dinámicas y modernas.",
      cards: [
        {
          title: "React",
          description: "Crea interfaces de usuario interactivas y dinámicas basadas en componentes.",
          icon: Atom,
          to: "/react",
          isAvailable: false
        },
        {
          title: "Tailwind + shadcn",
          description: "Estilos rápidos y componentes accesibles para un diseño moderno.",
          icon: Palette,
          to: "/tailwind",
          isAvailable: false
        }
      ]
    },
    {
      id: "fase-5",
      title: "Fase 5: El Backend y APIs",
      description: "La forma rápida y moderna de guardar datos sin configurar servidores.",
      cards: [
        {
          title: "SQL",
          badge: "15 Módulos",
          description: "Bases de datos relacionales, consultas complejas y modelado de datos.",
          icon: Database,
          to: "/sql",
          isAvailable: true,
          progressId: "sql"
        },
        {
          title: "Supabase",
          description: "Backend as a Service: bases de datos, autenticación y storage.",
          icon: Database,
          to: "/supabase",
          isAvailable: false
        }
      ]
    },
    {
      id: "fase-6",
      title: "Fase 6: Móvil y Testing",
      description: "Lleva tu código a los teléfonos y asegúrate de que no se rompa.",
      cards: [
        {
          title: "React Native + Expo",
          description: "La forma más rápida de crear aplicaciones nativas para iOS y Android con React.",
          icon: Smartphone,
          to: "/react-native",
          isAvailable: false
        },
        {
          title: "Testing (Jest/Cypress)",
          description: "Aprende a escribir pruebas automatizadas para que tu código sea robusto.",
          icon: Bug,
          to: "/testing",
          isAvailable: false
        }
      ]
    },
    {
      id: "fase-7",
      title: "Fase 7: DevOps y Arquitectura",
      description: "El Estándar Programador: llevar tu código a producción de forma profesional.",
      cards: [
        {
          title: "Docker",
          description: "Contenerización. Empaqueta tu app para que funcione igual en cualquier servidor.",
          icon: Box,
          to: "/docker",
          isAvailable: false
        },
        {
          title: "CI/CD & GitHub Actions",
          description: "Automatiza el despliegue de tus aplicaciones cuando haces push al repositorio.",
          icon: Workflow,
          to: "/cicd",
          isAvailable: false
        },
        {
          title: "Arquitectura & Clean Code",
          description: "Aprende patrones de diseño, SOLID y cómo mantener tu código a largo plazo.",
          icon: Layers,
          to: "/arquitectura",
          isAvailable: false
        }
      ]
    },
    {
      id: "caminos-alternativos",
      title: "Caminos Alternativos y Optativos",
      description: "Tecnologías increíblemente potentes fuera del ecosistema puro de React.",
      cards: [
        {
          title: "Python",
          badge: "30 Módulos",
          description: "Aprende los fundamentos de Python, estructuras de datos y lógica de programación desde cero.",
          icon: Terminal,
          to: "/python",
          isAvailable: true,
          progressId: "python"
        },
        {
          title: "Ciberseguridad",
          description: "Entiende vulnerabilidades (OWASP), HTTPS, CORS y cómo proteger tus aplicaciones.",
          icon: Shield,
          to: "/seguridad",
          isAvailable: false
        }
      ]
    }
  ];

  return (
    <div className="space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      <section className="space-y-6 max-w-4xl mx-auto text-center flex flex-col items-center">
        <div className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-2">
          <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse mr-2"></span>
          Vitka Roadmap 2.0
        </div>
        <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight">
          Aprende a <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-green-400 drop-shadow-[0_0_15px_rgba(209,254,23,0.3)]">razonar</span> sobre el código.
        </h1>
        <p className="text-xl text-text-muted max-w-2xl">
          No solo escribas código. Aprende a leerlo, entender el "por qué" de cada decisión y domina la lógica detrás de la creación de software moderno.
        </p>
      </section>

      <div className="space-y-20 relative">
        {/* Línea vertical conectora para darle estilo de Roadmap real */}
        <div className="absolute left-[3px] top-12 bottom-20 w-px bg-gradient-to-b from-gray-800 via-primary/30 to-transparent hidden md:block"></div>

        {roadmapPhases.map((phase) => (
          <section key={phase.id} className="relative md:pl-10 space-y-6">
            {/* Nodo de la línea de tiempo */}
            <div className="absolute left-[-2px] top-[14px] w-3 h-3 rounded-full bg-gray-900 border-2 border-primary hidden md:block shadow-[0_0_12px_rgba(209,254,23,0.4)]"></div>
            
            <div className="space-y-2 relative z-10">
              <h2 className="text-2xl font-bold text-white tracking-tight">{phase.title}</h2>
              <p className="text-text-muted">{phase.description}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
              {phase.cards.map((card, idx) => (
                <CourseCard 
                  key={idx}
                  title={card.title} 
                  badge={card.badge}
                  description={card.description} 
                  icon={card.icon} 
                  to={card.to} 
                  isAvailable={card.isAvailable}
                  progress={card.completed ? 100 : (card.progressId ? progress[card.progressId] : 0)}
                />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
