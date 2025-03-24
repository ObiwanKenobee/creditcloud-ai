
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AIAssistant } from "@/components/AIAssistant";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Tooltip as RechartsTooltip } from "recharts";

const Reports = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container px-4 mx-auto">
          {/* Page header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Reports</h1>
            <p className="text-muted-foreground">
              View detailed reports of your financial data and credit history.
            </p>
          </div>
          
          <SidebarProvider>
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Sidebar */}
              <AppSidebar />
              
              {/* Main Content */}
              <div className="flex-1">
                <div className="p-8 bg-card rounded-xl shadow-sm border border-border text-center">
                  <h2 className="text-2xl font-bold mb-4">Reports Dashboard</h2>
                  <p className="text-muted-foreground mb-8">
                    Your financial reports and analytics will appear here.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-6 bg-secondary/50 rounded-lg border border-border">
                      <h3 className="text-xl font-semibold mb-2">Credit Reports</h3>
                      <p className="text-sm text-muted-foreground">
                        View your detailed credit history and factors affecting your score.
                      </p>
                    </div>
                    
                    <div className="p-6 bg-secondary/50 rounded-lg border border-border">
                      <h3 className="text-xl font-semibold mb-2">Transaction History</h3>
                      <p className="text-sm text-muted-foreground">
                        Review your past financial transactions and payment history.
                      </p>
                    </div>
                    
                    <div className="p-6 bg-secondary/50 rounded-lg border border-border">
                      <h3 className="text-xl font-semibold mb-2">Spending Analytics</h3>
                      <p className="text-sm text-muted-foreground">
                        Analyze your spending patterns and identify areas for improvement.
                      </p>
                    </div>
                    
                    <div className="p-6 bg-secondary/50 rounded-lg border border-border">
                      <h3 className="text-xl font-semibold mb-2">Budget Tracking</h3>
                      <p className="text-sm text-muted-foreground">
                        Track your budget goals and monitor your progress over time.
                      </p>
                    </div>
                  </div>
                </div>
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

export default Reports;
