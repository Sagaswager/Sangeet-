import React, { useState, useEffect } from "react";
import { DemoBooking, ConsultationRequest } from "../types";
import { Users, Mail, Building2, Phone, Calendar, ClipboardList, Database, Sparkles, RefreshCw, Terminal } from "lucide-react";
import { motion } from "motion/react";

interface AdminPanelProps {
  onBookingUpdateTrigger: number; // Increment to trigger refresh
}

export default function AdminPanel({ onBookingUpdateTrigger }: AdminPanelProps) {
  const [bookings, setBookings] = useState<DemoBooking[]>([]);
  const [consultations, setConsultations] = useState<ConsultationRequest[]>([]);
  const [activeTab, setActiveTab] = useState<"demos" | "consultations">("demos");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const fetchLeads = async () => {
    setIsLoading(true);
    setErrorMsg(null);
    try {
      const [bookingsRes, consultationsRes] = await Promise.all([
        fetch("/api/demo/list"),
        fetch("/api/consultation/list"),
      ]);

      if (!bookingsRes.ok || !consultationsRes.ok) {
        throw new Error("Failed to load leads from system database.");
      }

      const bookingsData = await bookingsRes.json();
      const consultationsData = await consultationsRes.json();

      setBookings(bookingsData);
      setConsultations(consultationsData);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || "An error occurred fetching telemetry records.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, [onBookingUpdateTrigger]);

  return (
    <div className="bg-[#15171c] text-white rounded-3xl p-8 border border-zinc-800 shadow-2xl relative overflow-hidden">
      {/* Background radial accent */}
      <div className="absolute top-0 right-0 h-40 w-40 bg-periwinkle-wash/10 rounded-full blur-2xl"></div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 border-b border-paper-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1 bg-chartreuse-pop rounded text-bark inline-flex">
              <Database className="h-4 w-4" />
            </span>
            <span className="text-[11px] font-mono tracking-widest uppercase text-chartreuse-pop font-semibold">
              LIVE TELEMETRY LAB CONSOLE
            </span>
          </div>
          <h2 className="text-2xl font-classic font-semibold text-paper-white mt-1.5">
            Intellitech CRM Database
          </h2>
          <p className="text-xs text-ash/70 mt-1">
            Ayush Malhotra's administrative lead log sandbox. Active connection via full-stack Express pipeline.
          </p>
        </div>

        <button
          onClick={fetchLeads}
          disabled={isLoading}
          className="flex items-center gap-2 text-xs font-mono bg-paper-white/10 hover:bg-paper-white/20 px-4 py-2 rounded-xl transition cursor-pointer"
        >
          <RefreshCw className={`h-3 w-3 ${isLoading ? "animate-spin" : ""}`} />
          <span>Refresh Leads</span>
        </button>
      </div>

      {/* Analytics Bento Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-paper-white/5 border border-paper-white/10 p-5 rounded-2xl">
          <span className="text-[10px] font-mono text-ash/60 block mb-1">TOTAL DEMO BOOKINGS</span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold font-mono text-paper-white">{bookings.length}</span>
            <span className="text-xs text-emerald-400">● LIVE</span>
          </div>
          <p className="text-[11px] text-ash/50 mt-1 truncate">Queue: B2B specialized pipelines</p>
        </div>

        <div className="bg-paper-white/5 border border-paper-white/10 p-5 rounded-2xl">
          <span className="text-[10px] font-mono text-ash/60 block mb-1">BESPOKE CONSULTATIONS</span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold font-mono text-paper-white">{consultations.length}</span>
            <span className="text-xs text-emerald-400">● QUEUED</span>
          </div>
          <p className="text-[11px] text-ash/50 mt-1 truncate">Custom engineered blueprints</p>
        </div>

        <div className="bg-paper-white/5 border border-paper-white/10 p-5 rounded-2xl">
          <span className="text-[10px] font-mono text-ash/60 block mb-1">SYSTEM INTEGRATION HEALTH</span>
          <div className="flex items-center gap-2 mt-1">
            <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
            <span className="text-sm font-semibold font-mono text-emerald-400">100% ONLINE</span>
          </div>
          <p className="text-[11px] text-ash/50 mt-1 truncate">Model: Gemini-3.5-flash & tsx runtime</p>
        </div>
      </div>

      {/* Telemetry Tabs */}
      <div className="flex border-b border-paper-white/10 mb-6">
        <button
          onClick={() => setActiveTab("demos")}
          className={`flex items-center gap-2 pb-3 text-sm font-medium border-b-2 transition duration-200 px-1 cursor-pointer ${
            activeTab === "demos"
              ? "border-chartreuse-pop text-chartreuse-pop"
              : "border-transparent text-ash/60 hover:text-paper-white"
          }`}
        >
          <Calendar className="h-4 w-4" />
          <span>Demo Bookings ({bookings.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("consultations")}
          className={`flex items-center gap-2 pb-3 text-sm font-medium border-b-2 transition duration-200 ml-6 px-1 cursor-pointer ${
            activeTab === "consultations"
              ? "border-chartreuse-pop text-chartreuse-pop"
              : "border-transparent text-ash/60 hover:text-paper-white"
          }`}
        >
          <ClipboardList className="h-4 w-4" />
          <span>Bespoke Consultations ({consultations.length})</span>
        </button>
      </div>

      {errorMsg && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-300 text-sm p-4 rounded-xl mb-6">
          {errorMsg}
        </div>
      )}

      {/* Live Data Grid */}
      <div className="overflow-x-auto">
        {isLoading ? (
          <div className="text-center py-12">
            <RefreshCw className="h-8 w-8 animate-spin text-chartreuse-pop mx-auto mb-2" />
            <p className="text-xs font-mono text-ash/60">Fetching lead logs...</p>
          </div>
        ) : activeTab === "demos" ? (
          bookings.length === 0 ? (
            <div className="text-center py-12 bg-paper-white/5 rounded-2xl border border-dashed border-paper-white/10">
              <Calendar className="h-8 w-8 text-ash/30 mx-auto mb-2" />
              <p className="text-sm text-ash/60 font-semibold">No demo bookings found</p>
              <p className="text-xs text-ash/40 mt-1">Submit a schedule request from the hero header CTA.</p>
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-paper-white/10 text-[10px] font-mono tracking-wider text-ash/50">
                  <th className="py-3 px-4">LEAD INFO</th>
                  <th className="py-3 px-4">COMPANY / SPEC</th>
                  <th className="py-3 px-4">TARGET AGENT</th>
                  <th className="py-3 px-4">TIMESTAMP</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-paper-white/5 text-sm">
                {bookings.map((b) => (
                  <tr key={b.id} className="hover:bg-paper-white/5 transition">
                    <td className="py-4 px-4">
                      <div className="font-semibold text-paper-white">{b.name}</div>
                      <div className="text-xs text-ash/60 flex flex-col gap-1 mt-0.5">
                        <div className="flex items-center gap-1.5">
                          <Mail className="h-3 w-3" />
                          <span>{b.email}</span>
                        </div>
                        {b.phone && (
                          <div className="flex items-center gap-1.5">
                            <Phone className="h-3 w-3" />
                            <span>{b.phone}</span>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="text-paper-white flex items-center gap-1.5">
                        <Building2 className="h-3.5 w-3.5 text-ash/60" />
                        <span>{b.company}</span>
                      </div>
                      {b.notes && (
                        <div className="text-xs text-ash/50 mt-1 italic max-w-xs truncate" title={b.notes}>
                          "{b.notes}"
                        </div>
                      )}
                    </td>
                    <td className="py-4 px-4">
                      <span className="inline-flex items-center rounded-full bg-periwinkle-wash/10 px-2.5 py-0.5 text-xs font-medium text-periwinkle-wash border border-periwinkle-wash/20">
                        {b.agentInterest}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-xs font-mono text-ash/60">
                      {new Date(b.createdAt).toLocaleDateString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )
        ) : consultations.length === 0 ? (
          <div className="text-center py-12 bg-paper-white/5 rounded-2xl border border-dashed border-paper-white/10">
            <ClipboardList className="h-8 w-8 text-ash/30 mx-auto mb-2" />
            <p className="text-sm text-ash/60 font-semibold">No custom consultations recorded</p>
            <p className="text-xs text-ash/40 mt-1">Submit custom agent campaign requests from the bottom form.</p>
          </div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-paper-white/10 text-[10px] font-mono tracking-wider text-ash/50">
                <th className="py-3 px-4">LEAD INFO</th>
                <th className="py-3 px-4">CAMPAIGN SPEC DETAILS</th>
                <th className="py-3 px-4">TIMESTAMP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-paper-white/5 text-sm">
              {consultations.map((c) => (
                <tr key={c.id} className="hover:bg-paper-white/5 transition">
                  <td className="py-4 px-4">
                    <div className="font-semibold text-paper-white">{c.name}</div>
                    <div className="text-xs text-ash/60 flex flex-col gap-1 mt-1">
                      <div className="flex items-center gap-1.5">
                        <Mail className="h-3 w-3" />
                        <span>{c.email}</span>
                      </div>
                      {c.phone && (
                        <div className="flex items-center gap-1.5">
                          <Phone className="h-3 w-3" />
                          <span>{c.phone}</span>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <p className="text-xs text-ash/90 leading-relaxed whitespace-pre-wrap max-w-md bg-paper-white/5 p-3 rounded-xl border border-paper-white/10 font-mono">
                      {c.details}
                    </p>
                  </td>
                  <td className="py-4 px-4 text-xs font-mono text-ash/60">
                    {new Date(c.createdAt).toLocaleDateString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="mt-8 bg-paper-white/5 border border-paper-white/10 p-4 rounded-2xl flex items-center gap-2">
        <Terminal className="h-4 w-4 text-chartreuse-pop shrink-0" />
        <span className="text-xs font-mono text-ash/70">
          Database synchronization logs: Socket connection healthy on host <code className="text-chartreuse-pop">0.0.0.0:3000</code>.
        </span>
      </div>
    </div>
  );
}
