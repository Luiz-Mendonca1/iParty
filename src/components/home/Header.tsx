import { Search, Home as HomeIcon, Bell, User } from 'lucide-react';

export function Header() {
  return (
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
  );
}