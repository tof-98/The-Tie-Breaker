import { motion } from "motion/react";
import { SwotAnalysis } from "../types";
import { Compass } from "lucide-react";

interface SwotViewProps {
  swot?: SwotAnalysis;
}

export default function SwotView({ swot }: SwotViewProps) {
  if (!swot) return null;

  const { strengths, weaknesses, opportunities, threats, summary } = swot;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between border-b border-[#1A1A1A] pb-2">
        <h2 className="font-serif italic text-2xl font-semibold text-[#1A1A1A]">
          Strategic SWOT Matrix
        </h2>
        <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#1A1A1A]/60">
          Form 04 / Quadrant Analysis
        </span>
      </div>

      {/* SWOT Asymmetric Border Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 border-2 border-[#1A1A1A] bg-white overflow-hidden">
        {/* Strengths */}
        <div className="p-6 border-b sm:border-r border-[#1A1A1A] transition-colors hover:bg-[#F5F2ED]/20">
          <span className="font-mono text-[10px] font-bold uppercase tracking-widest block mb-4 text-emerald-700">
            01 / Strengths (Internal/Helpful)
          </span>
          {strengths.length === 0 ? (
            <p className="font-sans text-xs text-slate-400 italic">None determined.</p>
          ) : (
            <ul className="space-y-2.5 text-sm">
              {strengths.map((item, idx) => (
                <li key={idx} className="font-sans text-[13px] text-[#1A1A1A] flex items-start gap-2.5 leading-relaxed">
                  <span className="text-[#1A1A1A] font-bold shrink-0">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Weaknesses */}
        <div className="p-6 border-b border-[#1A1A1A] transition-colors hover:bg-[#F5F2ED]/20">
          <span className="font-mono text-[10px] font-bold uppercase tracking-widest block mb-4 text-[#E63946]">
            02 / Weaknesses (Internal/Limitations)
          </span>
          {weaknesses.length === 0 ? (
            <p className="font-sans text-xs text-slate-400 italic">None determined.</p>
          ) : (
            <ul className="space-y-2.5 text-sm text-slate-700">
              {weaknesses.map((item, idx) => (
                <li key={idx} className="font-sans text-[13px] text-[#1A1A1A] flex items-start gap-2.5 leading-relaxed">
                  <span className="text-rose-600 font-bold shrink-0">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Opportunities */}
        <div className="p-6 border-b sm:border-b-0 sm:border-r border-[#1A1A1A] bg-white transition-colors hover:bg-[#F5F2ED]/20">
          <span className="font-mono text-[10px] font-bold uppercase tracking-widest block mb-4 text-indigo-700">
            03 / Opportunities (External/Upsides)
          </span>
          {opportunities.length === 0 ? (
            <p className="font-sans text-xs text-slate-400 italic">None determined.</p>
          ) : (
            <ul className="space-y-2.5 text-sm">
              {opportunities.map((item, idx) => (
                <li key={idx} className="font-sans text-[13px] text-[#1A1A1A] flex items-start gap-2.5 leading-relaxed">
                  <span className="text-indigo-600 font-bold shrink-0">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Threats */}
        <div className="p-6 bg-[#1A1A1A] text-[#F5F2ED]">
          <span className="font-mono text-[10px] font-bold uppercase tracking-widest block mb-4 text-rose-300">
            04 / Threats (External/Risks)
          </span>
          {threats.length === 0 ? (
            <p className="font-sans text-xs text-gray-400 italic">None determined.</p>
          ) : (
            <ul className="space-y-2.5 text-sm">
              {threats.map((item, idx) => (
                <li key={idx} className="font-sans text-[13px] opacity-90 flex items-start gap-2.5 leading-relaxed">
                  <span className="text-rose-400 font-bold shrink-0">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {summary && (
        <div className="border border-[#1A1A1A] bg-white p-5 flex items-start gap-4">
          <Compass className="w-5 h-5 text-[#1A1A1A] mt-0.5 shrink-0" />
          <div className="space-y-1">
            <h4 className="text-[10px] font-bold font-mono uppercase tracking-widest text-[#1A1A1A]">
              Consolidated SWOT Interpretation
            </h4>
            <p className="font-sans text-[#1A1A1A]/80 text-[13px] leading-relaxed">
              {summary}
            </p>
          </div>
        </div>
      )}
    </motion.div>
  );
}
