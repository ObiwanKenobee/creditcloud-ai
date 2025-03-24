
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AIAssistant } from "@/components/AIAssistant";
import { cn } from "@/lib/utils";

const Index = () => {
  const [currentStat, setCurrentStat] = useState(0);
  const animationRef = useRef<HTMLDivElement>(null);
  
  const stats = [
    { value: "95%", label: "Faster Loan Approvals" },
    { value: "500K+", label: "Unbanked Users Scored" },
    { value: "40%", label: "Higher Approval Rates" },
    { value: "100+", label: "Lending Partners" }
  ];
  
  // Auto-rotate through stats
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStat(prev => (prev + 1) % stats.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [stats.length]);
  
  // Scroll animation observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-slide-up");
            entry.target.classList.remove("opacity-0", "translate-y-10");
          }
        });
      },
      { threshold: 0.1 }
    );
    
    const elements = document.querySelectorAll(".animate-on-scroll");
    elements.forEach((el) => observer.observe(el));
    
    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col overflow-hidden">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-6 lg:min-h-[85vh] flex items-center relative overflow-hidden">
          <div className="container mx-auto relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-medium text-primary mb-8 animate-fade-in">
                <span className="flex h-2 w-2 rounded-full bg-primary mr-2"></span>
                Revolutionizing Credit Scoring with AI & Blockchain
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-slide-up">
                Your Credit. Your Data. <span className="text-gradient">Your Future.</span>
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto animate-slide-up animation-delay-200">
                CreditCloud AI creates fairer, more accurate credit scores using artificial intelligence and decentralized data on the Hedera blockchain.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up animation-delay-400">
                <Link
                  to="/onboarding"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-primary text-primary-foreground text-base font-medium transition-all hover:bg-primary/90 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                >
                  Check Your Score
                </Link>
                <Link
                  to="/dashboard"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-secondary text-foreground text-base font-medium transition-all hover:bg-secondary/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                >
                  Verify a Borrower
                </Link>
              </div>
            </div>
            
            {/* Animated Stats */}
            <div className="mt-20 max-w-xs mx-auto relative h-20 overflow-hidden rounded-xl bg-card shadow-sm border border-border animate-fade-in animation-delay-600">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className={cn(
                    "absolute inset-0 flex flex-col items-center justify-center text-center transition-all duration-500 transform",
                    currentStat === index ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
                  )}
                >
                  <span className="text-2xl font-bold text-primary">{stat.value}</span>
                  <span className="text-sm text-muted-foreground">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Decorative Elements */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        </section>
        
        {/* How It Works Section */}
        <section id="how-it-works" className="py-20 px-6 bg-secondary/30">
          <div className="container mx-auto">
            <div className="text-center mb-16 animate-on-scroll opacity-0 translate-y-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our innovative approach combines AI, alternative data, and blockchain technology to create a more inclusive credit scoring system.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Step 1 */}
              <div className="bg-card rounded-2xl overflow-hidden shadow-sm border border-border hover:shadow-md transition-all animate-on-scroll opacity-0 translate-y-10">
                <div className="p-6">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                    <span className="text-lg font-bold text-primary">1</span>
                  </div>
                  <h3 className="text-xl font-medium mb-2">Connect Your Data</h3>
                  <p className="text-muted-foreground">
                    Securely link your financial accounts, payment apps, and utility bills. Your data remains encrypted and under your control.
                  </p>
                </div>
                <div className="px-6 pb-6">
                  <img
                    src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                    alt="Connect financial data"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>
              </div>
              
              {/* Step 2 */}
              <div className="bg-card rounded-2xl overflow-hidden shadow-sm border border-border hover:shadow-md transition-all animate-on-scroll opacity-0 translate-y-10">
                <div className="p-6">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                    <span className="text-lg font-bold text-primary">2</span>
                  </div>
                  <h3 className="text-xl font-medium mb-2">AI Analysis</h3>
                  <p className="text-muted-foreground">
                    Our advanced AI analyzes your financial patterns, identifying strengths that traditional credit bureaus often miss.
                  </p>
                </div>
                <div className="px-6 pb-6">
                  <img
                    src="https://images.unsplash.com/photo-1488229297570-58520851e868?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                    alt="AI analysis process"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>
              </div>
              
              {/* Step 3 */}
              <div className="bg-card rounded-2xl overflow-hidden shadow-sm border border-border hover:shadow-md transition-all animate-on-scroll opacity-0 translate-y-10">
                <div className="p-6">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                    <span className="text-lg font-bold text-primary">3</span>
                  </div>
                  <h3 className="text-xl font-medium mb-2">Blockchain Security</h3>
                  <p className="text-muted-foreground">
                    Your credit score is stored on Hedera's distributed ledger, ensuring transparency, immutability, and full data ownership.
                  </p>
                </div>
                <div className="px-6 pb-6">
                  <img
                    src="https://images.unsplash.com/photo-1639322537228-f710d846310a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                    alt="Blockchain security"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section id="features" className="py-20 px-6">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="animate-on-scroll opacity-0 translate-y-10">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Features That Set Us Apart</h2>
                <p className="text-muted-foreground mb-8">
                  CreditCloud AI reimagines credit scoring for the digital age, focusing on inclusion, accuracy, and user control.
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-1">Alternative Data Analysis</h3>
                      <p className="text-muted-foreground">
                        We consider mobile payments, utility bills, and micro-transactions that reflect your financial responsibility.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-1">Real-Time Updates</h3>
                      <p className="text-muted-foreground">
                        Your credit score evolves as your financial behavior changes, providing an up-to-date picture of your creditworthiness.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-1">Personalized Insights</h3>
                      <p className="text-muted-foreground">
                        Get AI-powered recommendations to improve your score based on your specific financial patterns.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="relative animate-on-scroll opacity-0 translate-y-10">
                <div className="relative z-10 bg-card rounded-2xl overflow-hidden shadow-md border border-border">
                  <img
                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                    alt="CreditCloud AI Dashboard"
                    className="w-full h-auto"
                  />
                </div>
                <div className="absolute -top-6 -right-6 w-40 h-40 bg-primary/10 rounded-full blur-2xl"></div>
                <div className="absolute -bottom-6 -left-6 w-40 h-40 bg-primary/10 rounded-full blur-2xl"></div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Testimonials */}
        <section id="testimonials" className="py-20 px-6 bg-secondary/30">
          <div className="container mx-auto">
            <div className="text-center mb-16 animate-on-scroll opacity-0 translate-y-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">User Success Stories</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                See how CreditCloud AI is making a difference in people's financial lives around the world.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Testimonial 1 */}
              <div className="bg-card rounded-2xl p-6 shadow-sm border border-border hover:shadow-md transition-all animate-on-scroll opacity-0 translate-y-10">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-gray-200 mr-4">
                    <img
                      src="https://randomuser.me/api/portraits/women/44.jpg"
                      alt="Sarah J."
                      className="h-12 w-12 rounded-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">Sarah J.</h4>
                    <p className="text-xs text-muted-foreground">Small Business Owner</p>
                  </div>
                </div>
                <p className="text-muted-foreground mb-4">
                  "Traditional banks rejected my loan applications despite my growing business. CreditCloud AI recognized my financial responsibility through my mobile payment history and helped me secure funding."
                </p>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} className="h-4 w-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              
              {/* Testimonial 2 */}
              <div className="bg-card rounded-2xl p-6 shadow-sm border border-border hover:shadow-md transition-all animate-on-scroll opacity-0 translate-y-10">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-gray-200 mr-4">
                    <img
                      src="https://randomuser.me/api/portraits/men/32.jpg"
                      alt="Michael T."
                      className="h-12 w-12 rounded-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">Michael T.</h4>
                    <p className="text-xs text-muted-foreground">Recent Graduate</p>
                  </div>
                </div>
                <p className="text-muted-foreground mb-4">
                  "As a recent graduate with no credit history, I was stuck in a catch-22. CreditCloud AI helped me build a credit profile based on my rent payments and subscription services history."
                </p>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} className="h-4 w-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              
              {/* Testimonial 3 */}
              <div className="bg-card rounded-2xl p-6 shadow-sm border border-border hover:shadow-md transition-all animate-on-scroll opacity-0 translate-y-10">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-gray-200 mr-4">
                    <img
                      src="https://randomuser.me/api/portraits/women/68.jpg"
                      alt="Priya K."
                      className="h-12 w-12 rounded-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">Priya K.</h4>
                    <p className="text-xs text-muted-foreground">Freelance Designer</p>
                  </div>
                </div>
                <p className="text-muted-foreground mb-4">
                  "My irregular income made it hard to qualify for traditional loans despite never missing payments. CreditCloud AI recognized my responsible financial behavior through alternative data points."
                </p>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star, index) => (
                    <svg key={star} className={`h-4 w-4 ${index < 4 ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section id="cta" className="py-20 px-6">
          <div className="container mx-auto">
            <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-3xl p-12 relative overflow-hidden animate-on-scroll opacity-0 translate-y-10">
              <div className="relative z-10 max-w-2xl">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Unlock Your True Credit Potential?</h2>
                <p className="text-muted-foreground mb-8">
                  Join thousands of users who are benefiting from a more inclusive, accurate, and transparent credit scoring system.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    to="/onboarding"
                    className="px-8 py-3.5 rounded-full bg-primary text-primary-foreground text-base font-medium transition-all hover:bg-primary/90 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                  >
                    Get Your Score Now
                  </Link>
                  <a
                    href="#how-it-works"
                    className="px-8 py-3.5 rounded-full bg-secondary text-foreground text-base font-medium transition-all hover:bg-secondary/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                  >
                    Learn More
                  </a>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-primary/20 blur-3xl"></div>
              <div className="absolute -bottom-32 -left-32 h-64 w-64 rounded-full bg-primary/10 blur-3xl"></div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
      <AIAssistant />
    </div>
  );
};

export default Index;
