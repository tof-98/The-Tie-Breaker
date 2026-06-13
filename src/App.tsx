import { useState, useEffect, FormEvent, MouseEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Briefcase, 
  Plus, 
  Trash2, 
  BookOpen, 
  Scale, 
  Cpu, 
  Layers, 
  CheckCircle, 
  ArrowRight, 
  HelpCircle,
  FileText,
  Bookmark,
  ChevronRight,
  RefreshCw,
  FolderOpen
} from "lucide-react";

import { Decision } from "./types";
import VerdictView from "./components/VerdictView";
import ProsConsView from "./components/ProsConsView";
import ComparisonTableView from "./components/ComparisonTableView";
import SwotView from "./components/SwotView";

const STORAGE_KEY = "the_tie_breaker_decisions_v1";

// Default preset decisions to delight the user instantly
const PRESETS: Decision[] = [
  {
    id: "CASE-108",
    title: "Expansion to European Market",
    description: "Deciding whether to build a brick-and-mortar physical European headquarters in London to anchor credibility with Tier-1 partners, versus sticking with a highly distributed remote-first stance to reduce operational burns and legal friction.",
    options: ["Establish physical London HQ", "Maintain remote distributed setup"],
    status: "resolved",
    createdAt: new Date("2026-06-12T10:00:00Z").toLocaleDateString(),
    prosCons: {
      pros: [
        { text: "Direct sync connection to high-profile UK/EMEA corporate venture network.", weight: 5, category: "Financial" },
        { text: "Dramatically accelerates corporate maturity branding in the eye of series-C local banks.", weight: 4, category: "Brand" },
        { text: "Synchronous core operations pipeline without waiting on timezone offsets.", weight: 3, category: "Velocity" }
      ],
      cons: [
        { text: "Extreme rent overhead and regulatory hiring frictions in London post-Brexit.", weight: 5, category: "Operations" },
        { text: "Relocation friction will distract core product development capacity for 3 to 6 months.", weight: 4, category: "Resource" }
      ],
      summary: "While establishing an EMEA workspace signals mature corporate capability to institutional banks, distributed engineering keeps run-burn low during periods of high economic interest volatility."
    },
    comparisonTable: {
      options: ["Establish physical London HQ", "Maintain remote distributed setup"],
      rows: [
        {
          criteria: "Financial Investment Intensity",
          scores: [
            { optionName: "Establish physical London HQ", rating: 1, notes: "Extremely high initial layout with multi-year lease guarantees required." },
            { optionName: "Maintain remote distributed setup", rating: 5, notes: "Near-zero cost profile, keeping equity structure completely unburdened." }
          ]
        },
        {
          criteria: "Hiring Premium Velocity",
          scores: [
            { optionName: "Establish physical London HQ", rating: 4, notes: "Draws premium localized executive talent who demand a formal boardroom presence." },
            { optionName: "Maintain remote distributed setup", rating: 3, notes: "Taps broad geographical pool but loses competitive edge on localized key hires." }
          ]
        },
        {
          criteria: "Regulatory Risk Burden",
          scores: [
            { optionName: "Establish physical London HQ", rating: 2, notes: "Demands strict cross-border labor alignment & separate corporate setup compliance." },
            { optionName: "Maintain remote distributed setup", rating: 5, notes: "Relies on pre-existing global EOR agencies with simple master agreements." }
          ]
        }
      ],
      winner: "Maintain remote distributed setup",
      reasoning: "Maintaining a distributed presence yields vastly superior economic elasticity, permitting raw capital to flow directly into high-yield product lines rather than corporate real estate."
    },
    swot: {
      strengths: [
        { text: "Strong balance sheet preservation through minimal rent liability." },
        { text: "Uncapped talent pool acquisition across 14 European territories." }
      ].map(e => e.text),
      weaknesses: [
        { text: "Weak brand presence for conservative financial institutions." },
        { text: "Diffused executive alignment due to screen-only communications." }
      ].map(e => e.text),
      opportunities: [
        { text: "Tapping remote-first software incentives offered by progressive states." },
        { text: "Targeted travel offset budgets to run high-density regional assemblies." }
      ].map(e => e.text),
      threats: [
        { text: "Local competitors capturing top-tier talent via dynamic hub environments." },
        { text: "Severe burnout from continuous asynchronous message volume." }
      ].map(e => e.text),
      summary: "Distributed systems maximize functional adaptation to external volatility. However, they mandate consistent operational hygiene to preserve core corporate culture."
    },
    verdict: "Maintain a remote distributed setup temporarily. Do not bind early capital into a long-term commercial lease under high-margin rate conditions. Instead, allocate a dedicated $150K annual 'Hub Assembly Fund' to host recurrent key workshops in London every quarter. This captures physical collaboration bonuses and local networking access without committing to immense capital liabilities."
  },
  {
    id: "CASE-402",
    title: "Launch Mobile Client First vs Web First",
    description: "Determining whether we should launch our new B2B project targeting field inspectors on native iOS/Android clients, or deploy a single responsive desktop web-app wrapper to ensure instantaneous iteration.",
    options: ["Deploy responsive desktop Web first", "Launch native mobile application"],
    status: "resolved",
    createdAt: new Date("2026-06-11T14:30:00Z").toLocaleDateString(),
    prosCons: {
      pros: [
        { text: "Can patch bugs instantly with standard CI pipelines; bypasses Apple review pipelines.", weight: 5, category: "Time to Market" },
        { text: "Lower setup cost as single codebase services both desktop and mobile layouts.", weight: 4, category: "Financial" }
      ],
      cons: [
        { text: "Requires persistent network connectivity; loses key offline cached reporting limits.", weight: 5, category: "Usability" },
        { text: "Responsive styling suffers from heavy navigation trade-offs in low-light sites.", weight: 3, category: "UX Accent" }
      ],
      summary: "Web wrapper delivers unbeatable distribution agility but loses native telemetry capture critical for field inspectors operating in dark or baseline off-grid environments."
    },
    comparisonTable: {
      options: ["Deploy responsive desktop Web first", "Launch native mobile application"],
      rows: [
        {
          criteria: "Offline Functionality Reliability",
          scores: [
            { optionName: "Deploy responsive desktop Web first", rating: 2, notes: "Extremely difficult to manage reliable, crash-free SQLite data storage inside basic mobile Web wrappers." },
            { optionName: "Launch native mobile application", rating: 5, notes: "Fully uninhibited native directory write permissions ensure 100% data reliability even in deep mines." }
          ]
        },
        {
          criteria: "Development Lifecycle Sprints",
          scores: [
            { optionName: "Deploy responsive desktop Web first", rating: 5, notes: "Web adjustments are active immediately on reload, bypass App Store gatekeeper constraints completely." },
            { optionName: "Launch native mobile application", rating: 2, notes: "Every single hotfix requires a tedious 24-48 hour review cycles from Apple and Google review units." }
          ]
        }
      ],
      winner: "Launch native mobile application",
      reasoning: "Field inspection tools must be ironclad offline first. Users will lose all faith if network drops lead to hard interface crashes or deleted status records."
    },
    swot: {
      strengths: [
        { text: "Direct database storage write system on physical disk." },
        { text: "Consistent 60fps interaction speed during active photo logs." }
      ].map(e => e.text),
      weaknesses: [
        { text: "Tedious review cycle queues blocking agile features." },
        { text: "Dual native code paths require distinct React Native or Swift expertise." }
      ].map(e => e.text),
      opportunities: [
        { text: "App Store algorithm visibility triggers for industrial utilities." },
        { text: "Exclusive partnership distributions with hardware inventory vendors." }
      ].map(e => e.text),
      threats: [
        { text: "Suddenly changing OS guidelines invalidating critical API connections." },
        { text: "Fragmented mobile hardware configurations causing unpredictable field failures." }
      ].map(e => e.text),
      summary: "Native strategies prioritize absolute reliability where the rubber meets the road. However, they require persistent internal capability overhead to balance dual OS releases."
    },
    verdict: "Launch the Native Mobile Application. Because the user group (field inspectors) operates in remote cell-tower dead zones, client robustness is your singular value metric. A web app that freezes or loses a 40-item report due to variable IP signal will destroy workspace credibility. Use React Native to minimize development overhead while maintaining native file-system writes."
  }
];

export default function App() {
  const [decisions, setDecisions] = useState<Decision[]>([]);
  const [activeDecision, setActiveDecision] = useState<Decision | null>(null);
  
  // Tab states for analysis view: 'verdict' | 'proscons' | 'comparison' | 'swot'
  const [activeTab, setActiveTab] = useState<'verdict' | 'proscons' | 'comparison' | 'swot'>('verdict');

  // Form input states
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [optionsInput, setOptionsInput] = useState<string[]>(["", ""]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisError, setAnalysisError] = useState<string | null>(null);

  // Initialize and load decisions
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as Decision[];
        if (parsed && parsed.length > 0) {
          setDecisions(parsed);
          setActiveDecision(parsed[0]);
        } else {
          setDecisions(PRESETS);
          setActiveDecision(PRESETS[0]);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(PRESETS));
        }
      } catch (e) {
        setDecisions(PRESETS);
        setActiveDecision(PRESETS[0]);
      }
    } else {
      setDecisions(PRESETS);
      setActiveDecision(PRESETS[0]);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(PRESETS));
    }
  }, []);

  // Sync back to localStorage
  const saveToStorage = (updatedList: Decision[]) => {
    setDecisions(updatedList);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));
  };

  // Add a new dynamic option field
  const addOptionField = () => {
    if (optionsInput.length < 5) {
      setOptionsInput([...optionsInput, ""]);
    }
  };

  const removeOptionField = (index: number) => {
    if (optionsInput.length > 2) {
      const copy = [...optionsInput];
      copy.splice(index, 1);
      setOptionsInput(copy);
    }
  };

  const handleOptionChange = (value: string, index: number) => {
    const copy = [...optionsInput];
    copy[index] = value;
    setOptionsInput(copy);
  };

  // Submitting analysis to backend server
  const runTieBreakerAnalysis = async (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setAnalysisError("Please provide an overarching decision title or question.");
      return;
    }

    setIsAnalyzing(true);
    setAnalysisError(null);

    // Filter down empty option strings
    const finalOptions = optionsInput.filter(opt => opt.trim() !== "");

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title.trim(),
          description: description.trim(),
          options: finalOptions
        })
      });

      if (!response.ok) {
        const errJson = await response.json().catch(() => ({}));
        throw new Error(errJson.error || `Server returned error status ${response.status}`);
      }

      const analyzedData = await response.json();

      // Create new decision report
      const newId = `CASE-${Math.floor(100 + Math.random() * 900)}`;
      const newReport: Decision = {
        id: newId,
        title: title.trim(),
        description: description.trim() || "No supporting context specified.",
        options: analyzedData.options || finalOptions,
        status: "resolved",
        createdAt: new Date().toLocaleDateString(),
        prosCons: analyzedData.prosCons,
        comparisonTable: analyzedData.comparisonTable,
        swot: analyzedData.swot,
        verdict: analyzedData.verdict
      };

      const updatedList = [newReport, ...decisions];
      saveToStorage(updatedList);
      setActiveDecision(newReport);
      setActiveTab("verdict");

      // Reset form fields
      setTitle("");
      setDescription("");
      setOptionsInput(["", ""]);
    } catch (err: any) {
      console.error(err);
      setAnalysisError(err?.message || "An unresolved network error occurred while submitting analysis request to the logic server.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Delete an existing case file
  const deleteCaseFile = (idToDelete: string, e: MouseEvent) => {
    e.stopPropagation();
    const updated = decisions.filter(d => d.id !== idToDelete);
    saveToStorage(updated);
    if (activeDecision?.id === idToDelete) {
      setActiveDecision(updated.length > 0 ? updated[0] : null);
    }
  };

  // Reset to showcase defaults if ledger empty
  const restorePresets = () => {
    saveToStorage(PRESETS);
    setActiveDecision(PRESETS[0]);
    setActiveTab("verdict");
  };

  return (
    <div className="min-h-screen bg-[#F5F2ED] text-[#1A1A1A] font-sans antialiased p-4 md:p-8 lg:p-12 selection:bg-[#1A1A1A] selection:text-[#F5F2ED]">
      {/* Decorative Top Boundary Line */}
      <div className="h-2 bg-[#1A1A1A] w-full mb-8" />

      {/* Main Header Container */}
      <header className="flex flex-col md:flex-row justify-between items-baseline border-b border-[#1A1A1A] pb-6 mb-10 gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#1A1A1A] text-[#F5F2ED] font-serif italic text-xl flex items-center justify-center font-bold">
              TB
            </div>
            <h1 className="text-4xl lg:text-5xl font-serif italic tracking-tight font-semibold selection:bg-[#E63946]">
              The Tie Breaker
            </h1>
          </div>
          <p className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#1A1A1A]/70">
            Automated Decision Synthesis Engine & Dilemma Resolution Matrix
          </p>
        </div>
        
        <div className="text-right md:text-right">
          <div className="inline-flex items-center gap-1.5 bg-[#1A1A1A] text-white px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-wider font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            AI GRADING SYSTEM ONLINE
          </div>
          {activeDecision && (
            <p className="text-xs uppercase font-mono tracking-widest text-[#1A1A1A]/60 mt-2 block">
              Active Focus: Case <span className="font-bold">#{activeDecision.id}</span>
            </p>
          )}
        </div>
      </header>

      {/* Main Interactive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Hand: Controller Panel (Ledger & Custom Formulation) */}
        <div className="lg:col-span-4 space-y-8 flex flex-col">
          
          {/* Section: Formulation Forge */}
          <div className="border bg-white border-[#1A1A1A] p-6 space-y-6">
            <div className="border-b border-[#1A1A1A] pb-3">
              <span className="font-mono text-[10px] tracking-widest uppercase font-bold text-[#E63946]">
                Forge Matrix
              </span>
              <h2 className="font-serif italic text-xl font-bold text-[#1A1A1A] mt-0.5">
                Submit New Case
              </h2>
            </div>

            <form onSubmit={runTieBreakerAnalysis} className="space-y-5">
              
              {/* Decision Title Input */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-mono uppercase font-bold tracking-widest block text-[#1A1A1A]">
                  Dilemma Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Relocate HQ or Stay Distributed"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-[#F5F2ED] border-2 border-[#1A1A1A] p-3 text-sm font-sans focus:outline-none focus:bg-white select-text h-11"
                />
              </div>

              {/* Context/Description text area */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-mono uppercase font-bold tracking-widest block text-[#1A1A1A]">
                  Dilemma Context (Highly Recommended)
                </label>
                <textarea
                  rows={3}
                  placeholder="Provide supporting trade-offs, financial figures, limits or background goals to sharpen the AI's deductions..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-[#F5F2ED] border-2 border-[#1A1A1A] p-3 text-sm font-sans focus:outline-none focus:bg-white select-text resize-y min-h-[80px]"
                />
              </div>

              {/* Candidate Options List */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-[11px] font-mono uppercase font-bold tracking-widest block text-[#1A1A1A]">
                    Target Options (Min 2)
                  </label>
                  {optionsInput.length < 5 && (
                    <button
                      type="button"
                      onClick={addOptionField}
                      className="font-mono text-[9px] uppercase tracking-wider font-extrabold text-indigo-700 bg-indigo-50 border border-indigo-200 px-2 py-0.5"
                    >
                      + Add Option
                    </button>
                  )}
                </div>

                <div className="space-y-2">
                  {optionsInput.map((opt, oIdx) => (
                    <div key={oIdx} className="flex gap-2 items-center">
                      <span className="font-mono text-xs font-bold text-[#1A1A1A]/60">
                        {oIdx + 1}.
                      </span>
                      <input
                        type="text"
                        placeholder={oIdx === 0 ? "Option Alpha" : oIdx === 1 ? "Option Beta" : `Option ${oIdx + 1}`}
                        value={opt}
                        onChange={(e) => handleOptionChange(e.target.value, oIdx)}
                        className="flex-grow bg-[#F5F2ED] border border-[#1A1A1A]/40 p-2 text-xs focus:outline-none focus:bg-white focus:border-[#1A1A1A] select-text h-9"
                      />
                      {optionsInput.length > 2 && (
                        <button
                          type="button"
                          onClick={() => removeOptionField(oIdx)}
                          className="text-[#E63946] hover:bg-rose-50 p-1 border border-transparent hover:border-rose-200 transition-colors shrink-0"
                          title="Remove option slot"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                <p className="text-[10px] text-slate-500 font-sans italic">
                  Note: If fields are empty, target options will be autoconstructed logically.
                </p>
              </div>

              {/* Validation message */}
              {analysisError && (
                <div className="bg-rose-50 border border-rose-300 p-3.5 space-y-2">
                  <div className="flex gap-1.5 items-center text-rose-700 font-mono text-[10px] uppercase font-bold tracking-wider">
                    <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0" />
                    Analysis Lockout
                  </div>
                  <p className="text-[12px] font-sans text-stone-800 leading-relaxed leading-normal">
                    {analysisError}
                  </p>
                </div>
              )}

              {/* Submit Trigger Action */}
              <button
                type="submit"
                disabled={isAnalyzing}
                className="w-full bg-[#1A1A1A] text-[#F5F2ED] hover:bg-stone-800 transition-all font-mono font-bold uppercase tracking-[0.25em] py-4 text-xs flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isAnalyzing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-[#E63946]" />
                    Analyzing Dilemma Core...
                  </>
                ) : (
                  <>
                    Commit Case Analysis
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

            </form>
          </div>

          {/* Ledger History: Case File Selector list */}
          <div className="border bg-white border-[#1A1A1A] p-6 space-y-4 flex-1">
            <div className="flex justify-between items-baseline border-b border-[#1A1A1A] pb-2">
              <span className="font-mono text-[10px] tracking-widest uppercase font-bold text-slate-500">
                Ledge Index
              </span>
              <h3 className="font-serif italic text-lg font-bold text-[#1A1A1A]">
                Case Files Archive
              </h3>
            </div>

            {decisions.length === 0 ? (
              <div className="text-center py-8 space-y-3">
                <p className="font-sans text-xs text-slate-400 italic">No case files registered.</p>
                <button
                  onClick={restorePresets}
                  className="font-mono text-[9px] uppercase tracking-wider text-[#1A1A1A] border border-[#1A1A1A] px-3 py-1 hover:bg-[#1A1A1A] hover:text-[#F5F2ED] transition-colors"
                >
                  Load Preset Scenarios
                </button>
              </div>
            ) : (
              <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
                {decisions.map((item) => {
                  const isActive = activeDecision?.id === item.id;
                  return (
                    <div
                      key={item.id}
                      onClick={() => {
                        setActiveDecision(item);
                        setActiveTab("verdict");
                      }}
                      className={`group border p-3 cursor-pointer transition-all flex justify-between items-start gap-3 ${
                        isActive
                          ? "bg-[#1A1A1A] text-[#F5F2ED] border-[#1A1A1A]"
                          : "bg-stone-50 text-[#1A1A1A] border-slate-200 hover:border-[#1A1A1A] hover:bg-white"
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 overflow-hidden">
                          <span className={`font-mono text-[9px] font-bold tracking-widest ${
                            isActive ? "text-[#E63946]" : "text-stone-500"
                          }`}>
                            #{item.id}
                          </span>
                          <span className="text-[10px] text-zinc-400 font-mono">• {item.createdAt}</span>
                        </div>
                        <h4 className="font-serif text-[13px] font-bold line-clamp-1">
                          {item.title}
                        </h4>
                      </div>

                      <button
                        onClick={(e) => deleteCaseFile(item.id, e)}
                        className={`p-1 hover:text-[#E63946] transition-colors ${
                          isActive ? "text-stone-400" : "text-slate-400"
                        }`}
                        title="Delete record"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Right Hand: Deep Analysis Perspectives Screen */}
        <div className="lg:col-span-8 flex flex-col space-y-6">
          <AnimatePresence mode="wait">
            {isAnalyzing ? (
              // Case analysis waiting screen - highly immersive
              <motion.div
                key="analyzing-screen"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="border-2 border-[#1A1A1A] bg-white p-12 flex flex-col items-center justify-center text-center space-y-8 flex-1 min-h-[500px]"
              >
                {/* Custom Elegant Dial Spinner */}
                <div className="relative w-24 h-24 border-4 border-stone-100 border-t-[#1A1A1A] rounded-full animate-spin flex items-center justify-center">
                  <Cpu className="w-8 h-8 text-[#E63946]" />
                </div>

                <div className="space-y-4 max-w-lg mx-auto">
                  <span className="bg-[#1A1A1A] text-white px-3 py-1 text-[10px] font-mono uppercase tracking-[0.2em] font-bold ring-2 ring-black">
                    PROCESSING ARGUMENTS // CORE BLOCK
                  </span>
                  <h3 className="font-serif italic text-3xl font-bold text-[#1A1A1A]">
                    Breaking The Tie...
                  </h3>
                  <p className="font-sans text-stone-600 text-[13.5px] leading-relaxed">
                    Connecting to server side GenAI interfaces, parsing criteria points, mapping risk-weights, generating the Strategic SWOT quadrant, and synthesizing the final resolution log.
                  </p>
                </div>

                {/* Simulated telemetry ticker - adds huge editorial value */}
                <div className="w-full max-w-md bg-[#F5F2ED] border border-[#1A1A1A]/30 p-3 flex justify-between items-center text-[10px] font-mono text-stone-500">
                  <span className="animate-pulse">● SECURING ENVELOPE</span>
                  <span>|</span>
                  <span>CALCULATING COEF: 1.8482</span>
                  <span>|</span>
                  <span>NODE: GENAI-FLASH</span>
                </div>
              </motion.div>
            ) : activeDecision ? (
              // Active Case Report Dashboard
              <motion.div
                key="case-report-dashboard"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6 flex-1 flex flex-col justify-between"
              >
                
                {/* Active Case Header Details */}
                <div className="border border-[#1A1A1A] bg-white p-6 md:p-8 space-y-4">
                  <div className="flex justify-between items-start gap-4 break-words">
                    <div className="space-y-2 flex-grow">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono text-[9px] uppercase tracking-[0.2em] bg-[#1A1A1A] text-[#F5F2ED] px-2 py-0.5">
                          CASE REPORT #{activeDecision.id}
                        </span>
                        <span className="font-mono text-[9px] text-[#1A1A1A]/60 font-bold">
                          DOCKET FILED: {activeDecision.createdAt}
                        </span>
                      </div>
                      <h2 className="font-serif text-3xl md:text-4xl font-black leading-tight text-[#1A1A1A]">
                        {activeDecision.title}
                      </h2>
                    </div>
                  </div>

                  {activeDecision.description && (
                    <p className="font-sans text-[14.5px] leading-relaxed text-[#1A1A1A] bg-[#F5F2ED]/40 border-l-4 border-[#1A1A1A] p-4 italic">
                      {activeDecision.description}
                    </p>
                  )}

                  <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-[#1A1A1A]/10 mt-4 text-xs font-mono">
                    <span className="font-bold uppercase tracking-wide text-stone-500">
                      Options Evaluated:
                    </span>
                    {activeDecision.options.map((opt, idx) => (
                      <span
                        key={idx}
                        className="bg-stone-100 border border-slate-300 text-stone-800 px-2.5 py-0.5"
                      >
                        {opt}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Analytical Navigation Tabs */}
                <div className="grid grid-cols-2 sm:grid-cols-4 border-2 border-[#1A1A1A] bg-[#F5F2ED] overflow-hidden shrink-0">
                  <button
                    onClick={() => setActiveTab('verdict')}
                    className={`font-mono text-[10px] sm:text-xs font-bold uppercase py-3.5 tracking-wider border-b sm:border-b-0 sm:border-r border-[#1A1A1A] transition-all flex items-center justify-center gap-2 ${
                      activeTab === 'verdict'
                        ? "bg-[#1A1A1A] text-[#F5F2ED]"
                        : "bg-white text-[#1A1A1A] hover:bg-[#F5F2ED]"
                    }`}
                  >
                    <BookOpen className="w-4 h-4" />
                    Verdict
                  </button>

                  <button
                    onClick={() => setActiveTab('proscons')}
                    className={`font-mono text-[10px] sm:text-xs font-bold uppercase py-3.5 tracking-wider border-b sm:border-b-0 sm:border-r border-[#1A1A1A] transition-all flex items-center justify-center gap-2 ${
                      activeTab === 'proscons'
                        ? "bg-[#1A1A1A] text-[#F5F2ED]"
                        : "bg-white text-[#1A1A1A] hover:bg-[#F5F2ED]"
                    }`}
                  >
                    <Scale className="w-4 h-4" />
                    Pros & Cons
                  </button>

                  <button
                    onClick={() => setActiveTab('comparison')}
                    className={`font-mono text-[10px] sm:text-xs font-bold uppercase py-3.5 tracking-wider border-r border-[#1A1A1A] transition-all flex items-center justify-center gap-2 ${
                      activeTab === 'comparison'
                        ? "bg-[#1A1A1A] text-[#F5F2ED]"
                        : "bg-white text-[#1A1A1A] hover:bg-[#F5F2ED]"
                    }`}
                  >
                    <Layers className="w-4 h-4" />
                    Grid Matrix
                  </button>

                  <button
                    onClick={() => setActiveTab('swot')}
                    className={`font-mono text-[10px] sm:text-xs font-bold uppercase py-3.5 tracking-wider transition-all flex items-center justify-center gap-2 ${
                      activeTab === 'swot'
                        ? "bg-[#1A1A1A] text-[#F5F2ED]"
                        : "bg-white text-[#1A1A1A] hover:bg-[#F5F2ED]"
                    }`}
                  >
                    <Briefcase className="w-4 h-4" />
                    SWOT Analysis
                  </button>
                </div>

                {/* Selected Tab Frame Content Panel */}
                <div className="mt-2 flex-1">
                  <AnimatePresence mode="wait">
                    {activeTab === 'verdict' && (
                      <motion.div
                        key="verdict-perspective"
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                      >
                        <VerdictView
                          verdict={activeDecision.verdict || "No definitive resolution verdict filed."}
                          winner={activeDecision.comparisonTable?.winner}
                          id={activeDecision.id}
                        />
                      </motion.div>
                    )}

                    {activeTab === 'proscons' && (
                      <motion.div
                        key="proscons-perspective"
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="border border-[#1A1A1A] bg-white p-6 md:p-8"
                      >
                        <ProsConsView prosCons={activeDecision.prosCons} />
                      </motion.div>
                    )}

                    {activeTab === 'comparison' && (
                      <motion.div
                        key="comparison-perspective"
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="border border-[#1A1A1A] bg-white p-6 md:p-8"
                      >
                        <ComparisonTableView comparisonTable={activeDecision.comparisonTable} />
                      </motion.div>
                    )}

                    {activeTab === 'swot' && (
                      <motion.div
                        key="swot-perspective"
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="border border-[#1A1A1A] bg-white p-6 md:p-8"
                      >
                        <SwotView swot={activeDecision.swot} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ) : (
              // Empty selection fallback screen
              <motion.div
                key="empty-dashboard"
                className="border-2 border-[#1A1A1A] bg-white p-12 text-center flex flex-col justify-center items-center space-y-4 flex-1 min-h-[500px]"
              >
                <FolderOpen className="w-12 h-12 text-gray-300" />
                <h3 className="font-serif italic text-2xl font-bold">No Active Case Selected</h3>
                <p className="font-sans text-sm text-stone-500 max-w-sm leading-relaxed">
                  Please load case files from the Ledger Index archives, submit a fresh custom formulation form, or reload sample scenarios.
                </p>
                <button
                  onClick={restorePresets}
                  className="font-mono text-[10px] uppercase tracking-widest text-indigo-700 bg-indigo-50 border border-indigo-200 px-4 py-2 hover:bg-indigo-600 hover:text-white hover:border-[#1A1A1A] transition-all cursor-pointer"
                >
                  Reload Preset Scenarios
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>

      {/* Decorative Bottom Credits Footer */}
      <footer className="mt-16 flex flex-col sm:flex-row justify-between items-center text-[10.5px] font-mono border-t border-[#1A1A1A]/30 pt-6 opacity-60">
        <div className="uppercase tracking-widest">
          DESIGNED BY TIE BREAKER INTELLIGENCE UNIT // DECISION CYBERNETICS
        </div>
        <div className="uppercase tracking-widest mt-2 sm:mt-0">
          © 2026 / ALL STRATEGIC LOGIC RESERVED
        </div>
      </footer>
    </div>
  );
}
