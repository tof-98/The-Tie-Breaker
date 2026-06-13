import { motion } from "motion/react";
import { ProsConsAnalysis } from "../types";
import { ChevronRight, Percent } from "lucide-react";

interface ProsConsViewProps {
  prosCons?: ProsConsAnalysis;
}

export default function ProsConsView({ prosCons }: ProsConsViewProps) {
  if (!prosCons) return null;

  const { pros, cons, summary } = prosCons;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between border-b border-[#1A1A1A] pb-2">
        <h2 className="font-serif italic text-2xl font-semibold text-[#1A1A1A]">
          Pros & Cons Balance Sheet
        </h2>
        <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#1A1A1A]/60">
          Form 01 / Balance of Forces
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Pros (The Supportive Forces) */}
        <div className="space-y-4">
          <div className="border-b-2 border-emerald-700 pb-2">
            <h3 className="font-serif italic text-lg font-bold text-emerald-800">
              The Support Arguments (Pros)
            </h3>
            <p className="font-mono text-[9px] uppercase tracking-wider text-emerald-600 mt-1">
              Active Benefits & Force Accelerators
            </p>
          </div>

          {pros.length === 0 ? (
            <p className="font-sans text-xs text-slate-400 italic">No supportive elements found.</p>
          ) : (
            <div className="space-y-3">
              {pros.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-[#1A1A1A] p-4 border-l-4 border-emerald-600 shadow-xs transition-transform hover:-translate-y-0.5"
                >
                  <div className="flex justify-between items-start gap-4 mb-2">
                    <span className="text-[10px] bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 font-mono font-bold uppercase tracking-wider">
                      {item.category || "General"}
                    </span>
                    <span className="font-mono text-[10px] text-slate-500 font-bold shrink-0">
                      WEIGHT: {item.weight}/5
                    </span>
                  </div>
                  <p className="font-sans text-[#1A1A1A] text-[13px] leading-relaxed">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Cons (The Risk Elements) */}
        <div className="space-y-4">
          <div className="border-b-2 border-rose-700 pb-2">
            <h3 className="font-serif italic text-lg font-bold text-rose-800">
              The Risk Elements (Cons)
            </h3>
            <p className="font-mono text-[9px] uppercase tracking-wider text-rose-500 mt-1">
              Frictional Risks & Retarding Factors
            </p>
          </div>

          {cons.length === 0 ? (
            <p className="font-sans text-xs text-slate-400 italic">No retarding factors found.</p>
          ) : (
            <div className="space-y-3">
              {cons.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-[#1A1A1A] p-4 border-l-4 border-rose-600 shadow-xs transition-transform hover:-translate-y-0.5"
                >
                  <div className="flex justify-between items-start gap-4 mb-2">
                    <span className="text-[10px] bg-rose-50 text-rose-800 border border-rose-200 px-2 py-0.5 font-mono font-bold uppercase tracking-wider">
                      {item.category || "General"}
                    </span>
                    <span className="font-mono text-[10px] text-slate-500 font-bold shrink-0">
                      WEIGHT: {item.weight}/5
                    </span>
                  </div>
                  <p className="font-sans text-[#1A1A1A] text-[13px] leading-relaxed">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Balance Summary block */}
      {summary && (
        <div className="border-2 border-[#1A1A1A] bg-white p-5 flex items-start gap-4">
          <span className="p-3 bg-indigo-50 text-indigo-700 border border-[#1A1A1A] shrink-0 font-bold font-mono text-sm">
            TL;DR
          </span>
          <div className="space-y-1">
            <h4 className="text-[10px] font-bold font-mono uppercase tracking-widest text-[#1A1A1A]">
              Consolidated Net Core Logic
            </h4>
            <p className="font-sans text-[#1A1A1A] text-[13.5px] leading-relaxed">
              {summary}
            </p>
          </div>
        </div>
      )}
    </motion.div>
  );
}
