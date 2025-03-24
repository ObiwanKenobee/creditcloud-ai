
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";
import { cn } from "@/lib/utils";

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Listen for scroll and update header appearance
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out",
        isScrolled ? "py-3 bg-background/80 backdrop-blur-lg shadow-sm" : "py-6 bg-transparent",
        "dark:border-gray-800"
      )}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link 
          to="/" 
          className="flex items-center gap-2"
        >
          <div className="relative h-8 w-8 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
            <span className="text-white font-bold text-sm">C</span>
            <div className="absolute inset-0 rounded-full animate-pulse-slow bg-primary/30"></div>
          </div>
          <span className="font-semibold text-lg">CreditCloud</span>
          <span className="text-primary font-medium">AI</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link 
            to="/" 
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Home
          </Link>
          <Link 
            to="/dashboard" 
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Dashboard
          </Link>
          <Link 
            to="/onboarding" 
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Get Started
          </Link>
        </nav>
        
        {/* Right Actions */}
        <div className="flex items-center gap-4">
          <ThemeToggle />
          
          <Link
            to="/onboarding"
            className="hidden md:inline-flex h-10 px-6 rounded-full bg-primary text-primary-foreground items-center justify-center text-sm font-medium shadow-sm hover:bg-primary/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-colors"
          >
            Check Your Score
          </Link>
          
          {/* Mobile Menu Button */}
          <button
            className="md:hidden h-10 w-10 flex flex-col gap-1.5 items-center justify-center rounded-md hover:bg-secondary focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`w-5 h-0.5 bg-foreground transition-all ${mobileMenuOpen ? 'rotate-45 translate-y-1' : ''}`}></span>
            <span className={`w-5 h-0.5 bg-foreground transition-all ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`w-5 h-0.5 bg-foreground transition-all ${mobileMenuOpen ? '-rotate-45 -translate-y-1' : ''}`}></span>
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div 
        className={cn(
          "md:hidden absolute top-full left-0 right-0 bg-background border-b border-border shadow-md transition-all duration-300 overflow-hidden",
          mobileMenuOpen ? "max-h-64" : "max-h-0"
        )}
      >
        <nav className="container mx-auto py-4 px-6 flex flex-col gap-4 font-medium">
          <Link 
            to="/" 
            className="py-2 text-foreground hover:text-primary transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            Home
          </Link>
          <Link 
            to="/dashboard" 
            className="py-2 text-foreground hover:text-primary transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            Dashboard
          </Link>
          <Link 
            to="/onboarding" 
            className="py-2 text-foreground hover:text-primary transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            Get Started
          </Link>
          <Link
            to="/onboarding"
            className="py-2 px-4 rounded-md bg-primary text-primary-foreground text-center text-sm font-medium shadow-sm hover:bg-primary/90 transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            Check Your Score
          </Link>
        </nav>
      </div>
    </header>
  );
};
