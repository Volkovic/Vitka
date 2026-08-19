import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function CourseCard({ title, badge, description, icon: Icon, to, isAvailable = true, progress = 0, themeColor }) {
  const CardComponent = isAvailable ? Link : 'div';
  const linkProps = isAvailable ? { to } : {};

  return (
    <CardComponent 
      {...linkProps}
      className={`block relative group rounded-2xl border border-gray-800 bg-background-card p-6 overflow-hidden transition-all duration-300 hover:border-primary/50 hover:shadow-[0_0_30px_-5px_rgba(209,254,23,0.15)] ${!isAvailable ? 'opacity-60 grayscale cursor-not-allowed' : 'cursor-pointer'}`}
    >
      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
        <Icon size={120} />
      </div>
      
      <div className="relative z-10 flex flex-col h-full">
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 bg-gray-800/50 rounded-xl w-fit">
            <Icon className={!themeColor ? "text-primary" : ""} style={themeColor ? { color: themeColor } : {}} size={24} />
          </div>
          {isAvailable && (
            <ArrowRight className={`opacity-0 group-hover:opacity-100 transition-all -translate-x-4 group-hover:translate-x-0 ${!themeColor ? "text-primary" : ""}`} style={themeColor ? { color: themeColor } : {}} size={24} />
          )}
        </div>
        
        <div className="flex items-center gap-3 mb-2">
          <h3 className="text-2xl font-bold">{title}</h3>
          {badge && (
            <span className="px-2.5 py-1 rounded-md bg-gray-800 text-xs font-semibold text-gray-300 border border-gray-700 whitespace-nowrap">
              {badge}
            </span>
          )}
        </div>
        <p className="text-text-muted flex-grow mb-4">{description}</p>
        
        {isAvailable ? (
          <div className="mt-auto space-y-2">
            <div className="flex justify-between text-sm font-medium">
              <span className="text-text-muted">Progreso</span>
              <span className={!themeColor ? "text-primary" : ""} style={themeColor ? { color: themeColor } : {}}>{progress}%</span>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
              <div 
                className={`h-2 rounded-full transition-all duration-500 ${!themeColor ? "bg-primary" : ""}`}
                style={{ width: `${progress}%`, ...(themeColor ? { backgroundColor: themeColor } : {}) }}
              ></div>
            </div>
          </div>
        ) : (
          <div className="mt-auto pt-4">
             <span className="inline-flex items-center gap-2 text-gray-500 font-medium">
              Próximamente
            </span>
          </div>
        )}
      </div>
    </CardComponent>
  );
}
