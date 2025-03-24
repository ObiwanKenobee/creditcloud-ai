
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AIAssistant } from "@/components/AIAssistant";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Shield, Lock, Eye, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";

const Security = () => {
  const handleToggle = () => {
    toast({
      title: "Setting Updated",
      description: "Your security preferences have been saved.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container px-4 mx-auto">
          {/* Page header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Security Settings</h1>
            <p className="text-muted-foreground">
              Manage your account security and privacy preferences.
            </p>
          </div>
          
          <SidebarProvider>
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Sidebar */}
              <AppSidebar />
              
              {/* Main Content */}
              <div className="flex-1 space-y-8">
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <Shield className="h-5 w-5 text-primary" />
                      <CardTitle>Account Security</CardTitle>
                    </div>
                    <CardDescription>
                      Manage your account security settings and login preferences
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between py-3 border-b">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <Lock className="h-4 w-4 text-muted-foreground" />
                          <h4 className="font-medium">Two-Factor Authentication</h4>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Add an extra layer of security to your account
                        </p>
                      </div>
                      <Button variant="outline">Enable</Button>
                    </div>
                    
                    <div className="flex items-center justify-between py-3 border-b">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                          <h4 className="font-medium">Login Notifications</h4>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Receive alerts when your account is accessed
                        </p>
                      </div>
                      <Switch onCheckedChange={handleToggle} />
                    </div>
                    
                    <div className="flex items-center justify-between py-3">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <Eye className="h-4 w-4 text-muted-foreground" />
                          <h4 className="font-medium">Privacy Mode</h4>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Hide sensitive information on your dashboard
                        </p>
                      </div>
                      <Switch onCheckedChange={handleToggle} />
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Blockchain Security</CardTitle>
                    <CardDescription>
                      View and manage your Hedera DLT security settings
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-4 bg-secondary/50 rounded-lg">
                      <h3 className="text-sm font-medium mb-2">Your Data on Hedera</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Your financial data is securely stored on the Hedera distributed ledger using 
                        advanced encryption technologies. Only you control access to this information.
                      </p>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">View Permissions</Button>
                        <Button variant="outline" size="sm">Manage Keys</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
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

export default Security;
