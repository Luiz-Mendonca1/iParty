"use client"; // Necessário para interatividade (botões, hooks)

import { useState, useEffect } from 'react';
import { Search, Home as HomeIcon, Bell, User, MessageCircle, Moon, Sun } from 'lucide-react';

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Efeito para carregar o tema inicial
  useEffect(() => {
    // Verifica preferência do sistema ou localStorage
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

  // Função para alternar o tema
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
      <aside className="w-64 shrink-0 flex flex-col border-r border-border bg-sidebar transition-colors duration-300">
        {/* Logo Area */}
        <div className="h-16 flex items-center px-6 border-b border-border">
          <div className="w-8 h-8 rounded-full bg-pink-500 mr-3"></div>
          <h1 className="text-2xl font-bold tracking-tight">iParty</h1>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-2">
          <SidebarItem label="Início" />
          <SidebarItem label="Explorar" />
          <SidebarItem label="Eventos" />
          <SidebarItem label="Ingressos" />
          <SidebarItem label="Favoritos" />
          <SidebarItem label="Configurações" />
        </nav>

        {/* --- BOTÃO DE TEMA (Abaixo dos itens) --- */}
        <div className="p-4 border-t border-border">
          <button 
            onClick={toggleTheme}
            className="flex items-center w-full px-4 py-3 rounded-md hover:bg-sidebar-hover transition-colors text-foreground group"
          >
            <div className="mr-3 text-muted group-hover:text-foreground transition-colors">
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </div>
            <span className="text-sm font-medium">
              {isDarkMode ? 'Modo Claro' : 'Modo Escuro'}
            </span>
          </button>
        </div>
      </aside>

      {/* --- MAIN CONTENT AREA --- */}
      <div className="flex-1 flex flex-col relative">
        
        {/* --- HEADER --- */}
        <header className="h-16 flex items-center justify-between px-6 border-b border-border bg-background transition-colors duration-300">
          {/* Search Bar */}
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

          {/* Right Icons */}
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
              <div className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-300 dark:bg-gray-700 hover:bg-gray-200 transition">
                <User className="w-5 h-5 text-gray-800 dark:text-gray-200" />
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
          
          {/* Chat Header */}
          <div className="px-4 py-3 border-b border-border flex items-center justify-between bg-chat-header rounded-tl-lg">
            <h2 className="text-lg font-bold flex items-center gap-2 text-foreground">
              Chat <MessageCircle className="w-5 h-5 fill-current" />
            </h2>
          </div>

          {/* Chat List */}
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

const SidebarItem = ({ label = "Item" }: { label?: string }) => (
  <div className="flex items-center px-4 py-3 hover:bg-sidebar-hover rounded-md cursor-pointer transition-colors group">
    <div className="w-10 h-10 rounded-full bg-gray-300 group-hover:bg-gray-400 transition-colors mr-3 shrink-0"></div>
    <span className="text-lg font-medium text-foreground">{label}</span>
  </div>
);

const ChatItem = ({ name, subtext, isActive }: { name: string, subtext: string, isActive: boolean }) => (
  <div className={`flex items-center px-4 py-3 border-b border-border cursor-pointer hover:bg-chat-hover transition-colors ${isActive ? 'bg-chat-hover' : ''}`}>
    <div className="relative mr-3">
      <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center text-gray-700 dark:text-gray-200">
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