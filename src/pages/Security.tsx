
import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AIAssistant } from "@/components/AIAssistant";
import { 
  AlertCircle, 
  Bell, 
  Check, 
  ChevronRight, 
  CreditCard, 
  EyeOff, 
  Fingerprint, 
  HardDrive, 
  Lock, 
  Mailbox, 
  RadioTower, 
  RefreshCw, 
  Shield, 
  ShieldAlert, 
  ShieldCheck, 
  Smartphone
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

const SecurityPage = () => {
  const [fraudAlerts, setFraudAlerts] = useState(true);
  const [dataSharing, setDataSharing] = useState(false);
  const [creditMonitoring, setCreditMonitoring] = useState(true);
  const [twoFactorAuth, setTwoFactorAuth] = useState(true);
  const [biometricAuth, setBiometricAuth] = useState(false);
  const [darkWebMonitoring, setDarkWebMonitoring] = useState(false);
  
  const [phone, setPhone] = useState("+1 (555) 123-4567");
  const [email, setEmail] = useState("user@example.com");
  
  const [lastSecurityScan, setLastSecurityScan] = useState("2023-10-12T09:30:00Z");
  const [securityScore, setSecurityScore] = useState(85);
  
  const toggleSetting = (setting, value) => {
    // In a real app, this would make an API call to update settings on the backend
    toast({
      title: `${value ? "Enabled" : "Disabled"} ${setting}`,
      description: `Successfully ${value ? "enabled" : "disabled"} ${setting.toLowerCase()} for your account.`,
    });
  };
  
  const runSecurityScan = () => {
    // In a real app, this would trigger a comprehensive security scan
    toast({
      title: "Security Scan Started",
      description: "Running a comprehensive security check on your account.",
    });
    
    // Simulate scan delay
    setTimeout(() => {
      setLastSecurityScan(new Date().toISOString());
      setSecurityScore(90);
      
      toast({
        title: "Security Scan Complete",
        description: "Your account security has been verified. Security score: 90/100",
      });
    }, 2000);
  };
  
  const updateContactInfo = () => {
    // In a real app, this would update contact information
    toast({
      title: "Contact Information Updated",
      description: "Your contact information has been successfully updated.",
    });
  };
  
  const securityTips = [
    "Use a unique, strong password for your account",
    "Enable two-factor authentication for an extra layer of security",
    "Regularly check your credit report for unauthorized activity",
    "Be cautious about sharing personal information online",
    "Keep your devices and applications updated with the latest security patches"
  ];
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container px-4 mx-auto">
          {/* Page header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Security & Privacy</h1>
            <p className="text-muted-foreground">
              Manage your account security settings and control your data privacy on Hedera.
            </p>
          </div>
          
          {/* Security overview */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="md:col-span-2 h-full">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center">
                    <ShieldCheck className="h-5 w-5 mr-2 text-primary" />
                    Account Security Overview
                  </CardTitle>
                  <CardDescription>
                    Your security score and latest security scan results
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between bg-secondary/50 p-6 rounded-lg mb-6">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-1">Security Score</p>
                      <div className="flex items-baseline">
                        <span className="text-4xl font-bold mr-2">{securityScore}</span>
                        <span className="text-muted-foreground">/100</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Last scan: {new Date(lastSecurityScan).toLocaleString()}
                      </p>
                    </div>
                    <div className="h-24 w-24 rounded-full bg-background relative">
                      <svg viewBox="0 0 100 100" className="h-24 w-24 transform -rotate-90">
                        <circle
                          cx="50"
                          cy="50"
                          r="40"
                          fill="none"
                          stroke="var(--muted)"
                          strokeWidth="8"
                        />
                        <circle
                          cx="50"
                          cy="50"
                          r="40"
                          fill="none"
                          stroke="var(--primary)"
                          strokeWidth="8"
                          strokeDasharray={`${securityScore * 2.51} 251`}
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        {securityScore >= 80 ? (
                          <ShieldCheck className="h-8 w-8 text-primary" />
                        ) : securityScore >= 50 ? (
                          <Shield className="h-8 w-8 text-yellow-500" />
                        ) : (
                          <ShieldAlert className="h-8 w-8 text-destructive" />
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-center p-4 bg-green-50 dark:bg-green-900/10 rounded-lg border border-green-100 dark:border-green-900/20">
                      <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-full mr-4">
                        <Check className="h-5 w-5 text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <h3 className="text-sm font-medium">Two-Factor Authentication</h3>
                        <p className="text-xs text-muted-foreground">Enabled and active</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center p-4 bg-green-50 dark:bg-green-900/10 rounded-lg border border-green-100 dark:border-green-900/20">
                      <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-full mr-4">
                        <HardDrive className="h-5 w-5 text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <h3 className="text-sm font-medium">Blockchain Security</h3>
                        <p className="text-xs text-muted-foreground">Hedera DLT protection</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center p-4 bg-yellow-50 dark:bg-yellow-900/10 rounded-lg border border-yellow-100 dark:border-yellow-900/20">
                      <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-full mr-4">
                        <Fingerprint className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                      </div>
                      <div>
                        <h3 className="text-sm font-medium">Biometric Authentication</h3>
                        <p className="text-xs text-muted-foreground">Not configured</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center p-4 bg-yellow-50 dark:bg-yellow-900/10 rounded-lg border border-yellow-100 dark:border-yellow-900/20">
                      <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-full mr-4">
                        <EyeOff className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                      </div>
                      <div>
                        <h3 className="text-sm font-medium">Dark Web Monitoring</h3>
                        <p className="text-xs text-muted-foreground">Not enabled</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    onClick={runSecurityScan}
                    className="w-full"
                  >
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Run Security Scan
                  </Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center">
                    <AlertCircle className="h-5 w-5 mr-2 text-primary" />
                    Security Tips
                  </CardTitle>
                  <CardDescription>
                    Recommendations to improve your security
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {securityTips.map((tip, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="flex items-start text-sm"
                      >
                        <ChevronRight className="h-4 w-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                        <span>{tip}</span>
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </motion.div>
          
          {/* Security settings */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-10"
          >
            <h2 className="text-2xl font-bold mb-6">Security Settings</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Authentication settings */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center">
                    <Lock className="h-5 w-5 mr-2 text-primary" />
                    Authentication
                  </CardTitle>
                  <CardDescription>
                    Manage your account access methods
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col space-y-1">
                        <Label htmlFor="two-factor" className="font-medium">Two-Factor Authentication</Label>
                        <p className="text-sm text-muted-foreground">
                          Add an extra layer of security with SMS codes
                        </p>
                      </div>
                      <Switch
                        id="two-factor"
                        checked={twoFactorAuth}
                        onCheckedChange={(checked) => {
                          setTwoFactorAuth(checked);
                          toggleSetting("Two-Factor Authentication", checked);
                        }}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col space-y-1">
                        <Label htmlFor="biometric" className="font-medium">Biometric Authentication</Label>
                        <p className="text-sm text-muted-foreground">
                          Use fingerprint or face recognition to sign in
                        </p>
                      </div>
                      <Switch
                        id="biometric"
                        checked={biometricAuth}
                        onCheckedChange={(checked) => {
                          setBiometricAuth(checked);
                          toggleSetting("Biometric Authentication", checked);
                        }}
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="w-full">
                        Update Password
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Update Password</DialogTitle>
                        <DialogDescription>
                          Create a new, strong password for your account.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="current-password">Current Password</Label>
                          <Input type="password" id="current-password" placeholder="••••••••" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="new-password">New Password</Label>
                          <Input type="password" id="new-password" placeholder="••••••••" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="confirm-password">Confirm New Password</Label>
                          <Input type="password" id="confirm-password" placeholder="••••••••" />
                        </div>
                      </div>
                      <Button className="w-full">Update Password</Button>
                    </DialogContent>
                  </Dialog>
                </CardFooter>
              </Card>
              
              {/* Blockchain security */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center">
                    <RadioTower className="h-5 w-5 mr-2 text-primary" />
                    Hedera DLT Security
                  </CardTitle>
                  <CardDescription>
                    Manage your decentralized identity and data
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between bg-secondary/30 p-3 rounded-lg">
                      <div className="flex items-center">
                        <Fingerprint className="h-5 w-5 text-primary mr-3" />
                        <div>
                          <p className="text-sm font-medium">Hedera DID</p>
                          <p className="text-xs text-muted-foreground">did:hedera:0.0.3845261</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">View</Button>
                    </div>
                    
                    <div className="flex items-center justify-between bg-secondary/30 p-3 rounded-lg">
                      <div className="flex items-center">
                        <HardDrive className="h-5 w-5 text-primary mr-3" />
                        <div>
                          <p className="text-sm font-medium">Trusted Nodes</p>
                          <p className="text-xs text-muted-foreground">3 active connections</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">Manage</Button>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col space-y-1">
                        <Label htmlFor="data-sharing" className="font-medium">Data Sharing Permissions</Label>
                        <p className="text-sm text-muted-foreground">
                          Control who can access your credit data
                        </p>
                      </div>
                      <Switch
                        id="data-sharing"
                        checked={dataSharing}
                        onCheckedChange={(checked) => {
                          setDataSharing(checked);
                          toggleSetting("Data Sharing", checked);
                        }}
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="w-full">Manage Trusted Lenders</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>Manage Trusted Lenders</DialogTitle>
                        <DialogDescription>
                          Control which lenders can access your credit data.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center">
                            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                              <CreditCard className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <p className="font-medium">DeFi Credit Union</p>
                              <p className="text-xs text-muted-foreground">Last accessed: 3 days ago</p>
                            </div>
                          </div>
                          <Switch checked={true} />
                        </div>
                        
                        <div className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center">
                            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                              <CreditCard className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <p className="font-medium">Blockchain Bank</p>
                              <p className="text-xs text-muted-foreground">Last accessed: 1 week ago</p>
                            </div>
                          </div>
                          <Switch checked={true} />
                        </div>
                        
                        <div className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center">
                            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                              <CreditCard className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <p className="font-medium">Crypto Capital</p>
                              <p className="text-xs text-muted-foreground">Never accessed</p>
                            </div>
                          </div>
                          <Switch checked={false} />
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardFooter>
              </Card>
            </div>
          </motion.div>
          
          {/* Notifications and contact info */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold mb-6">Alerts & Contact Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Notification settings */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center">
                    <Bell className="h-5 w-5 mr-2 text-primary" />
                    Notification Settings
                  </CardTitle>
                  <CardDescription>
                    Manage security alerts and notifications
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col space-y-1">
                        <Label htmlFor="fraud-alerts" className="font-medium">Fraud Alerts</Label>
                        <p className="text-sm text-muted-foreground">
                          Get notified about suspicious activity
                        </p>
                      </div>
                      <Switch
                        id="fraud-alerts"
                        checked={fraudAlerts}
                        onCheckedChange={(checked) => {
                          setFraudAlerts(checked);
                          toggleSetting("Fraud Alerts", checked);
                        }}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col space-y-1">
                        <Label htmlFor="credit-monitoring" className="font-medium">Credit Monitoring</Label>
                        <p className="text-sm text-muted-foreground">
                          Get alerts when your credit score changes
                        </p>
                      </div>
                      <Switch
                        id="credit-monitoring"
                        checked={creditMonitoring}
                        onCheckedChange={(checked) => {
                          setCreditMonitoring(checked);
                          toggleSetting("Credit Monitoring", checked);
                        }}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col space-y-1">
                        <Label htmlFor="dark-web" className="font-medium">Dark Web Monitoring</Label>
                        <p className="text-sm text-muted-foreground">
                          Alert if your data appears on dark web
                        </p>
                      </div>
                      <Switch
                        id="dark-web"
                        checked={darkWebMonitoring}
                        onCheckedChange={(checked) => {
                          setDarkWebMonitoring(checked);
                          toggleSetting("Dark Web Monitoring", checked);
                        }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Contact information */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center">
                    <Mailbox className="h-5 w-5 mr-2 text-primary" />
                    Contact Information
                  </CardTitle>
                  <CardDescription>
                    Update your contact details for security alerts
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <div className="flex">
                        <Input 
                          id="phone" 
                          value={phone} 
                          onChange={(e) => setPhone(e.target.value)}
                          className="rounded-r-none"
                        />
                        <Button variant="secondary" className="rounded-l-none">
                          <Check className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground">Used for SMS verification and alerts</p>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <div className="flex">
                        <Input 
                          id="email" 
                          type="email" 
                          value={email} 
                          onChange={(e) => setEmail(e.target.value)}
                          className="rounded-r-none"
                        />
                        <Button variant="secondary" className="rounded-l-none">
                          <Check className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground">Used for account alerts and notifications</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full"
                    onClick={updateContactInfo}
                  >
                    <Smartphone className="mr-2 h-4 w-4" />
                    Update Contact Information
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </motion.div>
        </div>
      </main>
      
      <Footer />
      <AIAssistant />
    </div>
  );
};

export default SecurityPage;
