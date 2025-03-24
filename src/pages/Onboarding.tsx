
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { cn } from "@/lib/utils";

// Step type definition
type Step = {
  id: number;
  title: string;
  description: string;
};

// Define the steps
const steps: Step[] = [
  {
    id: 1,
    title: "Create Account",
    description: "Set up your secure CreditCloud AI account."
  },
  {
    id: 2,
    title: "Personal Information",
    description: "Tell us a bit about yourself."
  },
  {
    id: 3,
    title: "Connect Financial Data",
    description: "Link your financial accounts securely."
  },
  {
    id: 4,
    title: "AI Processing",
    description: "Our AI analyzes your financial profile."
  },
  {
    id: 5,
    title: "View Your Score",
    description: "See your decentralized credit score."
  }
];

const Onboarding = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [employment, setEmployment] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleNextStep = () => {
    if (currentStep < steps.length) {
      // Simulate loading for step 4 (AI Processing)
      if (currentStep === 3) {
        setIsLoading(true);
        setTimeout(() => {
          setIsLoading(false);
          setCurrentStep(currentStep + 1);
        }, 3000);
      } else {
        setCurrentStep(currentStep + 1);
      }
    } else {
      // Navigate to dashboard after completing all steps
      navigate("/dashboard");
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 flex items-center justify-center py-20 px-4">
        <div className="w-full max-w-3xl mx-auto">
          {/* Progress bar */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-2">
              {steps.map((step) => (
                <div 
                  key={step.id}
                  className={cn(
                    "flex items-center justify-center relative",
                    step.id !== steps.length && "flex-1"
                  )}
                >
                  {/* Step circle */}
                  <button
                    className={cn(
                      "h-8 w-8 rounded-full flex items-center justify-center text-xs font-medium transition-all duration-300",
                      currentStep === step.id && "ring-4 ring-primary/20",
                      currentStep > step.id ? "bg-primary text-primary-foreground" : 
                      currentStep === step.id ? "bg-primary text-primary-foreground" : 
                      "bg-secondary text-muted-foreground"
                    )}
                    onClick={() => step.id < currentStep && setCurrentStep(step.id)}
                    disabled={step.id >= currentStep}
                  >
                    {currentStep > step.id ? (
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      step.id
                    )}
                  </button>
                  
                  {/* Connecting line */}
                  {step.id !== steps.length && (
                    <div 
                      className={cn(
                        "absolute top-4 h-0.5 w-full left-0 -z-10 transition-all duration-500",
                        "bg-secondary",
                        { "before:absolute before:inset-0 before:bg-primary": currentStep > step.id }
                      )}
                      style={{ 
                        width: "calc(100% - 1rem)",
                        left: "calc(50% + 0.5rem)",
                        "&::before": { 
                          width: "100%", 
                          transformOrigin: "left" 
                        } 
                      }}
                    />
                  )}
                </div>
              ))}
            </div>
            
            {/* Step labels */}
            <div className="hidden sm:flex justify-between px-4">
              {steps.map((step) => (
                <div 
                  key={step.id} 
                  className={cn(
                    "text-center transition-colors duration-300",
                    currentStep >= step.id ? "text-foreground" : "text-muted-foreground"
                  )}
                  style={{ width: "20%" }}
                >
                  <p className="text-xs font-medium">{step.title}</p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Step content */}
          <div className="bg-card rounded-2xl shadow-sm border border-border overflow-hidden">
            <div className="p-8">
              {/* Step 1: Create Account */}
              {currentStep === 1 && (
                <div className="animate-fade-in">
                  <h2 className="text-2xl font-bold mb-2">Create Your Account</h2>
                  <p className="text-muted-foreground mb-6">
                    Let's start by setting up your secure CreditCloud AI account.
                  </p>
                  
                  <div className="space-y-6">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2">
                        Email Address
                      </label>
                      <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="password" className="block text-sm font-medium mb-2">
                        Password
                      </label>
                      <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Create a secure password"
                        className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                        />
                        <span className="ml-2 text-sm text-muted-foreground">
                          I agree to the <a href="#" className="text-primary hover:underline">Terms of Service</a> and <a href="#" className="text-primary hover:underline">Privacy Policy</a>
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Step 2: Personal Information */}
              {currentStep === 2 && (
                <div className="animate-fade-in">
                  <h2 className="text-2xl font-bold mb-2">Personal Information</h2>
                  <p className="text-muted-foreground mb-6">
                    Tell us a bit about yourself so we can better understand your financial profile.
                  </p>
                  
                  <div className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-2">
                        Full Name
                      </label>
                      <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your full name"
                        className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium mb-2">
                        Phone Number
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Your phone number"
                        className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="employment" className="block text-sm font-medium mb-2">
                        Employment Status
                      </label>
                      <select
                        id="employment"
                        value={employment}
                        onChange={(e) => setEmployment(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                        required
                      >
                        <option value="">Select your employment status</option>
                        <option value="full-time">Full-time employed</option>
                        <option value="part-time">Part-time employed</option>
                        <option value="self-employed">Self-employed</option>
                        <option value="student">Student</option>
                        <option value="unemployed">Unemployed</option>
                        <option value="retired">Retired</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Step 3: Connect Financial Data */}
              {currentStep === 3 && (
                <div className="animate-fade-in">
                  <h2 className="text-2xl font-bold mb-2">Connect Financial Data</h2>
                  <p className="text-muted-foreground mb-6">
                    Connect your financial accounts to help us build your credit profile. Your data is encrypted and secure.
                  </p>
                  
                  <div className="space-y-4">
                    <div className="border border-border rounded-lg p-4 hover:border-primary/50 hover:bg-secondary/30 transition-all cursor-pointer">
                      <div className="flex items-center">
                        <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <svg className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                          </svg>
                        </div>
                        <div className="ml-4">
                          <h3 className="text-sm font-medium">Bank Accounts</h3>
                          <p className="text-xs text-muted-foreground">Connect checking and savings accounts</p>
                        </div>
                        <div className="ml-auto">
                          <svg className="h-5 w-5 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border border-border rounded-lg p-4 hover:border-primary/50 hover:bg-secondary/30 transition-all cursor-pointer">
                      <div className="flex items-center">
                        <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
                          <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                          </svg>
                        </div>
                        <div className="ml-4">
                          <h3 className="text-sm font-medium">Mobile Payment Apps</h3>
                          <p className="text-xs text-muted-foreground">Connect M-Pesa, Venmo, Cash App, etc.</p>
                        </div>
                        <div className="ml-auto">
                          <svg className="h-5 w-5 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border border-border rounded-lg p-4 hover:border-primary/50 hover:bg-secondary/30 transition-all cursor-pointer">
                      <div className="flex items-center">
                        <div className="h-10 w-10 bg-purple-100 rounded-full flex items-center justify-center">
                          <svg className="h-5 w-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                          </svg>
                        </div>
                        <div className="ml-4">
                          <h3 className="text-sm font-medium">Utility Bills</h3>
                          <p className="text-xs text-muted-foreground">Connect utility payment history</p>
                        </div>
                        <div className="ml-auto">
                          <svg className="h-5 w-5 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border border-border rounded-lg p-4 hover:border-primary/50 hover:bg-secondary/30 transition-all cursor-pointer">
                      <div className="flex items-center">
                        <div className="h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center">
                          <svg className="h-5 w-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                        </div>
                        <div className="ml-4">
                          <h3 className="text-sm font-medium">Connect Blockchain Wallet</h3>
                          <p className="text-xs text-muted-foreground">Link your Hedera or other blockchain wallet</p>
                        </div>
                        <div className="ml-auto">
                          <svg className="h-5 w-5 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <p className="text-xs text-muted-foreground">
                      Your data is encrypted and stored securely on the Hedera distributed ledger. We never share your personal information without your consent.
                    </p>
                  </div>
                </div>
              )}
              
              {/* Step 4: AI Processing */}
              {currentStep === 4 && (
                <div className="animate-fade-in text-center py-10">
                  <div className="flex flex-col items-center justify-center">
                    <div className="relative mb-8">
                      <div className="h-32 w-32 rounded-full border-4 border-primary/30 border-t-primary animate-spin" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="h-20 w-20 rounded-full bg-gradient-to-br from-primary to-primary/60 animate-pulse-slow" />
                      </div>
                    </div>
                    
                    <h2 className="text-2xl font-bold mb-4">AI Processing Your Data</h2>
                    <p className="text-muted-foreground max-w-md mx-auto mb-6">
                      Our advanced AI is analyzing your financial data to create your decentralized credit score. This usually takes less than a minute.
                    </p>
                    
                    <div className="w-full max-w-md bg-secondary rounded-full h-2.5 mb-6">
                      <div className="bg-primary h-2.5 rounded-full animate-shimmer" style={{ width: "70%" }}></div>
                    </div>
                    
                    <div className="space-y-3 text-left">
                      <div className="flex items-center">
                        <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-sm">Analyzing payment history</span>
                      </div>
                      <div className="flex items-center">
                        <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-sm">Evaluating spending patterns</span>
                      </div>
                      <div className="flex items-center">
                        <div className="h-5 w-5 mr-2 flex items-center justify-center">
                          <div className="h-3 w-3 rounded-full bg-primary animate-pulse"></div>
                        </div>
                        <span className="text-sm">Processing blockchain transactions</span>
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <div className="h-5 w-5 mr-2"></div>
                        <span className="text-sm">Generating recommendations</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Step 5: View Score */}
              {currentStep === 5 && (
                <div className="animate-fade-in">
                  <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-green-100 text-green-600 mb-4">
                      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h2 className="text-2xl font-bold mb-2">Your Score is Ready!</h2>
                    <p className="text-muted-foreground">
                      Congratulations! Your decentralized credit score has been generated.
                    </p>
                  </div>
                  
                  <div className="flex flex-col items-center justify-center py-8 px-6 bg-secondary/50 rounded-2xl mb-8">
                    <span className="text-6xl font-bold text-primary mb-2 animate-scale-in">750</span>
                    <span className="text-sm text-muted-foreground">Your Credit Score (out of 1000)</span>
                    
                    <div className="mt-6 w-full max-w-xs">
                      <div className="relative h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                        <div className="absolute left-0 top-0 h-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 rounded-full w-full"></div>
                        <div className="absolute left-0 top-0 h-4 w-4 bg-white border-2 border-primary rounded-full shadow-md animate-scale-in" style={{ left: "75%" }}></div>
                      </div>
                      <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                        <span>Poor</span>
                        <span>Fair</span>
                        <span>Good</span>
                        <span>Excellent</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-6">
                      Visit your dashboard to see a detailed breakdown of your score, factors affecting it, and personalized recommendations.
                    </p>
                  </div>
                </div>
              )}
            </div>
            
            {/* Navigation buttons */}
            <div className="border-t border-border px-8 py-6 flex justify-between">
              <button
                onClick={handlePrevStep}
                disabled={currentStep === 1 || isLoading}
                className={cn(
                  "px-6 py-2.5 rounded-lg text-sm font-medium transition-all",
                  "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1",
                  currentStep === 1 || isLoading 
                    ? "bg-secondary text-muted-foreground cursor-not-allowed"
                    : "bg-secondary hover:bg-secondary/80 text-foreground"
                )}
              >
                Previous
              </button>
              
              <button
                onClick={handleNextStep}
                disabled={isLoading}
                className={cn(
                  "px-6 py-2.5 rounded-lg text-sm font-medium transition-all",
                  "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1",
                  isLoading
                    ? "bg-primary/70 text-primary-foreground cursor-not-allowed"
                    : "bg-primary hover:bg-primary/90 text-primary-foreground"
                )}
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing
                  </span>
                ) : currentStep === steps.length ? (
                  "Go to Dashboard"
                ) : (
                  "Continue"
                )}
              </button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Onboarding;
