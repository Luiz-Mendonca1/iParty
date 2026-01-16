import { Search, Home as HomeIcon, Bell, User, MessageCircle } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex h-screen w-full bg-[#0a0a0a] text-white font-sans overflow-hidden">
      
      {/* --- SIDEBAR --- */}
      <aside className="w-64 shrink-0 flex flex-col border-r border-gray-800 bg-[#121212]">
        {/* Logo Area */}
        <div className="h-16 flex items-center px-6 border-b border-gray-800">
          <div className="w-8 h-8 rounded-full bg-pink-500 mr-3"></div>
          <h1 className="text-2xl font-bold tracking-tight">iParty</h1>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-2">
          <SidebarItem />
          <SidebarItem />
          <SidebarItem />
          <SidebarItem />
          <SidebarItem />
          <SidebarItem />
          <SidebarItem />
          <SidebarItem />
          
        </nav>
      </aside>

      {/* --- MAIN CONTENT AREA --- */}
      <div className="flex-1 flex flex-col relative">
        
        {/* --- HEADER --- */}
        <header className="h-16 flex items-center justify-between px-6 border-b border-gray-800 bg-[#0a0a0a]">
          {/* Search Bar */}
          <div className="flex-1 max-w-xl">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full bg-[#1f1f1f] text-gray-300 rounded-full py-2 pl-10 pr-3 focus:outline-none focus:ring-1 focus:ring-gray-600 transition-colors placeholder-gray-500"
                placeholder="Pesquisar por eventos próximos"
              />
            </div>
          </div>

          {/* Right Icons */}
          <div className="flex items-center space-x-6 ml-4">
            <button className="text-gray-300 hover:text-white transition">
              <HomeIcon className="w-7 h-7" />
            </button>
            
            <button className="relative text-gray-300 hover:text-white transition">
              <Bell className="w-7 h-7" />
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-pink-600 text-[10px] font-bold text-white">
                5
              </span>
            </button>
            
            <button className="">
              <div className="w-8 h-8 rounded-full  flex items-center justify-center bg-gray-400 hover:bg-white transition">
                <User className="w-5 h-5 text-gray-800" />
              </div>
            </button>
          </div>
        </header>

        {/* --- EMPTY CONTENT (Void) --- */}
        <main className="flex-1 bg-black p-8">
            {/* Conteúdo principal vazio conforme a imagem */}
        </main>

        {/* --- CHAT WIDGET --- */}
        <div className="absolute bottom-0 right-0 w-80 bg-[#1e1e1e] rounded-tl-lg shadow-2xl border-l border-t border-gray-800">
          
          {/* Chat Header */}
          <div className="px-4 py-3 border-b border-gray-700 flex items-center justify-between bg-[#252525] rounded-tl-lg">
            <h2 className="text-lg font-bold flex items-center gap-2">
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

// --- Componentes Auxiliares (podem ficar no mesmo arquivo) ---

const SidebarItem = () => (
  <div className="flex items-center px-4 py-3 hover:bg-gray-800 rounded-md cursor-pointer transition-colors group">
    <div className="w-10 h-10 rounded-full bg-gray-300 group-hover:bg-gray-200 transition-colors mr-3 shrink-0"></div>
    <span className="text-lg font-medium text-gray-200">Item</span>
  </div>
);

const ChatItem = ({ name, subtext, isActive }: { name: string, subtext: string, isActive: boolean }) => (
  <div className={`flex items-center px-4 py-3 border-b border-gray-800 cursor-pointer hover:bg-[#2a2a2a] transition-colors ${isActive ? 'bg-[#2a2a2a]' : ''}`}>
    <div className="relative mr-3">
      <div className="w-10 h-10 rounded-full bg-gray-400 flex items-center justify-center text-gray-700">
        <User className="w-6 h-6" />
      </div>
      {isActive && (
        <span className="absolute bottom-0 right-0 w-3 h-3 bg-pink-500 border-2 border-[#1e1e1e] rounded-full"></span>
      )}
    </div>
    <div className="flex-1 min-w-0">
      <div className="flex justify-between items-baseline">
        <h3 className="text-sm font-semibold text-gray-100">{name}</h3>
      </div>
      <p className="text-xs text-gray-400 truncate">{subtext}</p>
    </div>
  </div>
);  