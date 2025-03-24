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
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";

const fetchCreditScore = async (): Promise<CreditScoreData> => {
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

const fetchLoanOffers = async (creditScore: number): Promise<LoanOffer[]> => {
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

const getCreditScoreColor = (score: number) => {
  if (score >= 701) return "text-green-500";
  if (score >= 401) return "text-yellow-500";
  return "text-red-500";
};

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
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Loan Eligibility</h1>
            <p className="text-muted-foreground">
              Check your decentralized credit score and view personalized loan offers.
            </p>
          </div>
          
          <SidebarProvider>
            <div className="flex flex-col lg:flex-row gap-8">
              <AppSidebar />
              
              <div className="flex-1">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
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
                       

