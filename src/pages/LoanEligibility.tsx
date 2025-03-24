
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AIAssistant } from "@/components/AIAssistant";
import { 
  ArrowRight, 
  CircleCheck, 
  CircleX, 
  ExternalLink, 
  Info, 
  Shield, 
  TrendingUp 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { toast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { CreditScoreData, LoanOffer } from "@/types/api";

// Mock data for credit score
const fetchCreditScore = async (): Promise<CreditScoreData> => {
  // In a real app, this would be an API call to Hedera or backend
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        score: 780,
        maxScore: 1000,
        riskLevel: "Low Risk",
        verified: true,
        lastUpdated: "2023-10-15T14:30:00Z",
        factors: [
          { name: "Payment History", score: 95, weight: 35, description: "Your history of on-time payments" },
          { name: "Credit Utilization", score: 85, weight: 30, description: "How much of your available credit you're using" },
          { name: "Credit Age", score: 75, weight: 15, description: "Age of your oldest and newest accounts, and the average age of all accounts" },
          { name: "Account Mix", score: 80, weight: 10, description: "The different types of credit accounts you have" },
          { name: "Credit Inquiries", score: 90, weight: 10, description: "Recent applications for credit" }
        ],
        hederaTransactionId: "0.0.12345-1682347200-000000123"
      });
    }, 1000);
  });
};

// Mock data for loan offers
const fetchLoanOffers = async (creditScore: number): Promise<LoanOffer[]> => {
  // In a real app, this would fetch data from lenders based on the credit score
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([
        {
          id: "loan-1",
          lender: "DeFi Credit Union",
          amount: 10000,
          interestRate: 5.9,
          term: 36,
          monthlyPayment: 303.43,
          approved: true,
          logoUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=100&h=100&auto=format&fit=crop&q=60&crop=faces"
        },
        {
          id: "loan-2",
          lender: "Blockchain Bank",
          amount: 25000,
          interestRate: 6.5,
          term: 60,
          monthlyPayment: 488.75,
          approved: true,
          logoUrl: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=100&h=100&auto=format&fit=crop&q=60&crop=faces"
        },
        {
          id: "loan-3",
          lender: "Crypto Capital",
          amount: 50000,
          interestRate: 7.2,
          term: 84,
          monthlyPayment: 720.31,
          approved: false,
          logoUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100&h=100&auto=format&fit=crop&q=60&crop=faces"
        }
      ]);
    }, 1500);
  });
};

// Function to determine credit score color
const getCreditScoreColor = (score: number) => {
  if (score >= 701) return "text-green-500";
  if (score >= 401) return "text-yellow-500";
  return "text-red-500";
};

// Function to determine risk level background
const getRiskLevelBackground = (riskLevel: string) => {
  if (riskLevel === "Low Risk") return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
  if (riskLevel === "Moderate Risk") return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
  return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
};

const LoanEligibility = () => {
  const { data: creditData, isLoading: isLoadingCredit } = useQuery<CreditScoreData>({
    queryKey: ['creditScore'],
    queryFn: fetchCreditScore
  });
  
  const { data: loanOffers, isLoading: isLoadingOffers } = useQuery<LoanOffer[]>({
    queryKey: ['loanOffers', creditData?.score],
    queryFn: () => fetchLoanOffers(creditData?.score || 0),
    enabled: !!creditData?.score
  });
  
  const [simulationResult, setSimulationResult] = useState<{ approved: boolean; message: string } | null>(null);

  const runEligibilitySimulation = () => {
    // In a real app, this would make an API call to run a more complex simulation
    const isApproved = creditData && creditData.score > 650;
    
    setSimulationResult({
      approved: isApproved,
      message: isApproved 
        ? "Based on your credit profile, you have a high likelihood of loan approval." 
        : "Based on your credit profile, you may face challenges getting approved for a loan. Consider improving your credit score."
    });
    
    toast({
      title: isApproved ? "Simulation Complete" : "Simulation Results",
      description: isApproved 
        ? "Your credit profile shows a high approval likelihood." 
        : "There may be factors affecting your loan eligibility.",
      variant: isApproved ? "default" : "destructive",
    });
  };

  const viewOnHederaExplorer = () => {
    if (creditData?.hederaTransactionId) {
      // This would open the Hedera explorer in a real app
      window.open(`https://hashscan.io/testnet/transaction/${creditData.hederaTransactionId}`, "_blank");
      
      toast({
        title: "Redirecting to Hedera Explorer",
        description: "Viewing your credit data on the Hedera distributed ledger.",
      });
    }
  };

  const handleApplyForLoan = (lender: string) => {
    toast({
      title: "Redirecting to Lender",
      description: `You're being redirected to ${lender}'s application portal.`,
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container px-4 mx-auto">
          {/* Page header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Loan Eligibility</h1>
            <p className="text-muted-foreground">
              Check your decentralized credit score and view personalized loan offers.
            </p>
          </div>
          
          {/* Credit score section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
            {/* Credit score card */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-1"
            >
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    <span>Credit Score</span>
                    {creditData?.verified && (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <Shield className="h-5 w-5 text-primary" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Verified on Hedera Blockchain</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}
                  </CardTitle>
                  <CardDescription>
                    Your decentralized credit assessment
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center pt-4">
                  {isLoadingCredit ? (
                    <div className="animate-pulse w-32 h-32 rounded-full bg-muted flex items-center justify-center">
                      <span className="text-muted-foreground">Loading...</span>
                    </div>
                  ) : (
                    <>
                      <div className="text-center mb-6">
                        <div className="text-6xl font-bold mb-2 relative">
                          <span className={getCreditScoreColor(creditData?.score || 0)}>
                            {creditData?.score}
                          </span>
                          <span className="text-sm text-muted-foreground absolute top-0 right-0 -mr-8">
                            /{creditData?.maxScore}
                          </span>
                        </div>
                        <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getRiskLevelBackground(creditData?.riskLevel || '')}`}>
                          {creditData?.riskLevel}
                        </div>
                      </div>
                      
                      <div className="w-full space-y-3">
                        {creditData?.factors.map((factor, index) => (
                          <div key={index} className="space-y-1">
                            <div className="flex justify-between text-sm">
                              <HoverCard>
                                <HoverCardTrigger asChild>
                                  <span className="flex items-center cursor-help">
                                    {factor.name} 
                                    <Info className="h-3.5 w-3.5 ml-1 text-muted-foreground" />
                                  </span>
                                </HoverCardTrigger>
                                <HoverCardContent className="w-80">
                                  <div className="space-y-2">
                                    <h4 className="text-sm font-semibold">{factor.name} ({factor.weight}%)</h4>
                                    <p className="text-sm text-muted-foreground">{factor.description}</p>
                                  </div>
                                </HoverCardContent>
                              </HoverCard>
                              <span className="font-medium">{factor.score}/100</span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-1.5">
                              <div 
                                className="bg-primary rounded-full h-1.5" 
                                style={{ width: `${factor.score}%` }}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </CardContent>
                <CardFooter className="flex justify-between">
                  <p className="text-xs text-muted-foreground">
                    Last updated: {creditData?.lastUpdated ? new Date(creditData.lastUpdated).toLocaleString() : 'Loading...'}
                  </p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-xs"
                    onClick={viewOnHederaExplorer}
                    disabled={isLoadingCredit || !creditData?.hederaTransactionId}
                  >
                    View on Hedera <ExternalLink className="ml-1 h-3 w-3" />
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
            
            {/* Simulation and eligibility section */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="lg:col-span-2"
            >
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>Loan Eligibility Assessment</CardTitle>
                  <CardDescription>
                    Use our AI-powered simulator to check your loan approval likelihood
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-4">
                  {simulationResult ? (
                    <div className={`p-6 rounded-lg border mb-6 ${
                      simulationResult.approved 
                        ? "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-900" 
                        : "bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-900"
                    }`}>
                      <div className="flex items-start gap-4">
                        <div className={`rounded-full p-2 ${
                          simulationResult.approved 
                            ? "bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-300" 
                            : "bg-red-100 text-red-700 dark:bg-red-800 dark:text-red-300"
                        }`}>
                          {simulationResult.approved ? <CircleCheck className="h-5 w-5" /> : <CircleX className="h-5 w-5" />}
                        </div>
                        <div>
                          <h3 className="text-lg font-medium mb-1">
                            {simulationResult.approved ? "High Approval Likelihood" : "Approval Challenges Detected"}
                          </h3>
                          <p className="text-sm text-muted-foreground">{simulationResult.message}</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center p-10 border border-dashed rounded-lg mb-6">
                      <TrendingUp className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                      <h3 className="text-lg font-medium mb-2">Run Eligibility Simulation</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Our AI will analyze your credit profile and predict loan approval likelihood.
                      </p>
                      <Button 
                        onClick={runEligibilitySimulation} 
                        disabled={isLoadingCredit}
                      >
                        Run Simulation
                      </Button>
                    </div>
                  )}
                  
                  <div>
                    <h3 className="text-lg font-medium mb-4">
                      Financial Insights
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 bg-secondary/50 rounded-lg">
                        <h4 className="text-sm font-medium mb-1">Debt-to-Income Ratio</h4>
                        <p className="text-2xl font-bold">28%</p>
                        <p className="text-xs text-muted-foreground">
                          Good (Under 36% is recommended)
                        </p>
                      </div>
                      <div className="p-4 bg-secondary/50 rounded-lg">
                        <h4 className="text-sm font-medium mb-1">Credit Utilization</h4>
                        <p className="text-2xl font-bold">22%</p>
                        <p className="text-xs text-muted-foreground">
                          Excellent (Under 30% is ideal)
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
          
          {/* Loan offers section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">Personalized Loan Offers</h2>
              <p className="text-muted-foreground">
                Based on your decentralized credit score from verified blockchain data
              </p>
            </div>
            
            {isLoadingOffers ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((_, index) => (
                  <Card key={index} className="animate-pulse">
                    <CardHeader className="space-y-2">
                      <div className="h-5 w-24 bg-muted rounded"></div>
                      <div className="h-4 w-40 bg-muted rounded"></div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="h-10 w-32 bg-muted rounded"></div>
                      <div className="space-y-2">
                        <div className="h-4 w-full bg-muted rounded"></div>
                        <div className="h-4 w-full bg-muted rounded"></div>
                        <div className="h-4 w-2/3 bg-muted rounded"></div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <div className="h-10 w-full bg-muted rounded"></div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {loanOffers?.map((offer, index) => (
                  <motion.div
                    key={offer.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Card className={`overflow-hidden ${!offer.approved && 'opacity-75'}`}>
                      {!offer.approved && (
                        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm z-10 flex items-center justify-center">
                          <div className="bg-card p-4 rounded-lg shadow-lg max-w-xs text-center">
                            <CircleX className="h-8 w-8 mx-auto mb-2 text-destructive" />
                            <h4 className="font-medium mb-1">Not Eligible</h4>
                            <p className="text-xs text-muted-foreground">
                              Your current credit score doesn't meet the requirements for this loan.
                            </p>
                          </div>
                        </div>
                      )}
                      <div className="p-4 border-b flex items-center gap-3">
                        <div className="h-10 w-10 rounded-md bg-muted overflow-hidden">
                          <img src={offer.logoUrl} alt={offer.lender} className="h-full w-full object-cover" />
                        </div>
                        <div>
                          <h3 className="font-medium">{offer.lender}</h3>
                          <p className="text-xs text-muted-foreground">Personal Loan</p>
                        </div>
                      </div>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-baseline">
                          <CardTitle className="text-2xl font-bold">
                            ${offer.amount.toLocaleString()}
                          </CardTitle>
                          <CardDescription className="text-sm">
                            {offer.term} months
                          </CardDescription>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div>
                            <p className="text-sm text-muted-foreground mb-1">Interest Rate</p>
                            <p className="font-medium">{offer.interestRate}%</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground mb-1">Monthly</p>
                            <p className="font-medium">${offer.monthlyPayment}</p>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button 
                          className="w-full"
                          onClick={() => handleApplyForLoan(offer.lender)}
                          disabled={!offer.approved}
                        >
                          Apply Now <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </main>
      
      <Footer />
      <AIAssistant />
    </div>
  );
};

export default LoanEligibility;
