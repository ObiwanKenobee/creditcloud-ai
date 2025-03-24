
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { BarChart, FileText, PieChart, Shield, Users } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarRail
} from "@/components/ui/sidebar";

// Define tab type
type Tab = {
  id: string;
  label: string;
  icon: React.ElementType;
  path: string;
};

// Define tabs with paths - shared across pages
const tabs: Tab[] = [
  { id: "overview", label: "Overview", icon: PieChart, path: "/dashboard" },
  { id: "loans", label: "Loan Eligibility", icon: BarChart, path: "/loan-eligibility" },
  { id: "reports", label: "Reports", icon: FileText, path: "/reports" },
  { id: "security", label: "Security", icon: Shield, path: "/security" },
  { id: "referrals", label: "Referrals", icon: Users, path: "/referrals" }
];

export const AppSidebar = () => {
  const location = useLocation();
  
  // Determine active tab based on current path
  const activeTabId = tabs.find(tab => tab.path === location.pathname)?.id || "overview";

  return (
    <Sidebar variant="floating" className="w-[240px]">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {tabs.map((tab) => (
                <SidebarMenuItem key={tab.id}>
                  <SidebarMenuButton 
                    isActive={activeTabId === tab.id}
                    asChild
                    tooltip={tab.label}
                  >
                    <Link to={tab.path}>
                      <tab.icon className="h-4 w-4" />
                      <span>{tab.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarGroup>
          <div className="p-4 bg-card rounded-xl shadow-sm border border-border">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Shield className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="text-sm font-medium">Secure Storage</h3>
                <p className="text-xs text-muted-foreground">Hedera DLT Technology</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              Your data is securely stored on Hedera's distributed ledger, protected by advanced encryption.
            </p>
          </div>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
};
