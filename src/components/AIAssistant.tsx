
import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, Send, X } from "lucide-react";
import { cn } from "@/lib/utils";

type Message = {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
};

const SAMPLE_RESPONSES: { [key: string]: string } = {
  "default": "I'm your AI assistant. How can I help you understand your credit score better?",
  "how is my score calculated": "Your CreditCloud AI score is calculated using a combination of factors including payment history, spending patterns, and blockchain transaction data. We use AI to analyze alternative financial data points that traditional credit bureaus might miss.",
  "improve creditworthiness": "To improve your creditworthiness, focus on making regular payments, maintaining low debt levels, diversifying your credit types, and building a consistent financial history. Our AI system will recognize these positive patterns.",
  "who accepts": "Many forward-thinking financial institutions now accept decentralized credit scores. Partners include regional banks, microfinance organizations, and digital lending platforms focusing on financial inclusion.",
  "hedera security": "Hedera ensures data security through its distributed ledger technology. Your financial data is stored in a decentralized manner with strong cryptographic protection, giving you control over who accesses your information."
};

export const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! I'm your CreditCloud AI assistant. How can I help you understand your credit score today?",
      timestamp: new Date()
    }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputValue.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      role: "user",
      content: inputValue,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    
    // Simulate AI response
    setTimeout(() => {
      // Find a matching response or use default
      let responseContent = SAMPLE_RESPONSES.default;
      
      const lowercaseInput = inputValue.toLowerCase();
      for (const [key, value] of Object.entries(SAMPLE_RESPONSES)) {
        if (lowercaseInput.includes(key)) {
          responseContent = value;
          break;
        }
      }
      
      const aiMessage: Message = {
        role: "assistant",
        content: responseContent,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
    }, 600);
  };

  return (
    <>
      {/* Chat button */}
      <button
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed bottom-6 right-6 h-14 w-14 rounded-full bg-primary text-primary-foreground",
          "flex items-center justify-center shadow-lg hover:bg-primary/90 transition-all",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        )}
        aria-label="Open AI Assistant"
      >
        <MessageSquare className="h-6 w-6" />
      </button>
      
      {/* Chat window */}
      <div 
        className={cn(
          "fixed bottom-0 right-0 z-50 w-full sm:w-96 sm:max-w-md",
          "max-h-[70vh] sm:max-h-[600px] sm:m-6 flex flex-col rounded-t-lg sm:rounded-lg shadow-xl",
          "bg-background border border-border overflow-hidden transition-all duration-300 ease-in-out",
          isOpen ? "translate-y-0 opacity-100" : "translate-y-full opacity-0 sm:translate-y-4 pointer-events-none"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
              <MessageSquare className="h-4 w-4 text-primary" />
            </div>
            <div>
              <h3 className="font-medium text-sm">AI Assistant</h3>
              <p className="text-xs text-muted-foreground">Ask me about your credit score</p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-muted-foreground hover:text-foreground rounded-full p-1"
            aria-label="Close AI Assistant"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message, index) => (
            <div 
              key={index}
              className={cn(
                "flex items-start gap-3 animate-slide-up",
                message.role === "user" ? "flex-row-reverse" : ""
              )}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div 
                className={cn(
                  "h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0",
                  message.role === "assistant" ? "bg-primary/20" : "bg-secondary"
                )}
              >
                {message.role === "assistant" ? (
                  <MessageSquare className="h-4 w-4 text-primary" />
                ) : (
                  <span className="text-xs font-medium">You</span>
                )}
              </div>
              <div 
                className={cn(
                  "max-w-[75%] rounded-lg px-4 py-2.5 text-sm",
                  message.role === "assistant" 
                    ? "bg-card text-card-foreground" 
                    : "bg-primary text-primary-foreground"
                )}
              >
                {message.content}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        
        {/* Input */}
        <form onSubmit={handleSubmit} className="p-4 border-t border-border">
          <div className="flex items-center gap-2">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask about your credit score..."
              className="flex-1 h-10 px-4 rounded-md bg-secondary text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              type="submit"
              className="h-10 w-10 rounded-md bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label="Send message"
              disabled={!inputValue.trim()}
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
