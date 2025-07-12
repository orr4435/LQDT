'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetClose } from '@/components/ui/sheet';
import { Bot, X } from 'lucide-react';

const CHAT_URL = "https://ai-chat-widget-manager.vercel.app/chat?org=pracktical&t=000000&bg=ffffff&p=8c6631&ibg=f7f8f7";

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="fixed bottom-6 left-6 z-50">
        <Button
          size="icon"
          className="rounded-full w-16 h-16 bg-primary hover:bg-primary/90 shadow-lg"
          onClick={() => setIsOpen(true)}
        >
          <Bot className="h-8 w-8 text-primary-foreground" />
        </Button>
      </div>

      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent 
          side="left" 
          className="w-[75vw] max-w-[1200px] p-0 flex flex-col bg-background"
          onInteractOutside={(e) => e.preventDefault()}
        >
            <div className="flex justify-between items-center p-4 border-b">
                 <h2 className="text-lg font-semibold text-primary">AI Chat</h2>
                 <SheetClose asChild>
                    <Button variant="ghost" size="icon">
                        <X className="h-5 w-5" />
                    </Button>
                 </SheetClose>
            </div>
          <div className="flex-1 overflow-hidden">
            <iframe
              src={CHAT_URL}
              title="AI Chat"
              className="w-full h-full border-none"
            />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
