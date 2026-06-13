import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ComparisonTableAnalysis } from "../types";
import { LayoutGrid, AlertCircle, Sparkles } from "lucide-react";

interface ComparisonTableViewProps {
  comparisonTable?: ComparisonTableAnalysis;
}

export default function ComparisonTableView({ comparisonTable }: ComparisonTableViewProps) {
  const [selectedCell, setSelectedCell] = useState<{
    criteria: string;
    optionName: string;
    rating: number;
    notes: string;
  } | null>(null);

  if (!comparisonTable) return null;

  const { options, rows, winner, reasoning } = comparisonTable;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between border-b border-[#1A1A1A] pb-2">
        <h2 className="font-serif italic text-2xl font-semibold text-[#1A1A1A]">
          Direct Option Comparison Grid
        </h2>
        <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#1A1A1A]/60">
          Form 02 / Matrix Comparison
        </span>
      </div>

      <div className="overflow-x-auto border-2 border-[#1A1A1A] bg-white">
        <table className="min-w-full divide-y-2 divide-[#1A1A1A]">
          <thead className="bg-[#F5F2ED]">
            <tr>
              <th scope="col" className="px-6 py-4 text-left font-serif text-sm font-bold text-[#1A1A1A]">
                Evaluation Criteria
              </th>
              {options.map((option, idx) => {
                const isWinner = winner.toLowerCase() === option.toLowerCase();
                return (
                  <th
                    key={idx}
                    scope="col"
                    className={`px-6 py-4 text-center font-serif text-sm font-bold ${
                      isWinner ? "bg-[#1A1A1A]/5" : ""
                    }`}
                  >
                    <div className="flex flex-col items-center space-y-1">
                      <span className="text-[#1A1A1A] font-extrabold uppercase tracking-wide text-xs">
                        {option}
                      </span>
                      {isWinner && (
                        <span className="inline-flex items-center gap-1 bg-[#1A1A1A] text-[#F5F2ED] text-[9px] font-mono font-bold px-2 py-0.5 uppercase tracking-widest">
                          <Sparkles className="w-2.5 h-2.5 text-[#E63946]" /> Advantage
                        </span>
                      )}
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1A1A1A] bg-white">
            {rows.map((row, rowIdx) => (
              <tr key={rowIdx} className="hover:bg-[#F5F2ED]/25 transition-colors">
                <td className="px-6 py-4 font-sans text-sm font-semibold text-[#1A1A1A] border-r border-[#1A1A1A]/10">
                  {row.criteria}
                </td>
                {options.map((option, optIdx) => {
                  const scoreObj = row.scores.find(
                    (s) => s.optionName.toLowerCase() === option.toLowerCase()
                  ) || { rating: 0, notes: "No rating provided." };

                  const ratingValue = scoreObj.rating;
                  const isHigh = ratingValue >= 4;
                  const isLow = ratingValue <= 2;

                  return (
                    <td
                      key={optIdx}
                      className={`px-6 py-4 text-center ${
                        winner.toLowerCase() === option.toLowerCase() ? "bg-[#1A1A1A]/2" : ""
                      }`}
                    >
                      <div className="flex flex-col items-center justify-center space-y-2">
                        {/* Numerical Rating Badges */}
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map((num) => (
                            <div
                              key={num}
                              className={`w-3.5 h-3.5 border border-[#1A1A1A] flex items-center justify-center text-[8px] font-mono font-bold ${
                                num <= ratingValue
                                  ? isHigh
                                    ? "bg-[#1A1A1A] text-white"
                                    : isLow
                                    ? "bg-[#E63946] text-white border-[#E63946]"
                                    : "bg-amber-300 text-[#1A1A1A]"
                                  : "bg-transparent text-slate-300 border-slate-200"
                              }`}
                            >
                              {num}
                            </div>
                          ))}
                        </div>

                        {/* Interactive cell detail button */}
                        <button
                          onClick={() =>
                            setSelectedCell({
                              criteria: row.criteria,
                              optionName: option,
                              rating: ratingValue,
                              notes: scoreObj.notes,
                            })
                          }
                          className="font-mono text-[10px] uppercase tracking-wider text-slate-600 hover:text-indigo-600 transition-colors flex items-center gap-1 underline decoration-dotted decoration-slate-400"
                        >
                          <AlertCircle className="w-3 h-3 text-slate-400 shrink-0" />
                          View Analysis
                        </button>
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Cell Detail Tray */}
      <AnimatePresence>
        {selectedCell && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-2 border-[#1A1A1A] bg-[#F5F2ED] p-5"
          >
            <div className="flex justify-between items-start gap-4">
              <div className="space-y-1">
                <span className="font-mono text-[9px] uppercase tracking-widest text-[#E63946] font-bold">
                  EVALUATION LOG • {selectedCell.criteria}
                </span>
                <h4 className="font-serif italic text-lg font-semibold text-[#1A1A1A]">
                  Reasoning for {selectedCell.optionName} Score ({selectedCell.rating}/5)
                </h4>
                <p className="font-sans text-[#1A1A1A]/80 text-[13px] leading-relaxed mt-2 whitespace-pre-line border-l-2 border-[#1A1A1A] pl-3">
                  {selectedCell.notes}
                </p>
              </div>
              <button
                onClick={() => setSelectedCell(null)}
                className="font-mono text-[10px] uppercase tracking-widest text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-[#F5F2ED] border border-[#1A1A1A] px-3 py-1 bg-white transition-colors shrink-0"
              >
                Dismiss
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Comparative Winner Panel */}
      <div className="border-2 border-[#1A1A1A] bg-white p-5 flex items-start gap-4">
        <span className="p-3 bg-[#1A1A1A] text-white shrink-0">
          <LayoutGrid className="w-5 h-5 text-[#F5F2ED]" />
        </span>
        <div className="space-y-1">
          <h3 className="font-serif text-lg font-bold text-[#1A1A1A]">
            Weighted Winner Recommendation: <span className="italic text-indigo-700">{winner}</span>
          </h3>
          <p className="font-sans text-slate-700 text-[13px] leading-relaxed">
            {reasoning}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
