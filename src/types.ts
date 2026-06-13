export interface ProConItem {
  text: string;
  weight: number; // Importance scale (1 to 5)
  category: string; // e.g., Financial, Career, Time, Happiness
}

export interface ProsConsAnalysis {
  pros: ProConItem[];
  cons: ProConItem[];
  summary: string;
}

export interface OptionScore {
  optionName: string;
  rating: number; // 1 to 5 scale
  notes: string; // reason for the rating
}

export interface ComparisonRow {
  criteria: string;
  scores: OptionScore[];
}

export interface ComparisonTableAnalysis {
  options: string[];
  rows: ComparisonRow[];
  winner: string;
  reasoning: string;
}

export interface SwotAnalysis {
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  threats: string[];
  summary: string;
}

export interface Decision {
  id: string;
  title: string;
  description: string;
  options: string[];
  status: 'pending' | 'resolved';
  finalChoice?: string;
  createdAt: string;
  prosCons?: ProsConsAnalysis;
  comparisonTable?: ComparisonTableAnalysis;
  swot?: SwotAnalysis;
  verdict?: string;
}
