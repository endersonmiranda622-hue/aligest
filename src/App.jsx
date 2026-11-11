import React, { useState } from 'react';
import { Camera, CheckCircle2, AlertTriangle, Building2, ShieldCheck, FileText, PackageCheck, LayoutDashboard, History, School, ArrowRight } from 'lucide-react';

export default function App() {
  const [abaAtiva, setAbaAtiva] = useState('comprovacao');
  const [etapa, setEtapa] = useState(1);
  const [fotoNota, setFotoNota] = useState(null);
  const [fotoAlimento, setFotoAlimento] = useState(null);
  const [divergencia, setDivergencia] = useState(false);
  const [motivo, setMotivo] = useState('');
  const [sucesso, setSucesso] = useState(false);

  // Histórico simulado de entregas
  const [historico, setHistorico] = useState([
    { id: 1, escola: 'EMEF Central', data: '10/11/2026 08:30', status: 'Aprovado', divergencia: 'Nenhuma' },
    { id: 2, escola: 'Escola Municipal Tiradentes', data: '09/11/2026 10:15', status: 'Com Divergência', divergencia: 'Falta de 2 caixas de leite' },
  ]);

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
    setHistorico([
      { 
        id: Date.now(), 
        escola: 'EMEF Central', 
        data: new Date().toLocaleString(), 
        status: divergencia ? 'Com Divergência' : 'Aprovado', 
        divergencia: divergencia ? motivo : 'Nenhuma' 
      },
      ...historico
    ]);
  };

  return (
    <div className="min-h-screen bg-[#F3F6FA] text-slate-800 font-sans">
      {/* Header AlimGest */}
      <header className="bg-[#123B65] text-white p-4 shadow-md">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-8 h-8 text-[#20A477]" />
            <div>
              <h1 className="text-xl font-bold tracking-wide">AlimGest</h1>
              <p className="text-xs text-slate-300">Gestão Inteligente da Alimentação Escolar</p>
            </div>
          </div>
          
          {/* Navegação de Abas */}
          <nav className="flex bg-[#0D2D4D] p-1.5 rounded-xl gap-1 text-sm">
            <button 
              onClick={() => setAbaAtiva('comprovacao')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition ${abaAtiva === 'comprovacao' ? 'bg-[#20A477] text-white shadow' : 'text-slate-300 hover:text-white'}`}
            >
              <Camera className="w-4 h-4" /> Comprovação
            </button>
            <button 
              onClick={() => setAbaAtiva('historico')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition ${abaAtiva === 'historico' ? 'bg-[#20A477] text-white shadow' : 'text-slate-300 hover:text-white'}`}
            >
              <History className="w-4 h-4" /> Histórico
            </button>
            <button 
              onClick={() => setAbaAtiva('escolas')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition ${abaAtiva === 'escolas' ? 'bg-[#20A477] text-white shadow' : 'text-slate-300 hover:text-white'}`}
            >
              <School className="w-4 h-4" /> Escolas
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto p-4 md:p-6">
        
        {/* ABA 1: DUPLA COMPROVAÇÃO */}
        {abaAtiva === 'comprovacao' && (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center justify-between border-b pb-4 mb-6">
              <div className="flex items-center gap-3">
                <Camera className="w-6 h-6 text-[#123B65]" />
                <div>
                  <h2 className="text-lg font-bold text-[#123B65]">Módulo de Dupla Comprovação Fotográfica</h2>
                  <p className="text-sm text-slate-500">Registo obrigatório e rastreável de receção de alimentos</p>
                </div>
              </div>
              <span className="hidden sm:inline-block bg-emerald-50 text-[#20A477] border border-emerald-200 text-xs font-semibold px-3 py-1 rounded-full">
                Escola Ativa: EMEF Central
              </span>
            </div>

            {sucesso ? (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-8 rounded-lg text-center">
                <CheckCircle2 className="w-14 h-14 text-[#20A477] mx-auto mb-3" />
                <h3 className="text-2xl font-bold text-[#20A477]">Comprovação Registada com Sucesso!</h3>
                <p className="text-sm text-slate-600 mt-2 max-w-md mx-auto">
                  As fotografias da nota fiscal e dos mantimentos foram validadas e salvas na base de dados (Neon DB).
                </p>
                <button 
                  onClick={() => { setSucesso(false); setFotoNota(null); setFotoAlimento(null); setEtapa(1); setDivergencia(false); setMotivo(''); }}
                  className="mt-6 bg-[#123B65] text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-slate-800 transition shadow"
                >
                  Efetuar Novo Registo
                </button>
              </div>
            ) : (
              <form onSubmit={handleFinalizar} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* ETAPA 1: Nota Fiscal */}
                  <div className={`p-4 rounded-xl border-2 transition ${fotoNota ? 'border-[#20A477] bg-emerald-50/20' : 'border-dashed border-slate-300'}`}>
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-bold text-sm text-[#123B65] flex items-center gap-2">
                        <FileText className="w-4 h-4" /> 1. Foto da Nota Fiscal / Documento
                      </span>
                      {fotoNota && <CheckCircle2 className="w-5 h-5 text-[#20A477]" />}
                    </div>

                    {fotoNota ? (
                      <div className="relative">
                        <img src={fotoNota} alt="Nota Fiscal" className="w-full h-48 object-cover rounded-lg shadow-sm mb-2" />
                        <button 
                          type="button" 
                          onClick={() => setFotoNota(null)}
                          className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded shadow"
                        >
                          Alterar
                        </button>
                      </div>
                    ) : (
                      <div className="h-48 flex flex-col items-center justify-center text-slate-400 bg-slate-50 rounded-lg">
                        <Camera className="w-10 h-10 mb-2 text-slate-300" />
                        <p className="text-xs mb-3 text-slate-500">Capture a nota fiscal entregue</p>
                        <button 
                          type="button"
                          onClick={handleSimularFoto1}
                          className="bg-[#123B65] text-white px-4 py-2 rounded-lg text-xs font-semibold hover:bg-slate-800 transition shadow"
                        >
                          Simular Câmara (Nota)
                        </button>
                      </div>
                    )}
                  </div>

                  {/* ETAPA 2: Alimento Recebido */}
                  <div className={`p-4 rounded-xl border-2 transition ${fotoAlimento ? 'border-[#20A477] bg-emerald-50/20' : 'border-dashed border-slate-300'}`}>
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-bold text-sm text-[#123B65] flex items-center gap-2">
                        <PackageCheck className="w-4 h-4" /> 2. Foto dos Alimentos na Escola
                      </span>
                      {fotoAlimento && <CheckCircle2 className="w-5 h-5 text-[#20A477]" />}
                    </div>

                    {fotoAlimento ? (
                      <div className="relative">
                        <img src={fotoAlimento} alt="Alimento" className="w-full h-48 object-cover rounded-lg shadow-sm mb-2" />
                        <button 
                          type="button" 
                          onClick={() => setFotoAlimento(null)}
                          className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded shadow"
                        >
                          Alterar
                        </button>
                      </div>
                    ) : (
                      <div className="h-48 flex flex-col items-center justify-center text-slate-400 bg-slate-50 rounded-lg">
                        <Camera className="w-10 h-10 mb-2 text-slate-300" />
                        <p className="text-xs mb-3 text-slate-500">Capture os mantimentos conferidos</p>
                        <button 
                          type="button"
                          onClick={handleSimularFoto2}
                          disabled={!fotoNota}
                          className={`px-4 py-2 rounded-lg text-xs font-semibold transition shadow ${
                            fotoNota ? 'bg-[#123B65] text-white hover:bg-slate-800 cursor-pointer' : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                          }`}
                        >
                          Simular Câmara (Alimento)
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Divergência */}
                <div className="bg-[#F3F6FA] p-4 rounded-xl border border-slate-200">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={divergencia}
                      onChange={(e) => setDivergencia(e.target.checked)}
                      className="w-4 h-4 text-[#F2A640] rounded border-slate-300 focus:ring-[#F2A640]"
                    />
                    <span className="text-sm font-semibold text-slate-700 flex items-center gap-1.5">
                      <AlertTriangle className="w-4 h-4 text-[#F2A640]" /> Existe alguma divergência quantitativa ou qualitativa na entrega?
                    </span>
                  </label>

                  {divergencia && (
                    <div className="mt-3">
                      <textarea 
                        placeholder="Descreva detalhadamente o problema (ex: falta de caixas de leite, frutas danificadas...)"
                        value={motivo}
                        onChange={(e) => setMotivo(e.target.value)}
                        required
                        className="w-full p-3 text-sm border border-slate-300 rounded-lg focus:outline-none focus:border-[#F2A640] bg-white"
                        rows={2}
                      />
                    </div>
                  )}
                </div>

                {/* Botão Submeter */}
                <button
                  type="submit"
                  disabled={!fotoNota || !fotoAlimento}
                  className={`w-full py-3.5 rounded-xl font-bold text-white transition shadow-md flex items-center justify-center gap-2 ${
                    fotoNota && fotoAlimento 
                      ? 'bg-[#20A477] hover:bg-emerald-600 cursor-pointer' 
                      : 'bg-slate-300 cursor-not-allowed'
                  }`}
                >
                  Registar Comprovação Fotográfica <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        )}

        {/* ABA 2: HISTÓRICO DE ENTREGAS */}
        {abaAtiva === 'historico' && (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h2 className="text-lg font-bold text-[#123B65] mb-4">Histórico de Comprovações Registadas</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-600">
                <thead className="bg-slate-100 text-[#123B65] uppercase text-xs">
                  <tr>
                    <th className="p-3">Escola</th>
                    <th className="p-3">Data e Hora</th>
                    <th className="p-3">Estado</th>
                    <th className="p-3">Divergência Registada</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {historico.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50">
                      <td className="p-3 font-semibold text-slate-800">{item.escola}</td>
                      <td className="p-3">{item.data}</td>
                      <td className="p-3">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                          item.status === 'Aprovado' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="p-3 text-slate-500">{item.divergencia}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ABA 3: ESCOLAS */}
        {abaAtiva === 'escolas' && (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h2 className="text-lg font-bold text-[#123B65] mb-4">Escolas Conectadas à Rede</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 border rounded-xl bg-slate-50 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-[#123B65]">EMEF Central</h3>
                  <p className="text-xs text-slate-500">Alunos atendidos: 480 | Gestor: Carlos Silva</p>
                </div>
                <span className="bg-emerald-100 text-emerald-800 text-xs px-2.5 py-1 rounded-full font-semibold">Ativa</span>
              </div>
              <div className="p-4 border rounded-xl bg-slate-50 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-[#123B65]">Escola Municipal Tiradentes</h3>
                  <p className="text-xs text-slate-500">Alunos atendidos: 320 | Gestor: Ana Souza</p>
                </div>
                <span className="bg-emerald-100 text-emerald-800 text-xs px-2.5 py-1 rounded-full font-semibold">Ativa</span>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
