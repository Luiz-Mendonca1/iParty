import { MessageCircle, User } from 'lucide-react';

// Sub-componente interno para itens do chat
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

export function ChatWidget() {
  return (
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
  );
}