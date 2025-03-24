
import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { cn } from "@/lib/utils";

type CreditScoreProps = {
  score?: number;
  className?: string;
};

// Sample data for the charts
const SCORE_DISTRIBUTION = [
  { name: "Payment History", value: 35 },
  { name: "Spending Habits", value: 30 },
  { name: "Trust Score", value: 25 },
  { name: "Other Factors", value: 10 },
];

const SCORE_HISTORY = [
  { month: "Jan", score: 580 },
  { month: "Feb", score: 610 },
  { month: "Mar", score: 640 },
  { month: "Apr", score: 630 },
  { month: "May", score: 670 },
  { month: "Jun", score: 720 },
  { month: "Jul", score: 750 },
];

const COLORS = ['#3b82f6', '#22c55e', '#6366f1', '#f43f5e'];

export const CreditScoreCard = ({ score = 750, className }: CreditScoreProps) => {
  const [animatedScore, setAnimatedScore] = useState(0);
  
  useEffect(() => {
    // Animate the score counter
    const duration = 2000; // 2 seconds
    const interval = 20; // Update every 20ms
    const steps = duration / interval;
    const increment = score / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= score) {
        clearInterval(timer);
        setAnimatedScore(score);
      } else {
        setAnimatedScore(Math.floor(current));
      }
    }, interval);
    
    return () => clearInterval(timer);
  }, [score]);
  
  // Get score color based on value
  const getScoreColor = () => {
    if (score >= 750) return "text-green-500";
    if (score >= 650) return "text-blue-500";
    if (score >= 550) return "text-yellow-500";
    return "text-red-500";
  };
  
  // Get score rating text
  const getScoreRating = () => {
    if (score >= 750) return "Excellent";
    if (score >= 650) return "Good";
    if (score >= 550) return "Fair";
    return "Needs Improvement";
  };

  return (
    <div className={cn(
      "bg-card rounded-2xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md",
      className
    )}>
      <div className="p-6">
        <div className="mb-8">
          <h3 className="text-sm font-medium text-muted-foreground">Your Credit Score</h3>
          <div className="flex items-baseline gap-2 mt-1">
            <span className={cn("text-5xl font-bold", getScoreColor())}>
              {animatedScore}
            </span>
            <span className="text-sm text-muted-foreground">/ 1000</span>
          </div>
          <div className={cn(
            "inline-block mt-2 px-2.5 py-0.5 text-xs font-medium rounded-full",
            score >= 750 ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" :
            score >= 650 ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300" :
            score >= 550 ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300" :
            "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
          )}>
            {getScoreRating()}
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Score Distribution */}
          <div>
            <h4 className="text-sm font-medium mb-4">Score Factors</h4>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={SCORE_DISTRIBUTION}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                    animationBegin={200}
                    animationDuration={1500}
                  >
                    {SCORE_DISTRIBUTION.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value: number) => [`${value}%`, 'Weight']}
                    contentStyle={{ 
                      borderRadius: '8px', 
                      border: '1px solid rgba(0,0,0,0.1)', 
                      boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            <div className="mt-4 grid grid-cols-2 gap-2">
              {SCORE_DISTRIBUTION.map((item, index) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                  <span className="text-xs text-muted-foreground">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Score History */}
          <div>
            <h4 className="text-sm font-medium mb-4">Score History</h4>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={SCORE_HISTORY} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.1)" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="rgba(0,0,0,0.3)" />
                  <YAxis domain={[500, 850]} tick={{ fontSize: 12 }} stroke="rgba(0,0,0,0.3)" />
                  <Tooltip 
                    contentStyle={{ 
                      borderRadius: '8px', 
                      border: '1px solid rgba(0,0,0,0.1)', 
                      boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'
                    }}
                    formatter={(value: number) => [value, 'Score']}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="score" 
                    stroke="#3b82f6" 
                    strokeWidth={2} 
                    dot={{ stroke: '#3b82f6', strokeWidth: 2, r: 4, fill: 'white' }}
                    activeDot={{ r: 6, stroke: '#3b82f6', strokeWidth: 2, fill: '#3b82f6' }}
                    animationDuration={2000}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
      
      <div className="border-t border-border p-6">
        <h4 className="text-sm font-medium mb-3">Improvement Tips</h4>
        <ul className="space-y-2">
          <li className="flex items-baseline gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5" />
            <span className="text-sm text-muted-foreground">Maintain consistent payment history to improve your score.</span>
          </li>
          <li className="flex items-baseline gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5" />
            <span className="text-sm text-muted-foreground">Consider diversifying your financial transactions for better rating.</span>
          </li>
          <li className="flex items-baseline gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5" />
            <span className="text-sm text-muted-foreground">Build your decentralized reputation by connecting more financial accounts.</span>
          </li>
        </ul>
      </div>
    </div>
  );
};
