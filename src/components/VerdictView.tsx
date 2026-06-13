import { motion } from "motion/react";
import { ArrowRight, Fingerprint, Sparkles } from "lucide-react";

interface VerdictViewProps {
  verdict: string;
  winner?: string;
  id?: string;
}

export default function VerdictView({ verdict, winner, id = "TIE-0A1" }: VerdictViewProps) {
  if (!verdict) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      id="verdict-card"
      className="relative overflow-hidden border-2 border-[#1A1A1A] bg-white p-6 md:p-8"
    >
      {/* Editorial Watermark */}
      <div className="absolute top-4 right-4 text-right select-none pointer-events-none">
        <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-[#1A1A1A]/30 block">
          CASE RESOLUTION
        </span>
        <span className="font-mono text-[9px] font-bold text-[#1A1A1A]/50 block">
          #{id}
        </span>
      </div>

      <div className="flex flex-col md:flex-row md:items-stretch gap-6">
        {/* Solid Black Asymmetric Badge */}
        <div className="flex-shrink-0 flex flex-col items-center justify-center w-14 h-14 bg-[#1A1A1A] text-white font-bold text-xl">
          <Fingerprint className="w-7 h-7 text-[#F5F2ED]" />
        </div>

        <div className="flex-grow flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#E63946] font-bold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 fill-current" />
              The AI Tie Breaker Verdict
            </span>
            {winner && (
              <h3 className="font-serif text-3xl font-bold tracking-tight text-[#1A1A1A]">
                Case Win: <span className="italic block sm:inline text-indigo-700">{winner}</span>
              </h3>
            )}
            {!winner && (
              <h3 className="font-serif text-3xl font-bold tracking-tight text-[#1A1A1A]">
                Definitive Resolution Adviceis
              </h3>
            )}
          </div>

          <p className="font-sans text-[#1A1A1A] leading-relaxed text-[15px] whitespace-pre-line border-l-4 border-[#1A1A1A] pl-4 py-1">
            {verdict}
          </p>

          <footer className="pt-2 flex flex-wrap gap-4 items-center text-xs font-mono font-bold tracking-wider text-slate-500">
            <span className="bg-[#1A1A1A] text-[#F5F2ED] px-2.5 py-1 text-[10px] uppercase tracking-[0.15em]">
              CONFIDENCE SCORE: 88%
            </span>
            <span className="text-slate-400">/</span>
            <span className="flex items-center gap-2 text-[#1A1A1A] uppercase tracking-wide">
              EXECUTION MATRIX <ArrowRight className="w-3.5 h-3.5 text-[#E63946]" />
            </span>
          </footer>
        </div>
      </div>
    </motion.div>
  );
}
