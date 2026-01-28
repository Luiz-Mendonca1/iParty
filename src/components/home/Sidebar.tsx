"use client";

import { useState, useEffect } from 'react';
import { 
  Home as HomeIcon, 
  Compass, 
  Calendar, 
  Ticket, 
  Bookmark, 
  Settings, 
  Sun, 
  Moon 
} from 'lucide-react';

const SidebarItem = ({ icon: Icon, label }: { icon: any, label: string }) => (
  <div className="flex items-center justify-center md:justify-start px-2 md:px-4 py-3 hover:bg-sidebar-hover rounded-md cursor-pointer transition-colors group w-full">
    <div className="w-10 h-10 rounded-full bg-sidebar-hover transition-colors mr-0 md:mr-3 shrink-0 flex items-center justify-center border border-transparent dark:border-border">
      <Icon className="w-5 h-5 text-muted group-hover:text-foreground transition-colors" />
    </div>
    <span className="text-lg font-medium text-foreground hidden md:block whitespace-nowrap">{label}</span>
  </div>
);

export function Sidebar() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    
    if (newMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <aside className="w-20 md:w-64 shrink-0 flex flex-col border-r border-border bg-sidebar transition-all duration-300 ease-in-out">
      {/* Logo Area */}
      <div className="h-16 flex items-center justify-center md:justify-start px-2 md:px-6 border-b border-border">
        <div className="w-8 h-8 rounded-full bg-pink-500 mr-0 md:mr-3 shrink-0"></div>
        <h1 className="text-2xl font-bold tracking-tight hidden md:block whitespace-nowrap">iParty</h1>
      </div>

      <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-2 flex flex-col items-center md:items-stretch">
        <SidebarItem icon={HomeIcon} label="Início" />
        <SidebarItem icon={Compass} label="Explorar" />
        <SidebarItem icon={Calendar} label="Eventos" />
        <SidebarItem icon={Ticket} label="Ingressos" />
        <SidebarItem icon={Bookmark} label="Favoritos" />
        <SidebarItem icon={Settings} label="Configurações" />
      </nav>

      {/* Botão de Tema */}
      <div className="p-4 border-t border-border flex justify-center md:justify-start">
        <button 
          onClick={toggleTheme}
          className="flex items-center justify-center md:justify-start w-full px-2 md:px-4 py-3 rounded-md hover:bg-sidebar-hover transition-colors text-foreground group"
        >
          <div className="mr-0 md:mr-3 text-muted group-hover:text-foreground transition-colors shrink-0">
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </div>
          <span className="text-sm font-medium hidden md:block whitespace-nowrap">
            {isDarkMode ? 'Modo Claro' : 'Modo Escuro'}
          </span>
        </button>
      </div>
    </aside>
  );
}