
// Credit Score types
export interface CreditFactor {
  name: string;
  score: number;
  weight: number;
  description: string;
}

export interface CreditScoreData {
  score: number;
  maxScore: number;
  riskLevel: string;
  verified: boolean;
  lastUpdated: string;
  factors: CreditFactor[];
  hederaTransactionId: string;
}

// Loan Offer types
export interface LoanOffer {
  id: string;
  lender: string;
  amount: number;
  interestRate: number;
  term: number;
  monthlyPayment: number;
  approved: boolean;
  logoUrl: string;
}

// Referral types
export interface ReferralHistory {
  id: number;
  name: string;
  date: string;
  status: string;
  reward: number;
}

export interface ReferralData {
  referralCode: string;
  referralLink: string;
  totalReferred: number;
  pendingRewards: number;
  claimedRewards: number;
  referralHistory: ReferralHistory[];
}

// Leaderboard types
export interface LeaderboardEntry {
  rank: number;
  name: string;
  referrals: number;
  rewards: number;
  badge: string;
  isCurrentUser?: boolean;
}

// Credit History types
export interface CreditHistoryPoint {
  month: string;
  score: number;
}

export interface CreditHistoryFactor {
  factor: string;
  value: number;
  change: string;
  trend: "up" | "down" | "stable";
}

export interface CreditHistory {
  history: CreditHistoryPoint[];
  factors: CreditHistoryFactor[];
}

// Transaction types
export interface Transaction {
  id: string;
  date: string;
  type: string;
  description: string;
  amount: number;
  status: string;
  impact: string;
  hederaId: string;
}

// AI Insight types
export interface AIInsight {
  title: string;
  description: string;
  impact: string;
  type: string;
}
