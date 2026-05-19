"use client";

import { useState } from "react";
import { createSchedule } from "../../../lib/api";

export default function Schedule() {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]); // Default today
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("18:00");
  
  const [generatedSlots, setGeneratedSlots] = useState<{startTime: string, endTime: string}[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  // Time Math: Chops a shift into 1-hour blocks
  const handleGeneratePreview = () => {
    const slots = [];
    let current = new Date(`2000-01-01T${startTime}:00`);
    const end = new Date(`2000-01-01T${endTime}:00`);

    while (current < end) {
      const slotStart = current.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' });
      
      // Add 60 minutes for slot duration (You can make this a state variable later if you want 30min slots)
      current.setMinutes(current.getMinutes() + 60); 
      
      const slotEnd = current.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' });
      
      // Stop if the next slot goes past the end of the shift
      if (current <= end) {
        slots.push({ startTime: slotStart, endTime: slotEnd });
      }
    }
    setGeneratedSlots(slots);
  };

  const handleSaveToDatabase = async () => {
    if (generatedSlots.length === 0) return;
    setIsSaving(true);

    try {
      // Loop through the preview slots and push them to NestJS
      // (If you eventually implement the Bulk endpoint, you can send them all at once!)
      for (const slot of generatedSlots) {
        await createSchedule({
          date: date, // "YYYY-MM-DD" expected by your DTO
          startTime: slot.startTime,
          endTime: slot.endTime
        });
      }
      alert("Schedule successfully published!");
      setGeneratedSlots([]); // Clear preview
    } catch (error: any) {
      alert(error.message || "Failed to save schedule.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="p-10 min-h-screen">
      <div className="max-w-6xl mx-auto pb-32">
        <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="text-tertiary font-label uppercase tracking-[0.2em] text-[10px] font-bold block mb-2">Operations</span>
            <h2 className="text-5xl md:text-7xl font-headline font-extrabold tracking-tighter text-on-surface">Availability.</h2>
          </div>
        </header>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
          <div className="xl:col-span-4 flex flex-col gap-6">
            <section className="bg-surface-container-low p-8 rounded-xl shadow-2xl relative overflow-hidden">
              <h3 className="text-xl font-headline font-bold mb-8 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">pending_actions</span>
                Time Frame
              </h3>
              
              <div className="space-y-6 relative z-10">
                <div className="group">
                  <label className="block text-[10px] font-black uppercase tracking-widest text-on-surface-variant mb-2 font-label">Select Date</label>
                  <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full bg-surface-container-lowest border border-outline-variant/15 text-on-surface px-4 py-3 rounded-md focus:border-primary/50 focus:ring-0 transition-all font-body" />
                </div>
                <div className="group">
                  <label className="block text-[10px] font-black uppercase tracking-widest text-on-surface-variant mb-2 font-label">Start Shift</label>
                  <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} className="w-full bg-surface-container-lowest border border-outline-variant/15 text-on-surface px-4 py-3 rounded-md focus:border-primary/50 focus:ring-0 transition-all font-body text-lg" />
                </div>
                <div className="group">
                  <label className="block text-[10px] font-black uppercase tracking-widest text-on-surface-variant mb-2 font-label">End Shift</label>
                  <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} className="w-full bg-surface-container-lowest border border-outline-variant/15 text-on-surface px-4 py-3 rounded-md focus:border-primary/50 focus:ring-0 transition-all font-body text-lg" />
                </div>

                <button onClick={handleGeneratePreview} className="w-full mt-4 bg-surface-container-highest text-on-surface px-4 py-4 rounded-md font-bold tracking-tight hover:bg-surface-container-highest/80 transition-all">
                  Generate Preview
                </button>
              </div>
            </section>
          </div>

          <div className="xl:col-span-8">
            <section className="bg-surface-container-low p-8 rounded-xl min-h-[500px]">
              <div className="flex items-center justify-between mb-10">
                <div>
                  <h3 className="text-xl font-headline font-bold mb-1">Generated Matrix</h3>
                  <p className="text-sm text-on-surface-variant font-body">Review the slots before publishing them to the database.</p>
                </div>
                
                {generatedSlots.length > 0 && (
                  <button onClick={handleSaveToDatabase} disabled={isSaving} className="bg-primary text-on-primary px-6 py-2 rounded-lg font-bold text-sm tracking-widest uppercase disabled:opacity-50">
                    {isSaving ? "Publishing..." : "Publish to Live"}
                  </button>
                )}
              </div>

              {generatedSlots.length === 0 ? (
                <div className="text-center py-20 text-on-surface-variant/50 border-2 border-dashed border-outline-variant/10 rounded-xl">
                  Set your time frame and click "Generate Preview"
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                  {generatedSlots.map((slot, index) => (
                    <div key={index} className="group flex flex-col items-center justify-center p-6 rounded-lg bg-surface-container-high text-on-surface transition-all hover:bg-surface-container-highest border border-outline-variant/10">
                      <span className="text-[10px] font-black tracking-widest text-on-surface-variant mb-1 font-label">
                        {slot.startTime < "12:00" ? "MORNING" : slot.startTime < "17:00" ? "AFTERNOON" : "EVENING"}
                      </span>
                      <span className="text-lg font-bold font-headline">{slot.startTime}</span>
                      <span className="text-xs text-on-surface-variant/50 mt-1">to {slot.endTime}</span>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}