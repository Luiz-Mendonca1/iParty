"use client";

import { Sidebar } from "@/components/home/Sidebar";
import { Header } from "@/components/home/Header";
import { ChatWidget } from "@/components/home/ChatWidget";

export default function Home() {
  return (
    <div className="flex h-screen w-full bg-background text-foreground font-sans overflow-hidden transition-colors duration-300">
      
      <Sidebar />

      <div className="flex-1 flex flex-col relative">
        
        <Header />

        <main className="flex-1 bg-background p-8 transition-colors duration-300">
          <section></section>
        </main>

        <ChatWidget />
        
      </div>
    </div>
  );
}