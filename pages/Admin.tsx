
import React, { useState } from "react";
import { uploadImage } from "../services/cloudinary";
import { createProduct } from "../services/firebase";
import { generateProductPhilosophy } from "../services/gemini";
import Reveal from "../components/Reveal";
import { Sparkles, Upload, Key, Database, ChevronRight, Activity } from "lucide-react";

export default function Admin() {
  const [auth, setAuth] = useState(localStorage.getItem("admin_auth") === "true");
  const [pass, setPass] = useState("");
  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [data, setData] = useState({ 
    name: "", 
    price: "", 
    description: "", 
    imageIds: [] as string[] 
  });

  if (!auth) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-raw-900 p-6">
        <Reveal className="w-full max-w-sm">
          <div className="bg-white p-12 flex flex-col gap-10 shadow-2xl border-t-8 border-accent-clay">
            <div className="flex flex-col gap-3">
              <Key className="w-10 h-10 text-accent-clay" />
              <h2 className="text-2xl font-bold uppercase tracking-widest text-raw-900">Core Access</h2>
              <p className="text-[10px] text-raw-400 font-mono tracking-widest">VERIFY_TERMINAL_IDENTITY_092</p>
            </div>
            
            <input 
              type="password" 
              placeholder="System Credentials"
              className="w-full bg-raw-50 border-b border-raw-200 p-5 focus:outline-none focus:border-accent-clay font-mono text-sm transition-all"
              onChange={e => setPass(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && (pass === 'rawline' && (localStorage.setItem("admin_auth", "true"), setAuth(true)))}
            />
            
            <button 
              className="w-full bg-raw-900 text-white py-5 hover:bg-accent-clay transition-all uppercase tracking-[0.4em] text-xs font-bold shadow-lg"
              onClick={() => {
                if (pass === "rawline") {
                  localStorage.setItem("admin_auth", "true");
                  setAuth(true);
                } else {
                  alert("Credential mismatch. System locked.");
                }
              }}
            >
              Initialize Session
            </button>
          </div>
        </Reveal>
      </main>
    );
  }

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      setLoading(true);
      try {
        const id = await uploadImage(e.target.files[0]);
        setData(prev => ({ ...prev, imageIds: [...prev.imageIds, id] }));
      } catch (err) {
        alert("System fault: Image uplink failed.");
      } finally {
        setLoading(false);
      }
    }
  }

  async function handleAiDescribe() {
    if (!data.name) return alert("Designation required for synthesis.");
    setAiLoading(true);
    try {
      const philosophy = await generateProductPhilosophy(data.name);
      setData(prev => ({ ...prev, description: philosophy }));
    } finally {
      setAiLoading(false);
    }
  }

  async function handleSave() {
    if (!data.name || !data.price || data.imageIds.length === 0) {
      return alert("Validation error: Incomplete artifact record.");
    }
    setLoading(true);
    try {
      await createProduct(data);
      setData({ name: "", price: "", description: "", imageIds: [] });
      alert("Record successfully committed to ledger.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen pt-40 pb-20 px-6 md:px-12 bg-raw-50 font-sans">
      <Reveal className="max-w-5xl mx-auto">
        <div className="flex justify-between items-end mb-20 border-b border-raw-200 pb-10">
          <div>
            <span className="text-[10px] font-mono tracking-[0.4em] text-accent-clay uppercase mb-3 block flex items-center gap-2 font-bold">
              <Database className="w-3 h-3" /> [ ASSET_MANAGEMENT_TERMINAL ]
            </span>
            <h1 className="text-5xl font-bold uppercase tracking-tighter text-raw-900">Asset Ingestion.</h1>
          </div>
          <div className="flex flex-col items-end gap-2">
            <span className="text-[10px] font-mono text-moss uppercase flex items-center gap-2">
              <Activity className="w-3 h-3 animate-pulse" /> System Online
            </span>
            <button 
              onClick={() => { localStorage.removeItem("admin_auth"); setAuth(false); }}
              className="text-[10px] uppercase tracking-widest text-raw-400 hover:text-accent-clay transition-all"
            >
              [ Terminate_Session ]
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          <div className="lg:col-span-7 flex flex-col gap-12">
            <div className="flex flex-col gap-4">
              <label className="text-[10px] uppercase font-bold tracking-[0.4em] text-raw-400">Designation Identifier</label>
              <input 
                placeholder="Unique Name"
                className="bg-white border border-raw-100 p-6 text-2xl focus:outline-none focus:border-accent-clay font-light shadow-sm transition-all"
                value={data.name}
                onChange={e => setData({ ...data, name: e.target.value })}
              />
            </div>

            <div className="flex flex-col gap-4">
              <label className="text-[10px] uppercase font-bold tracking-[0.4em] text-raw-400">Value Commitment (USD)</label>
              <input 
                placeholder="000.00"
                className="bg-white border border-raw-100 p-6 text-2xl focus:outline-none focus:border-accent-clay font-mono shadow-sm transition-all"
                value={data.price}
                onChange={e => setData({ ...data, price: e.target.value })}
              />
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center mb-2">
                <label className="text-[10px] uppercase font-bold tracking-[0.4em] text-raw-400">Narrative Manifesto</label>
                <button 
                  onClick={handleAiDescribe}
                  disabled={aiLoading}
                  className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-accent-clay hover:text-raw-900 disabled:opacity-30 transition-all bg-white px-4 py-2 border border-raw-100 shadow-sm"
                >
                  <Sparkles className={`w-3 h-3 ${aiLoading ? 'animate-pulse' : ''}`} />
                  {aiLoading ? 'Synthesizing...' : 'AI Manifest'}
                </button>
              </div>
              <textarea 
                placeholder="Describe the structural intent of the artifact..."
                rows={8}
                className="bg-white border border-raw-100 p-8 focus:outline-none focus:border-accent-clay text-lg font-light leading-relaxed resize-none shadow-sm transition-all font-serif italic"
                value={data.description}
                onChange={e => setData({ ...data, description: e.target.value })}
              />
            </div>

            <button 
              onClick={handleSave}
              disabled={loading}
              className="bg-raw-900 text-white py-8 flex items-center justify-center gap-4 text-xs uppercase tracking-[0.6em] font-bold hover:bg-accent-clay transition-all disabled:opacity-50 shadow-2xl mt-8"
            >
              Commit Record To Index <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="lg:col-span-5 flex flex-col gap-12">
            <div className="flex flex-col gap-6">
              <label className="text-[10px] uppercase font-bold tracking-[0.4em] text-raw-400">Visual Documentation</label>
              <div className="grid grid-cols-2 gap-4">
                {data.imageIds.map((id, idx) => (
                  <div key={id} className="aspect-[3/4] bg-raw-100 relative group overflow-hidden shadow-sm">
                    <img src={`https://res.cloudinary.com/ds2mbrzcn/image/upload/w_600/${id}.jpg`} className="w-full h-full object-cover" />
                    <button 
                      onClick={() => setData(prev => ({ ...prev, imageIds: prev.imageIds.filter((_, i) => i !== idx) }))}
                      className="absolute inset-0 bg-accent-clay/90 text-white opacity-0 group-hover:opacity-100 flex items-center justify-center text-[10px] uppercase tracking-widest transition-all font-bold"
                    >
                      Purge
                    </button>
                  </div>
                ))}
                
                <label className="aspect-[3/4] border-4 border-dashed border-raw-200 flex flex-col items-center justify-center gap-6 hover:border-accent-clay hover:bg-white cursor-pointer transition-all shadow-inner group">
                  <input type="file" className="hidden" onChange={handleFileUpload} disabled={loading} />
                  <Upload className={`w-10 h-10 text-raw-200 group-hover:text-accent-clay transition-colors ${loading ? 'animate-bounce' : ''}`} />
                  <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-raw-300 group-hover:text-accent-clay transition-colors">{loading ? 'Transmitting...' : 'Upload Asset'}</span>
                </label>
              </div>
            </div>

            <div className="p-10 bg-raw-900 text-raw-400 font-mono text-[10px] leading-relaxed uppercase tracking-[0.3em] border-l-8 border-accent-clay shadow-xl">
              <div className="space-y-4">
                <p className="text-accent-clay font-bold">// SYSTEM_SNAPSHOT</p>
                <div className="space-y-1 opacity-60">
                  <p>DB_TARGET: CLOUD_FIRESTORE_LEDGER</p>
                  <p>AI_MODEL: GEMINI_2.5_FLASH_OPT</p>
                  <p>STORAGE_V: CLOUDINARY_MEDIA_H</p>
                  <p>STATUS: {loading ? 'PROCESSING_UPLINK' : 'AWAITING_INPUT'}</p>
                </div>
                <p className="mt-8 text-white animate-pulse font-bold">>> READY_FOR_COMMIT_STREAM</p>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </main>
  );
}
