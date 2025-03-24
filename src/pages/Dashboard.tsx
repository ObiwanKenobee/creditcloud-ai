import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AIAssistant } from "@/components/AIAssistant";
import { CreditScoreCard } from "@/components/CreditScoreCard";
import { BarChart, PieChart, Shield } from "lucide-react";
import {
  SidebarProvider,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";

// Define tab type
type Tab = {
  id: string;
  label: string;
  icon: React.ElementType;
  path: string;
};

// Define tabs with paths
const tabs: Tab[] = [
  { id: "overview", label: "Overview", icon: PieChart, path: "/dashboard" },
  { id: "loans", label: "Loan Eligibility", icon: BarChart, path: "/loan-eligibility" },
];

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const navigate = useNavigate();

  // Find the current active tab
  const currentTab = tabs.find(tab => tab.id === activeTab);

  // Handle tab click - now navigates to the appropriate route
  const handleTabClick = (tabId: string, path: string) => {
    setActiveTab(tabId);
    navigate(path);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container px-4 mx-auto">
          {/* Welcome header */}
          <div className="mb-8">
            <div className="flex items-baseline justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-2">Welcome back, Alex</h1>
                <p className="text-muted-foreground">
                  Your decentralized credit score and financial insights at a glance.
                </p>
              </div>
              <div>
                <span className="text-xs text-muted-foreground">Last updated:</span>
                <span className="text-sm ml-1">Today, 10:45 AM</span>
              </div>
            </div>
          </div>
          
          {/* Main content */}
          <SidebarProvider>
            <div className="flex flex-col lg:flex-row gap-8 min-h-[70vh]">
              {/* Sidebar */}
              <AppSidebar />
              
              {/* Main content area */}
              <div className="flex-1">
                {/* Content based on active tab */}
                {activeTab === "overview" && (
                  <div className="space-y-8 animate-fade-in">
                    {/* Summary stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-card rounded-xl p-6 shadow-sm border border-border hover:shadow-md transition-all">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-sm font-medium text-muted-foreground">Credit Rating</h3>
                          <div className="h-8 w-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                            <span className="text-xs font-medium text-green-600 dark:text-green-400">A+</span>
                          </div>
                        </div>
                        <p className="text-2xl font-bold">Excellent</p>
                        <p className="text-xs text-muted-foreground mt-1">Top 15% of users</p>
                      </div>
                      
                      <div className="bg-card rounded-xl p-6 shadow-sm border border-border hover:shadow-md transition-all">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-sm font-medium text-muted-foreground">Loan Eligibility</h3>
                          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                            <BarChart className="h-4 w-4 text-primary" />
                          </div>
                        </div>
                        <p className="text-2xl font-bold">$35,000</p>
                        <p className="text-xs text-muted-foreground mt-1">Estimated maximum amount</p>
                      </div>
                      
                      <div className="bg-card rounded-xl p-6 shadow-sm border border-border hover:shadow-md transition-all">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-sm font-medium text-muted-foreground">Interest Rate</h3>
                          <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                            <span className="text-xs font-medium text-blue-600 dark:text-blue-400">%</span>
                          </div>
                        </div>
                        <p className="text-2xl font-bold">8.5%</p>
                        <p className="text-xs text-muted-foreground mt-1">Average for your score</p>
                      </div>
                    </div>
                    
                    {/* Credit score card */}
                    <CreditScoreCard score={750} />
                    
                    {/* Recommendations */}
                    <div className="bg-card rounded-xl shadow-sm border border-border overflow-hidden">
                      <div className="p-6">
                        <h3 className="text-lg font-medium mb-4">AI-Powered Recommendations</h3>
                        
                        <div className="space-y-4">
                          <div className="flex items-start gap-4 p-4 bg-secondary/50 rounded-lg">
                            <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
                              <svg className="h-5 w-5 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                            </div>
                            <div>
                              <h4 className="text-sm font-medium">Excellent Payment History</h4>
                              <p className="text-xs text-muted-foreground mt-1">
                                Your consistent payment history is a major positive factor in your credit score. Keep up the good work!
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex items-start gap-4 p-4 bg-secondary/50 rounded-lg">
                            <div className="h-10 w-10 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center flex-shrink-0">
                              <svg className="h-5 w-5 text-yellow-600 dark:text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                              </svg>
                            </div>
                            <div>
                              <h4 className="text-sm font-medium">Consider Diversifying Your Credit</h4>
                              <p className="text-xs text-muted-foreground mt-1">
                                Having a diverse mix of credit types can positively impact your score. Consider adding a different type of account.
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex items-start gap-4 p-4 bg-secondary/50 rounded-lg">
                            <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                              <svg className="h-5 w-5 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                              </svg>
                            </div>
                            <div>
                              <h4 className="text-sm font-medium">Connect Additional Accounts</h4>
                              <p className="text-xs text-muted-foreground mt-1">
                                Link more financial accounts to improve the accuracy of your credit score and potentially increase it.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* For other tabs, show immediate navigation */}
                {activeTab !== "overview" && (
                  <div className="h-96 flex items-center justify-center bg-card rounded-xl shadow-sm border border-border animate-fade-in">
                    <div className="text-center max-w-md p-8">
                      <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-secondary mb-4">
                        {currentTab && <currentTab.icon className="h-6 w-6 text-muted-foreground" />}
                      </div>
                      <h2 className="text-xl font-medium mb-2">Navigating to {currentTab?.label}</h2>
                      <p className="text-muted-foreground mb-4">
                        You'll be redirected to the {currentTab?.label} page momentarily.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </SidebarProvider>
        </div>
      </main>
      
      <Footer />
      <AIAssistant />
    </div>
  );
};

export default Dashboard;
