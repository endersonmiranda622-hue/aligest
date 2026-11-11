import React, { useState } from 'react';
import { Camera, CheckCircle2, AlertTriangle, Building2, ShieldCheck, FileText, PackageCheck } from 'lucide-react';

export default function App() {
  const [etapa, setEtapa] = useState(1);
  const [fotoNota, setFotoNota] = useState(null);
  const [fotoAlimento, setFotoAlimento] = useState(null);
  const [divergencia, setDivergencia] = useState(false);
  const [motivo, setMotivo] = useState('');
  const [sucesso, setSucesso] = useState(false);

  const handleSimularFoto1 = () => {
    setFotoNota('https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=400');
    setEtapa(2);
  };

  const handleSimularFoto2 = () => {
    setFotoAlimento('https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&q=80&w=400');
  };

  const handleFinalizar = (e) => {
    e.preventDefault();
    setSucesso(true);
  };

  return (
    <div className="min-h-screen bg-[#F3F6FA] text-slate-800 font-sans">
      {/* Header AlimGest */}
      <header className="bg-[#123B65] text-white p-4 shadow-md">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-8 h-8 text-[#20A477]" />
            <div>
              <h1 className="text-xl font-bold tracking-wide">AlimGest</h1>
              <p className="text-xs text-slate-300">Gestão da Alimentação Escolar</p>
            </div>
          </div>
          <span className="bg-[#20A477] text-xs font-semibold px-3 py-1 rounded-full">
            Escola Ativa: EMEF Central
          </span>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto p-4 md:p-6">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
          <div className="flex items-center gap-3 border-b pb-4 mb-6">
            <Camera className="w-6 h-6 text-[#123B65]" />
            <div>
              <h2 className="text-lg font-bold text-[#123B65]">Módulo de Dupla Comprovação Fotográfica</h2>
              <p className="text-sm text-slate-500">Registo obrigatório de receção de alimentos</p>
            </div>
          </div>

          {sucesso ? (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-6 rounded-lg text-center">
              <CheckCircle2 className="w-12 h-12 text-[#20A477] mx-auto mb-2" />
              <h3 className="text-xl font-bold text-[#20A477]">Comprovação Registada com Sucesso!</h3>
              <p className="text-sm text-slate-600 mt-1">Os dados e registos fotográficos foram salvos na base de dados (Neon DB).</p>
              <button 
                onClick={() => { setSucesso(false); setFotoNota(null); setFotoAlimento(null); setEtapa(1); setDivergencia(false); }}
                className="mt-4 bg-[#123B65] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-slate-800 transition"
              >
                Novo Registo
              </button>
            </div>
          ) : (
            <form onSubmit={handleFinalizar} className="space-y-6">
              {/* Dual Photo Upload Grid */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* ETAPA 1: Nota Fiscal */}
                <div className={`p-4 rounded-xl border-2 ${fotoNota ? 'border-[#20A477] bg-emerald-50/30' : 'border-dashed border-slate-300'}`}>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-bold text-sm text-[#123B65] flex items-center gap-2">
                      <FileText className="w-4 h-4" /> 1. Foto da Nota Fiscal
                    </span>
                    {fotoNota && <CheckCircle2 className="w-5 h-5 text-[#20A477]" />}
                  </div>

                  {fotoNota ? (
                    <img src={fotoNota} alt="Nota Fiscal" className="w-full h-48 object-cover rounded-lg mb-2" />
                  ) : (
                    <div className="h-48 flex flex-col items-center justify-center text-slate-400 bg-slate-50 rounded-lg">
                      <Camera className="w-10 h-10 mb-2" />
                      <button 
                        type="button"
                        onClick={handleSimularFoto1}
                        className="bg-[#123B65] text-white px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-slate-800 transition"
                      >
                        Simular Captura (Nota)
                      </button>
                    </div>
                  )}
                </div>

                {/* ETAPA 2: Alimento Recebido */}
                <div className={`p-4 rounded-xl border-2 ${fotoAlimento ? 'border-[#20A477] bg-emerald-50/30' : 'border-dashed border-slate-300'}`}>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-bold text-sm text-[#123B65] flex items-center gap-2">
                      <PackageCheck className="w-4 h-4" /> 2. Foto do Alimento
                    </span>
                    {fotoAlimento && <CheckCircle2 className="w-5 h-5 text-[#20A477]" />}
                  </div>

                  {fotoAlimento ? (
                    <img src={fotoAlimento} alt="Alimento" className="w-full h-48 object-cover rounded-lg mb-2" />
                  ) : (
                    <div className="h-48 flex flex-col items-center justify-center text-slate-400 bg-slate-50 rounded-lg">
                      <Camera className="w-10 h-10 mb-2" />
                      <button 
                        type="button"
                        onClick={handleSimularFoto2}
                        disabled={!fotoNota}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                          fotoNota ? 'bg-[#123B65] text-white hover:bg-slate-800' : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                        }`}
                      >
                        Simular Captura (Alimento)
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Divergence Checkbox */}
              <div className="bg-[#F3F6FA] p-4 rounded-lg border border-slate-200">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={divergencia}
                    onChange={(e) => setDivergencia(e.target.checked)}
                    className="w-4 h-4 text-[#F2A640] rounded border-slate-300 focus:ring-[#F2A640]"
                  />
                  <span className="text-sm font-semibold text-slate-700 flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-[#F2A640]" /> Existe alguma divergência na entrega?
                  </span>
                </label>

                {divergencia && (
                  <div className="mt-3">
                    <textarea 
                      placeholder="Descreva a divergência (ex: quantidade menor, embalagem danificada...)"
                      value={motivo}
                      onChange={(e) => setMotivo(e.target.value)}
                      required
                      className="w-full p-2.5 text-sm border rounded-lg focus:outline-none focus:border-[#F2A640]"
                      rows={2}
                    />
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={!fotoNota || !fotoAlimento}
                className={`w-full py-3 rounded-lg font-bold text-white transition shadow-md ${
                  fotoNota && fotoAlimento 
                    ? 'bg-[#20A477] hover:bg-emerald-600 cursor-pointer' 
                    : 'bg-slate-300 cursor-not-allowed'
                }`}
              >
                Registar Dupla Comprovação
              </button>
            </form>
          )}
        </div>
      </main>
    </div>
  );
}
