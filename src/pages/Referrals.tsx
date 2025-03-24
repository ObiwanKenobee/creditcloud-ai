
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AIAssistant } from "@/components/AIAssistant";
import { 
  Award, 
  Check, 
  ChevronRight, 
  Copy, 
  Gift, 
  Link, 
  Mail, 
  Share2, 
  Sparkles, 
  Trophy, 
  Twitter, 
  Users
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { ReferralData, LeaderboardEntry } from "@/types/api";

// Mock data for referrals
const fetchReferrals = async (): Promise<ReferralData> => {
  // In a real app, this would be an API call
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        referralCode: "ALEX25",
        referralLink: "https://decredify.com/ref/ALEX25",
        totalReferred: 8,
        pendingRewards: 250,
        claimedRewards: 450,
        referralHistory: [
          { id: 1, name: "Sarah Johnson", date: "2023-10-10T15:30:00Z", status: "Completed", reward: 50 },
          { id: 2, name: "Michael Smith", date: "2023-10-08T12:45:00Z", status: "Completed", reward: 50 },
          { id: 3, name: "James Wilson", date: "2023-10-05T09:20:00Z", status: "Completed", reward: 50 },
          { id: 4, name: "Emily Davis", date: "2023-10-02T14:15:00Z", status: "Completed", reward: 50 },
          { id: 5, name: "Robert Brown", date: "2023-09-28T11:30:00Z", status: "Completed", reward: 50 },
          { id: 6, name: "Jennifer Lee", date: "2023-09-25T10:10:00Z", status: "Completed", reward: 50 },
          { id: 7, name: "David Miller", date: "2023-09-20T16:45:00Z", status: "Completed", reward: 50 },
          { id: 8, name: "Lisa Taylor", date: "2023-09-15T13:20:00Z", status: "Completed", reward: 50 },
          { id: 9, name: "John Harris", date: "2023-10-12T08:45:00Z", status: "Pending", reward: 0 },
          { id: 10, name: "Maria Garcia", date: "2023-10-11T17:30:00Z", status: "Pending", reward: 0 }
        ]
      });
    }, 1000);
  });
};

// Mock data for leaderboard
const fetchLeaderboard = async (): Promise<LeaderboardEntry[]> => {
  // In a real app, this would be an API call
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([
        { rank: 1, name: "Thomas J.", referrals: 32, rewards: 1600, badge: "Diamond" },
        { rank: 2, name: "Sophia L.", referrals: 29, rewards: 1450, badge: "Platinum" },
        { rank: 3, name: "William K.", referrals: 24, rewards: 1200, badge: "Platinum" },
        { rank: 4, name: "Olivia M.", referrals: 21, rewards: 1050, badge: "Gold" },
        { rank: 5, name: "Alexander C.", referrals: 18, rewards: 900, badge: "Gold" },
        { rank: 6, name: "Emma S.", referrals: 15, rewards: 750, badge: "Silver" },
        { rank: 7, name: "Lucas P.", referrals: 12, rewards: 600, badge: "Silver" },
        { rank: 8, name: "You", referrals: 8, rewards: 400, badge: "Bronze", isCurrentUser: true },
        { rank: 9, name: "Harper R.", referrals: 7, rewards: 350, badge: "Bronze" },
        { rank: 10, name: "Mason T.", referrals: 5, rewards: 250, badge: "Bronze" }
      ]);
    }, 1500);
  });
};

// Function to get badge color
const getBadgeColor = (badge: string) => {
  switch (badge) {
    case "Diamond":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
    case "Platinum":
      return "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400";
    case "Gold":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
    case "Silver":
      return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400";
    case "Bronze":
      return "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400";
  }
};

// Function to get next tier information
const getNextTier = (referrals: number) => {
  if (referrals < 5) return { tier: "Bronze", needed: 5 - referrals, progress: (referrals / 5) * 100 };
  if (referrals < 10) return { tier: "Silver", needed: 10 - referrals, progress: (referrals / 10) * 100 };
  if (referrals < 15) return { tier: "Gold", needed: 15 - referrals, progress: (referrals / 15) * 100 };
  if (referrals < 25) return { tier: "Platinum", needed: 25 - referrals, progress: (referrals / 25) * 100 };
  return { tier: "Diamond", needed: 0, progress: 100 };
};

const Referrals = () => {
  const [copiedText, setCopiedText] = useState("");
  
  const { data: referralData, isLoading: isLoadingReferrals } = useQuery<ReferralData>({
    queryKey: ['referrals'],
    queryFn: fetchReferrals
  });
  
  const { data: leaderboardData, isLoading: isLoadingLeaderboard } = useQuery<LeaderboardEntry[]>({
    queryKey: ['leaderboard'],
    queryFn: fetchLeaderboard
  });
  
  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(type);
    
    // Reset the copied state after 2 seconds
    setTimeout(() => {
      setCopiedText("");
    }, 2000);
    
    toast({
      title: "Copied to Clipboard",
      description: `${type === "code" ? "Referral code" : "Referral link"} copied!`,
    });
    
    // Trigger confetti effect
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };
  
  const shareViaEmail = () => {
    // In a real app, this would open the user's email client
    const subject = "Join DeCreditify: AI-Powered Decentralized Credit Scoring";
    const body = `Hey, I thought you might be interested in DeCreditify - it's a decentralized credit scoring platform that uses AI and blockchain to give you control over your financial data.\n\nUse my referral code ${referralData?.referralCode} when you sign up: ${referralData?.referralLink}`;
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    toast({
      title: "Share via Email",
      description: "Opening your email client to share your referral",
    });
  };
  
  const shareViaTwitter = () => {
    // In a real app, this would open Twitter with a pre-filled tweet
    const text = `I'm using DeCreditify for decentralized credit scoring on Hedera - join me with my referral code ${referralData?.referralCode} and get rewarded! ${referralData?.referralLink}`;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, "_blank");
    
    toast({
      title: "Share via Twitter",
      description: "Opening Twitter to share your referral",
    });
  };
  
  const nextTier = getNextTier(referralData?.totalReferred || 0);
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container px-4 mx-auto">
          {/* Page header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Referral Program</h1>
            <p className="text-muted-foreground">
              Share DeCreditify with friends and earn rewards for each successful referral.
            </p>
          </div>
          
          {/* Referral info section */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Referral code and link */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Link className="h-5 w-5 mr-2 text-primary" />
                    Your Referral Details
                  </CardTitle>
                  <CardDescription>
                    Share these with friends to earn rewards
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {isLoadingReferrals ? (
                    <>
                      <div className="animate-pulse space-y-2">
                        <div className="h-5 w-24 bg-muted rounded"></div>
                        <div className="h-10 w-full bg-muted rounded"></div>
                      </div>
                      <div className="animate-pulse space-y-2">
                        <div className="h-5 w-24 bg-muted rounded"></div>
                        <div className="h-10 w-full bg-muted rounded"></div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Referral Code</label>
                        <div className="flex">
                          <Input 
                            value={referralData?.referralCode} 
                            readOnly 
                            className="font-medium bg-secondary/50 rounded-r-none"
                          />
                          <Button 
                            variant={copiedText === "code" ? "default" : "secondary"} 
                            className="rounded-l-none"
                            onClick={() => copyToClipboard(referralData?.referralCode, "code")}
                          >
                            {copiedText === "code" ? (
                              <Check className="h-4 w-4 mr-2" />
                            ) : (
                              <Copy className="h-4 w-4 mr-2" />
                            )}
                            {copiedText === "code" ? "Copied" : "Copy"}
                          </Button>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Referral Link</label>
                        <div className="flex">
                          <Input 
                            value={referralData?.referralLink} 
                            readOnly 
                            className="font-medium bg-secondary/50 rounded-r-none text-xs md:text-sm"
                          />
                          <Button 
                            variant={copiedText === "link" ? "default" : "secondary"} 
                            className="rounded-l-none"
                            onClick={() => copyToClipboard(referralData?.referralLink, "link")}
                          >
                            {copiedText === "link" ? (
                              <Check className="h-4 w-4 mr-2" />
                            ) : (
                              <Copy className="h-4 w-4 mr-2" />
                            )}
                            {copiedText === "link" ? "Copied" : "Copy"}
                          </Button>
                        </div>
                      </div>
                    </>
                  )}
                </CardContent>
                <CardFooter className="flex flex-wrap gap-2">
                  <Button 
                    variant="outline" 
                    onClick={shareViaEmail}
                    className="flex items-center"
                    disabled={isLoadingReferrals}
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    Share via Email
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={shareViaTwitter}
                    className="flex items-center"
                    disabled={isLoadingReferrals}
                  >
                    <Twitter className="h-4 w-4 mr-2" />
                    Share via Twitter
                  </Button>
                  <Button 
                    variant="outline"
                    className="flex items-center"
                    disabled={isLoadingReferrals}
                  >
                    <Share2 className="h-4 w-4 mr-2" />
                    More Options
                  </Button>
                </CardFooter>
              </Card>
              
              {/* Referral stats */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Award className="h-5 w-5 mr-2 text-primary" />
                    Your Referral Stats
                  </CardTitle>
                  <CardDescription>
                    Track your referrals and rewards
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {isLoadingReferrals ? (
                    <div className="space-y-4">
                      <div className="animate-pulse space-y-2">
                        <div className="h-5 w-24 bg-muted rounded"></div>
                        <div className="h-10 w-full bg-muted rounded"></div>
                      </div>
                      <div className="animate-pulse space-y-2">
                        <div className="h-5 w-24 bg-muted rounded"></div>
                        <div className="h-10 w-full bg-muted rounded"></div>
                      </div>
                      <div className="animate-pulse space-y-2">
                        <div className="h-5 w-24 bg-muted rounded"></div>
                        <div className="h-10 w-full bg-muted rounded"></div>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="text-center p-4 bg-primary/10 rounded-lg">
                        <h3 className="text-sm font-medium text-muted-foreground mb-1">Total Referrals</h3>
                        <p className="text-4xl font-bold">{referralData?.totalReferred}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {referralData?.referralHistory.filter(r => r.status === "Pending").length} pending activation
                        </p>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-4 bg-secondary/50 rounded-lg">
                          <h3 className="text-sm font-medium text-muted-foreground mb-1">Pending Rewards</h3>
                          <p className="text-2xl font-bold">${referralData?.pendingRewards}</p>
                        </div>
                        <div className="text-center p-4 bg-secondary/50 rounded-lg">
                          <h3 className="text-sm font-medium text-muted-foreground mb-1">Claimed Rewards</h3>
                          <p className="text-2xl font-bold">${referralData?.claimedRewards}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Next Tier: {nextTier.tier}</span>
                          <span>{referralData?.totalReferred} / {referralData?.totalReferred + nextTier.needed}</span>
                        </div>
                        <Progress value={nextTier.progress} className="h-2" />
                        <p className="text-xs text-muted-foreground">
                          {nextTier.needed > 0 ? (
                            `Refer ${nextTier.needed} more ${nextTier.needed === 1 ? 'person' : 'people'} to reach ${nextTier.tier}`
                          ) : (
                            "You've reached the highest tier!"
                          )}
                        </p>
                      </div>
                    </>
                  )}
                </CardContent>
                <CardFooter>
                  <Button variant="default" className="w-full" disabled={isLoadingReferrals}>
                    <Gift className="h-4 w-4 mr-2" />
                    Claim Rewards
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </motion.div>
          
          {/* How it works section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-10"
          >
            <h2 className="text-2xl font-bold mb-6">How It Works</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <Card className="h-full">
                  <CardContent className="pt-6">
                    <div className="rounded-full w-12 h-12 bg-primary/10 flex items-center justify-center mb-4">
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">1. Share Your Code</h3>
                    <p className="text-sm text-muted-foreground">
                      Share your unique referral code or link with friends and family who might benefit from decentralized credit scoring.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <Card className="h-full">
                  <CardContent className="pt-6">
                    <div className="rounded-full w-12 h-12 bg-primary/10 flex items-center justify-center mb-4">
                      <Sparkles className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">2. They Sign Up</h3>
                    <p className="text-sm text-muted-foreground">
                      When they create an account using your referral code, they'll get a welcome bonus and you'll be linked as the referrer.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
              >
                <Card className="h-full">
                  <CardContent className="pt-6">
                    <div className="rounded-full w-12 h-12 bg-primary/10 flex items-center justify-center mb-4">
                      <Gift className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">3. Earn Rewards</h3>
                    <p className="text-sm text-muted-foreground">
                      Once they complete the onboarding process, you'll earn $50 in rewards which can be redeemed for cryptocurrency or credit towards services.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </motion.div>
          
          {/* Leaderboard section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-10"
          >
            <div className="flex items-center mb-6">
              <Trophy className="h-6 w-6 mr-2 text-primary" />
              <h2 className="text-2xl font-bold">Referral Leaderboard</h2>
            </div>
            
            <Card>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12 text-center">Rank</TableHead>
                      <TableHead>User</TableHead>
                      <TableHead className="text-center">Referrals</TableHead>
                      <TableHead className="text-center">Rewards</TableHead>
                      <TableHead className="text-center">Badge</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {isLoadingLeaderboard ? (
                      Array(5).fill(0).map((_, index) => (
                        <TableRow key={index}>
                          <TableCell className="text-center">
                            <div className="h-6 w-6 bg-muted rounded-full mx-auto animate-pulse"></div>
                          </TableCell>
                          <TableCell>
                            <div className="h-4 w-24 bg-muted rounded animate-pulse"></div>
                          </TableCell>
                          <TableCell className="text-center">
                            <div className="h-4 w-8 bg-muted rounded mx-auto animate-pulse"></div>
                          </TableCell>
                          <TableCell className="text-center">
                            <div className="h-4 w-12 bg-muted rounded mx-auto animate-pulse"></div>
                          </TableCell>
                          <TableCell className="text-center">
                            <div className="h-6 w-16 bg-muted rounded mx-auto animate-pulse"></div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      leaderboardData?.map((entry) => (
                        <TableRow 
                          key={entry.rank}
                          className={entry.isCurrentUser ? "bg-primary/5" : ""}
                        >
                          <TableCell className="text-center font-medium">
                            {entry.rank <= 3 ? (
                              <div className={`rounded-full w-7 h-7 flex items-center justify-center mx-auto ${
                                entry.rank === 1 
                                  ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400" 
                                  : entry.rank === 2 
                                    ? "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400"
                                    : "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400"
                              }`}>
                                {entry.rank}
                              </div>
                            ) : (
                              entry.rank
                            )}
                          </TableCell>
                          <TableCell className="font-medium">
                            {entry.isCurrentUser ? (
                              <span className="font-bold text-primary">{entry.name}</span>
                            ) : (
                              entry.name
                            )}
                          </TableCell>
                          <TableCell className="text-center">
                            {entry.referrals}
                          </TableCell>
                          <TableCell className="text-center">
                            ${entry.rewards}
                          </TableCell>
                          <TableCell className="text-center">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getBadgeColor(entry.badge)}`}>
                              {entry.badge}
                            </span>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </Card>
          </motion.div>
          
          {/* Referral history */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h2 className="text-2xl font-bold mb-6">Referral History</h2>
            
            <Card>
              {isLoadingReferrals ? (
                <div className="p-8 text-center">
                  <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-primary border-r-transparent"></div>
                  <p className="mt-2 text-muted-foreground">Loading referral history...</p>
                </div>
              ) : referralData?.referralHistory.length > 0 ? (
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Reward</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {referralData?.referralHistory.map((referral) => (
                        <TableRow key={referral.id}>
                          <TableCell className="font-medium">{referral.name}</TableCell>
                          <TableCell>{new Date(referral.date).toLocaleDateString()}</TableCell>
                          <TableCell>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              referral.status === "Completed" 
                                ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" 
                                : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                            }`}>
                              {referral.status}
                            </span>
                          </TableCell>
                          <TableCell className="text-right font-medium">
                            {referral.reward > 0 ? `$${referral.reward}` : "-"}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12">
                  <Users className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-1">No referrals yet</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Share your referral code to start earning rewards
                  </p>
                  <Button>
                    Start Sharing
                  </Button>
                </div>
              )}
            </Card>
          </motion.div>
        </div>
      </main>
      
      <Footer />
      <AIAssistant />
    </div>
  );
};

export default Referrals;
