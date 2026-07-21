import { Outlet, Link, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Loader2, LogOut } from 'lucide-react';
import logo from '../assets/logo.svg';

export default function MainLayout() {
  const { user, loading, signOut } = useAuth();
  const location = useLocation();
  const isModuleView = location.pathname.includes('/module/');

  if (loading) {
    return (
      <div className="min-h-screen bg-background-dark flex items-center justify-center">
        <Loader2 className="animate-spin text-primary" size={48} />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="min-h-screen bg-background-dark text-text-main flex flex-col">
      {!isModuleView && (
        <header className="border-b border-gray-800 bg-background-card/50 backdrop-blur-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <Link to="/" className="flex items-center hover:opacity-80 transition-opacity">
              <img src={logo} alt="01.Center Logo" className="w-8 h-8" />
            </Link>
            <button 
              onClick={signOut}
              className="text-gray-400 hover:text-red-400 transition-colors flex items-center gap-2 text-sm font-semibold"
              title="Cerrar Sesión"
            >
              <LogOut size={18} />
              <span className="hidden sm:inline">Salir</span>
            </button>
          </div>
        </header>
      )}
      <main className={`flex-1 w-full ${isModuleView ? '' : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'}`}>
        <Outlet />
      </main>
    </div>
  );
}
