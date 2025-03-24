
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AIAssistant } from "@/components/AIAssistant";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Users, Copy, Share2, Award } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";

const Referrals = () => {
  const referralCode = "HEDERA25";
  
  const copyReferralCode = () => {
    navigator.clipboard.writeText(referralCode);
    toast({
      title: "Copied!",
      description: "Referral code copied to clipboard",
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container px-4 mx-auto">
          {/* Page header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Referral Program</h1>
            <p className="text-muted-foreground">
              Invite friends to join and earn rewards when they sign up.
            </p>
          </div>
          
          <SidebarProvider>
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Sidebar */}
              <AppSidebar />
              
              {/* Main Content */}
              <div className="flex-1 space-y-8">
                <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="h-5 w-5 text-primary" />
                      Your Referral Rewards
                    </CardTitle>
                    <CardDescription>
                      Earn crypto tokens for each friend who signs up and verifies their account
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <div className="p-4 bg-background rounded-lg shadow-sm">
                        <p className="text-sm text-muted-foreground mb-1">Total Referrals</p>
                        <p className="text-2xl font-bold">12</p>
                      </div>
                      <div className="p-4 bg-background rounded-lg shadow-sm">
                        <p className="text-sm text-muted-foreground mb-1">Pending Rewards</p>
                        <p className="text-2xl font-bold">5 HBAR</p>
                      </div>
                      <div className="p-4 bg-background rounded-lg shadow-sm">
                        <p className="text-sm text-muted-foreground mb-1">Total Earned</p>
                        <p className="text-2xl font-bold">23 HBAR</p>
                      </div>
                    </div>
                    
                    <div className="bg-card p-4 rounded-lg border">
                      <h3 className="text-sm font-medium mb-2">Your Referral Code</h3>
                      <div className="flex gap-2">
                        <Input value={referralCode} readOnly className="bg-background font-medium text-center" />
                        <Button variant="outline" size="icon" onClick={copyReferralCode}>
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Share2 className="h-5 w-5" />
                      Share with Friends
                    </CardTitle>
                    <CardDescription>
                      Invite friends to join our decentralized credit platform
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex gap-2">
                      <Button className="flex-1">
                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                        </svg>
                        Share on Facebook
                      </Button>
                      <Button variant="outline" className="flex-1">
                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.054 10.054 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                        </svg>
                        Share on Twitter
                      </Button>
                    </div>
                    
                    <div className="p-4 bg-secondary/50 rounded-lg">
                      <h3 className="text-sm font-medium mb-2">How it works</h3>
                      <ol className="space-y-2 text-sm text-muted-foreground pl-5 list-decimal">
                        <li>Share your unique referral link or code with friends</li>
                        <li>They sign up using your referral code</li>
                        <li>Once they verify their account, you both receive 5 HBAR tokens</li>
                        <li>Rewards can be claimed to your Hedera wallet instantly</li>
                      </ol>
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

export default Referrals;
