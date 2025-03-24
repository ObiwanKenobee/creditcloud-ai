
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AIAssistant } from "@/components/AIAssistant";
import { 
  ArrowDown01, 
  ArrowUp10, 
  Calendar, 
  Download, 
  ExternalLink, 
  FileText, 
  Filter, 
  Search, 
  Sparkles, 
  TrendingDown,
  TrendingUp 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend
} from "recharts";
import { motion } from "framer-motion";

// Mock data for credit history
const fetchCreditHistory = async () => {
  // In a real app, this would be an API call
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        history: [
          { month: "Jan", score: 685 },
          { month: "Feb", score: 690 },
          { month: "Mar", score: 705 },
          { month: "Apr", score: 720 },
          { month: "May", score: 715 },
          { month: "Jun", score: 730 },
          { month: "Jul", score: 745 },
          { month: "Aug", score: 750 },
          { month: "Sep", score: 755 },
          { month: "Oct", score: 780 }
        ],
        factors: [
          { factor: "Payment History", value: 95, change: "+5", trend: "up" },
          { factor: "Credit Utilization", value: 85, change: "+10", trend: "up" },
          { factor: "Credit Age", value: 75, change: "+2", trend: "up" },
          { factor: "Account Mix", value: 80, change: "0", trend: "stable" },
          { factor: "Credit Inquiries", value: 90, change: "+5", trend: "up" }
        ]
      });
    }, 1000);
  });
};

// Mock data for transactions
const fetchTransactions = async () => {
  // In a real app, this would be an API call to backend/Hedera
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([
        {
          id: "txn-001",
          date: "2023-10-10T08:30:00Z",
          type: "Payment",
          description: "Mortgage Payment",
          amount: 1250.00,
          status: "Completed",
          impact: "Positive",
          hederaId: "0.0.12345-1696924200-000000001"
        },
        {
          id: "txn-002",
          date: "2023-10-05T15:45:00Z",
          type: "Credit Card",
          description: "Credit Card Payment",
          amount: 350.00,
          status: "Completed",
          impact: "Positive",
          hederaId: "0.0.12345-1696518300-000000002"
        },
        {
          id: "txn-003",
          date: "2023-10-01T12:15:00Z",
          type: "Loan",
          description: "Personal Loan Payment",
          amount: 275.50,
          status: "Completed",
          impact: "Positive",
          hederaId: "0.0.12345-1696160100-000000003"
        },
        {
          id: "txn-004",
          date: "2023-09-28T10:00:00Z",
          type: "Utility",
          description: "Utility Bill Payment",
          amount: 125.75,
          status: "Completed",
          impact: "Positive",
          hederaId: "0.0.12345-1695891600-000000004"
        },
        {
          id: "txn-005",
          date: "2023-09-20T14:20:00Z",
          type: "Credit Inquiry",
          description: "Loan Application",
          amount: 0,
          status: "Completed",
          impact: "Neutral",
          hederaId: "0.0.12345-1695217200-000000005"
        },
        {
          id: "txn-006",
          date: "2023-09-15T09:30:00Z",
          type: "Late Payment",
          description: "Credit Card Late Fee",
          amount: 25.00,
          status: "Completed",
          impact: "Negative",
          hederaId: "0.0.12345-1694769000-000000006"
        },
        {
          id: "txn-007",
          date: "2023-09-10T16:45:00Z",
          type: "Payment",
          description: "Auto Loan Payment",
          amount: 450.00,
          status: "Completed",
          impact: "Positive",
          hederaId: "0.0.12345-1694363100-000000007"
        }
      ]);
    }, 1500);
  });
};

// Mock data for AI insights
const fetchAIInsights = async () => {
  // In a real app, this would be an API call
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([
        {
          title: "Improve Your Payment History",
          description: "Your recent on-time payments have positively impacted your score. Continue this trend for the next 3 months to potentially increase your score by 15-25 points.",
          impact: "High",
          type: "improvement"
        },
        {
          title: "Reduce Credit Card Utilization",
          description: "Your credit utilization is at 22%, which is good, but reducing it to under 10% could further improve your score by 10-20 points.",
          impact: "Medium",
          type: "improvement"
        },
        {
          title: "Avoid New Credit Applications",
          description: "You've had 2 credit inquiries in the past 6 months. Avoid applying for new credit for at least 6 more months to allow their impact to diminish.",
          impact: "Medium",
          type: "warning"
        },
        {
          title: "Consider Consolidating Debt",
          description: "You have multiple small debts. Consolidating them into a single loan could simplify payments and potentially reduce interest rates.",
          impact: "Low",
          type: "suggestion"
        }
      ]);
    }, 1200);
  });
};

// Functions to generate charts data
const generateCreditFactorsData = (factors) => {
  return factors.map(factor => ({
    name: factor.factor,
    value: factor.value,
    fill: factor.trend === "up" ? "#22c55e" : factor.trend === "down" ? "#ef4444" : "#64748b"
  }));
};

const Reports = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("date");
  const [sortDirection, setSortDirection] = useState("desc");
  const [filterType, setFilterType] = useState("");
  
  const { data: creditHistory, isLoading: isLoadingHistory } = useQuery({
    queryKey: ['creditHistory'],
    queryFn: fetchCreditHistory
  });
  
  const { data: transactions, isLoading: isLoadingTransactions } = useQuery({
    queryKey: ['transactions'],
    queryFn: fetchTransactions
  });
  
  const { data: aiInsights, isLoading: isLoadingInsights } = useQuery({
    queryKey: ['aiInsights'],
    queryFn: fetchAIInsights
  });
  
  const downloadReport = () => {
    // In a real app, this would generate and download a PDF
    toast({
      title: "Downloading Report",
      description: "Your credit report is being generated and will download shortly.",
    });
    
    // Simulate download delay
    setTimeout(() => {
      toast({
        title: "Download Complete",
        description: "Your credit report has been downloaded successfully.",
      });
    }, 2000);
  };
  
  const viewOnHederaExplorer = (hederaId) => {
    // In a real app, this would open the Hedera explorer for the specific transaction
    window.open(`https://hashscan.io/testnet/transaction/${hederaId}`, "_blank");
    
    toast({
      title: "Redirecting to Hedera Explorer",
      description: "Viewing transaction details on the Hedera distributed ledger.",
    });
  };
  
  // Filter and sort transactions
  const filteredAndSortedTransactions = transactions
    ? [...transactions]
        .filter(txn => 
          (filterType === "" || txn.type.toLowerCase() === filterType.toLowerCase()) &&
          (searchTerm === "" || 
           txn.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
           txn.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
           txn.status.toLowerCase().includes(searchTerm.toLowerCase()))
        )
        .sort((a, b) => {
          // Handle date sort
          if (sortField === "date") {
            return sortDirection === "asc" 
              ? new Date(a.date).getTime() - new Date(b.date).getTime()
              : new Date(b.date).getTime() - new Date(a.date).getTime();
          }
          
          // Handle amount sort
          if (sortField === "amount") {
            return sortDirection === "asc" ? a.amount - b.amount : b.amount - a.amount;
          }
          
          // Handle other string fields
          return sortDirection === "asc" 
            ? a[sortField].localeCompare(b[sortField])
            : b[sortField].localeCompare(a[sortField]);
        })
    : [];
    
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };
  
  // Get stats for impact types
  const getImpactStats = () => {
    if (!transactions) return { positive: 0, neutral: 0, negative: 0 };
    
    return transactions.reduce((acc, txn) => {
      const impact = txn.impact.toLowerCase();
      if (impact === "positive") acc.positive++;
      else if (impact === "neutral") acc.neutral++;
      else if (impact === "negative") acc.negative++;
      return acc;
    }, { positive: 0, neutral: 0, negative: 0 });
  };
  
  const impactStats = getImpactStats();
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container px-4 mx-auto">
          {/* Page header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Credit Reports</h1>
              <p className="text-muted-foreground">
                Detailed breakdown of your credit history and financial activities.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button 
                variant="outline" 
                onClick={downloadReport}
                className="flex items-center gap-2"
              >
                <Download className="h-4 w-4" />
                <span>Download Report</span>
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    <span>View NFT Badge</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Trust Score NFT Badge</DialogTitle>
                    <DialogDescription>
                      Your trust score is securely stored as an NFT on Hedera.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex flex-col items-center justify-center py-6">
                    <div className="w-40 h-40 rounded-lg bg-primary/10 flex items-center justify-center mb-4 relative overflow-hidden border-2 border-primary">
                      <div className="absolute inset-0 bg-gradient-radial from-primary/20 via-transparent to-transparent"></div>
                      <Sparkles className="h-16 w-16 text-primary" />
                    </div>
                    <h3 className="text-lg font-bold mb-1">Trusted Borrower</h3>
                    <p className="text-sm text-muted-foreground mb-3">Gold Tier (Level 3)</p>
                    <div className="text-xs bg-secondary px-2 py-1 rounded-full">
                      NFT ID: 0.0.7890123
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          
          {/* Credit history and stats */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
            {/* Credit history chart */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-2"
            >
              <Card className="h-full">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle>Credit Score History</CardTitle>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>Last 10 months</span>
                  </div>
                </CardHeader>
                <CardContent>
                  {isLoadingHistory ? (
                    <div className="animate-pulse w-full h-[300px] bg-muted rounded-lg"></div>
                  ) : (
                    <ResponsiveContainer width="100%" height={300}>
                      <AreaChart
                        data={creditHistory?.history}
                        margin={{
                          top: 10,
                          right: 10,
                          left: 0,
                          bottom: 0,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                        <XAxis dataKey="month" />
                        <YAxis domain={[600, 850]} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "var(--background)",
                            borderColor: "var(--border)",
                            borderRadius: "var(--radius)",
                          }}
                        />
                        <Area
                          type="monotone"
                          dataKey="score"
                          stroke="var(--primary)"
                          fill="var(--primary)"
                          fillOpacity={0.2}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  )}
                </CardContent>
              </Card>
            </motion.div>
            
            {/* Credit factors chart */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="lg:col-span-1"
            >
              <Card className="h-full">
                <CardHeader className="pb-2">
                  <CardTitle>Credit Factors</CardTitle>
                </CardHeader>
                <CardContent>
                  {isLoadingHistory ? (
                    <div className="animate-pulse w-full h-[300px] bg-muted rounded-lg"></div>
                  ) : (
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={generateCreditFactorsData(creditHistory?.factors || [])}
                          layout="vertical"
                          margin={{
                            top: 5,
                            right: 30,
                            left: 0,
                            bottom: 5,
                          }}
                        >
                          <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                          <XAxis type="number" domain={[0, 100]} />
                          <YAxis type="category" dataKey="name" width={100} />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: "var(--background)",
                              borderColor: "var(--border)",
                              borderRadius: "var(--radius)",
                            }}
                          />
                          <Bar dataKey="value" barSize={20} radius={[0, 4, 4, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>
          
          {/* AI insights section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-10"
          >
            <h2 className="text-2xl font-bold mb-4">AI-Powered Insights</h2>
            
            {isLoadingInsights ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((_, index) => (
                  <Card key={index} className="animate-pulse">
                    <CardHeader className="space-y-2">
                      <div className="h-5 w-40 bg-muted rounded"></div>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="h-4 w-full bg-muted rounded"></div>
                      <div className="h-4 w-full bg-muted rounded"></div>
                      <div className="h-4 w-2/3 bg-muted rounded"></div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {aiInsights?.map((insight, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Card>
                      <CardHeader className="pb-2">
                        <div className="flex items-start gap-3">
                          <div className={`p-2 rounded-full flex-shrink-0 ${
                            insight.type === 'improvement' 
                              ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400'
                              : insight.type === 'warning'
                                ? 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400'
                                : 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
                          }`}>
                            {insight.type === 'improvement' ? (
                              <TrendingUp className="h-4 w-4" />
                            ) : insight.type === 'warning' ? (
                              <TrendingDown className="h-4 w-4" />
                            ) : (
                              <Sparkles className="h-4 w-4" />
                            )}
                          </div>
                          <div>
                            <CardTitle className="text-base">{insight.title}</CardTitle>
                            <div className="flex items-center mt-1">
                              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                                insight.impact === 'High' 
                                  ? 'bg-primary/10 text-primary'
                                  : insight.impact === 'Medium'
                                    ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                                    : 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
                              }`}>
                                {insight.impact} Impact
                              </span>
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">
                          {insight.description}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
          
          {/* Transaction history section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
              <h2 className="text-2xl font-bold">Transaction History</h2>
              
              <div className="flex items-center gap-2 flex-wrap md:flex-nowrap">
                <div className="relative w-full md:w-64">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input 
                    type="search" 
                    placeholder="Search transactions..." 
                    className="pl-9"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="flex items-center gap-1">
                      <Filter className="h-4 w-4" />
                      <span>Filter</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Filter Transactions</DialogTitle>
                      <DialogDescription>
                        Select criteria to filter your transaction history.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div>
                        <h4 className="text-sm font-medium mb-2">Transaction Type</h4>
                        <div className="flex flex-wrap gap-2">
                          {["Payment", "Credit Card", "Loan", "Utility", "Credit Inquiry", "Late Payment"].map((type) => (
                            <Button
                              key={type}
                              variant={filterType === type ? "default" : "outline"}
                              size="sm"
                              onClick={() => setFilterType(filterType === type ? "" : type)}
                              className="text-xs"
                            >
                              {type}
                            </Button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
                
                <div className="flex">
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-r-none flex items-center gap-1 border-r-0"
                    onClick={() => handleSort(sortField)}
                  >
                    {sortDirection === "asc" ? (
                      <ArrowUp10 className="h-4 w-4" />
                    ) : (
                      <ArrowDown01 className="h-4 w-4" />
                    )}
                    {sortDirection === "asc" ? "Asc" : "Desc"}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-l-none flex items-center gap-1"
                    onClick={() => handleSort(sortField === "date" ? "amount" : "date")}
                  >
                    By {sortField === "date" ? "Date" : "Amount"}
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Transaction stats */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <Card className="bg-green-50 dark:bg-green-900/10 border-green-100 dark:border-green-900/20">
                <CardContent className="p-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-green-800 dark:text-green-400">Positive Impact</p>
                    <p className="text-2xl font-bold text-green-700 dark:text-green-300">{impactStats.positive}</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-green-600 dark:text-green-400" />
                </CardContent>
              </Card>
              
              <Card className="bg-blue-50 dark:bg-blue-900/10 border-blue-100 dark:border-blue-900/20">
                <CardContent className="p-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-blue-800 dark:text-blue-400">Neutral Impact</p>
                    <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">{impactStats.neutral}</p>
                  </div>
                  <div className="h-8 w-8 flex items-center justify-center text-blue-600 dark:text-blue-400">
                    <span className="text-xl font-bold">•</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-red-50 dark:bg-red-900/10 border-red-100 dark:border-red-900/20">
                <CardContent className="p-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-red-800 dark:text-red-400">Negative Impact</p>
                    <p className="text-2xl font-bold text-red-700 dark:text-red-300">{impactStats.negative}</p>
                  </div>
                  <TrendingDown className="h-8 w-8 text-red-600 dark:text-red-400" />
                </CardContent>
              </Card>
            </div>
            
            {/* Transactions table */}
            <Card>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead 
                        className="cursor-pointer"
                        onClick={() => handleSort("date")}
                      >
                        Date
                        {sortField === "date" && (
                          <span className="ml-1 inline-block">
                            {sortDirection === "asc" ? "↑" : "↓"}
                          </span>
                        )}
                      </TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead 
                        className="text-right cursor-pointer"
                        onClick={() => handleSort("amount")}
                      >
                        Amount
                        {sortField === "amount" && (
                          <span className="ml-1 inline-block">
                            {sortDirection === "asc" ? "↑" : "↓"}
                          </span>
                        )}
                      </TableHead>
                      <TableHead>Impact</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {isLoadingTransactions ? (
                      Array(5).fill(0).map((_, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            <div className="h-4 w-24 bg-muted rounded animate-pulse"></div>
                          </TableCell>
                          <TableCell>
                            <div className="h-4 w-20 bg-muted rounded animate-pulse"></div>
                          </TableCell>
                          <TableCell>
                            <div className="h-4 w-32 bg-muted rounded animate-pulse"></div>
                          </TableCell>
                          <TableCell>
                            <div className="h-4 w-16 bg-muted rounded animate-pulse float-right"></div>
                          </TableCell>
                          <TableCell>
                            <div className="h-4 w-16 bg-muted rounded animate-pulse"></div>
                          </TableCell>
                          <TableCell>
                            <div className="h-8 w-8 bg-muted rounded animate-pulse float-right"></div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : filteredAndSortedTransactions.length > 0 ? (
                      filteredAndSortedTransactions.map((txn) => (
                        <TableRow key={txn.id}>
                          <TableCell className="font-medium whitespace-nowrap">
                            {new Date(txn.date).toLocaleDateString()}
                          </TableCell>
                          <TableCell>{txn.type}</TableCell>
                          <TableCell>{txn.description}</TableCell>
                          <TableCell className="text-right font-medium">
                            {txn.amount ? `$${txn.amount.toFixed(2)}` : "-"}
                          </TableCell>
                          <TableCell>
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                              txn.impact === "Positive" 
                                ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                                : txn.impact === "Neutral"
                                  ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                                  : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                            }`}>
                              {txn.impact}
                            </span>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => viewOnHederaExplorer(txn.hederaId)}
                            >
                              <ExternalLink className="h-4 w-4" />
                              <span className="sr-only">View on Hedera</span>
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-10">
                          <div className="flex flex-col items-center justify-center">
                            <Search className="h-8 w-8 text-muted-foreground mb-4" />
                            <p className="text-lg font-medium mb-1">No transactions found</p>
                            <p className="text-sm text-muted-foreground">
                              Try changing your search term or clearing filters
                            </p>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </Card>
          </motion.div>
        </div>
      </main>
      
      <Footer />
      <AIAssistant />
    </div>
  );
};

export default Reports;
