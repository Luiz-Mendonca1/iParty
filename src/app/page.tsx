"use client";

import { useState, useEffect } from 'react';
import { 
  Search, 
  Home as HomeIcon, 
  Bell, 
  User, 
  MessageCircle, 
  Moon, 
  Sun,
  Compass,
  Calendar,
  Ticket,
  Bookmark,
  Settings
} from 'lucide-react';

export default function Home() {
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
    <div className="flex h-screen w-full bg-background text-foreground font-sans overflow-hidden transition-colors duration-300">
      
      {/* --- SIDEBAR --- */}
      {/* Alterado: w-20 (mobile) -> md:w-64 (desktop) */}
      <aside className="w-20 md:w-64 shrink-0 flex flex-col border-r border-border bg-sidebar transition-all duration-300 ease-in-out">
        {/* Logo Area */}
        {/* Alterado: justify-center (mobile) -> md:justify-start (desktop) */}
        <div className="h-16 flex items-center justify-center md:justify-start px-2 md:px-6 border-b border-border">
          {/* Alterado: mr-0 (mobile) -> md:mr-3 (desktop) */}
          <div className="w-8 h-8 rounded-full bg-pink-500 mr-0 md:mr-3 shrink-0"></div>
          {/* Alterado: hidden (mobile) -> md:block (desktop) */}
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

        {/* --- BOTÃO DE TEMA --- */}
        <div className="p-4 border-t border-border flex justify-center md:justify-start">
          <button 
            onClick={toggleTheme}
            // Alterado: justify-center (mobile) -> md:justify-start (desktop)
            className="flex items-center justify-center md:justify-start w-full px-2 md:px-4 py-3 rounded-md hover:bg-sidebar-hover transition-colors text-foreground group"
          >
            {/* Alterado: mr-0 (mobile) -> md:mr-3 (desktop) */}
            <div className="mr-0 md:mr-3 text-muted group-hover:text-foreground transition-colors shrink-0">
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </div>
            {/* Alterado: hidden (mobile) -> md:block (desktop) */}
            <span className="text-sm font-medium hidden md:block whitespace-nowrap">
              {isDarkMode ? 'Modo Claro' : 'Modo Escuro'}
            </span>
          </button>
        </div>
      </aside>

      {/* --- MAIN CONTENT AREA --- */}
      <div className="flex-1 flex flex-col relative">
        
        {/* --- HEADER --- */}
        <header className="h-16 flex items-center justify-between px-6 border-b border-border bg-background transition-colors duration-300">
          <div className="flex-1 max-w-xl">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-muted" />
              </div>
              <input
                type="text"
                className="block w-full bg-input-bg text-foreground rounded-full py-2 pl-10 pr-3 border border-border focus:outline-none focus:ring-1 focus:ring-input-ring transition-colors placeholder-muted"
                placeholder="Pesquisar por eventos próximos"
              />
            </div>
          </div>

          <div className="flex items-center space-x-6 ml-4">
            <button className="text-muted hover:text-foreground transition">
              <HomeIcon className="w-7 h-7" />
            </button>
            
            <button className="relative text-muted hover:text-foreground transition">
              <Bell className="w-7 h-7" />
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-pink-600 text-[10px] font-bold text-white">
                5
              </span>
            </button>
            
            <button className="">
              <div className="w-8 h-8 rounded-full flex items-center justify-center bg-sidebar-hover hover:bg-border transition text-foreground">
                <User className="w-5 h-5" />
              </div>
            </button>
          </div>
        </header>

        {/* --- MAIN (Empty) --- */}
        <main className="flex-1 bg-background p-8 transition-colors duration-300">
            {/* Conteúdo principal vazio */}
        </main>

        {/* --- CHAT WIDGET --- */}
        <div className="absolute bottom-0 right-0 w-80 bg-chat-bg rounded-tl-lg shadow-2xl border-l border-t border-border transition-colors duration-300">
          <div className="px-4 py-3 border-b border-border flex items-center justify-between bg-chat-header rounded-tl-lg">
            <h2 className="text-lg font-bold flex items-center gap-2 text-foreground">
              Chat <MessageCircle className="w-5 h-5 fill-current" />
            </h2>
          </div>

          <div className="flex flex-col">
            <ChatItem 
              name="Adm 1" 
              subtext="4 mensagens recebidas" 
              isActive={true} 
            />
            <ChatItem 
              name="Adm 2" 
              subtext="Mensagem vizualizada" 
              isActive={false}
            />
            <ChatItem 
              name="Adm 3" 
              subtext="Mensagem enviada" 
              isActive={false}
            />
             <ChatItem 
              name="Adm 4" 
              subtext="Toque para conversar" 
              isActive={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Componentes Auxiliares ---

const SidebarItem = ({ icon: Icon, label }: { icon: any, label: string }) => (
  // Alterado: justify-center (mobile) -> md:justify-start (desktop)
  <div className="flex items-center justify-center md:justify-start px-2 md:px-4 py-3 hover:bg-sidebar-hover rounded-md cursor-pointer transition-colors group w-full">
    {/* Alterado: mr-0 (mobile) -> md:mr-3 (desktop) */}
    <div className="w-10 h-10 rounded-full bg-sidebar-hover transition-colors mr-0 md:mr-3 shrink-0 flex items-center justify-center border border-transparent dark:border-border">
      <Icon className="w-5 h-5 text-muted group-hover:text-foreground transition-colors" />
    </div>
    {/* Alterado: hidden (mobile) -> md:block (desktop) */}
    <span className="text-lg font-medium text-foreground hidden md:block whitespace-nowrap">{label}</span>
  </div>
);

const ChatItem = ({ name, subtext, isActive }: { name: string, subtext: string, isActive: boolean }) => (
  <div className={`flex items-center px-4 py-3 border-b border-border cursor-pointer hover:bg-chat-hover transition-colors ${isActive ? 'bg-chat-hover' : ''}`}>
    <div className="relative mr-3">
      <div className="w-10 h-10 rounded-full bg-sidebar-hover flex items-center justify-center text-foreground">
        <User className="w-6 h-6" />
      </div>
      {isActive && (
        <span className="absolute bottom-0 right-0 w-3 h-3 bg-pink-500 border-2 border-chat-bg rounded-full"></span>
      )}
    </div>
    <div className="flex-1 min-w-0">
      <div className="flex justify-between items-baseline">
        <h3 className="text-sm font-semibold text-foreground">{name}</h3>
      </div>
      <p className="text-xs text-muted truncate">{subtext}</p>
    </div>
  </div>
);