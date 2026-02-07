import React, { useState } from 'react';
import { ArrowRight, Check, Car, Users, DollarSign, Lightbulb, ChevronRight } from 'lucide-react';

function App() {
  const [formData, setFormData] = useState({
    collectionMethod: '',
    missingPiecesMethod: '',
    duplicateBuyError: '',
    showingImportance: 3,
    listingFrustrations: '',
    othersPlatform: '',
    priceCheckSources: [],
    lastTransactionDifficulty: '',
    priceKnowledgeInfluence: '',
    noAppsScenario: '',
    idealAppFeature: '',
    contactInfo: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (value) => {
    setFormData(prev => {
      const current = prev.priceCheckSources;
      if (current.includes(value)) {
        return { ...prev, priceCheckSources: current.filter(item => item !== value) };
      } else {
        return { ...prev, priceCheckSources: [...current, value] };
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Asumiendo que 'formData' es el objeto con tus respuestas
    // Asegúrate que las llaves del objeto coincidan con las columnas del Excel (menos 'fecha')

    const WEBHOOK_URL = "PEGA_AQUI_LA_URL_DE_APPS_SCRIPT";

    try {
      await fetch(WEBHOOK_URL, {
        method: "POST",
        mode: "no-cors", // Importante para evitar errores de CORS con Google
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      alert("¡Gracias por unirte al club Troly!");
      // Aquí podrías redirigir o limpiar el formulario
    } catch (error) {
      console.error("Error!", error.message);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 max-w-md w-full text-center shadow-2xl">
          <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-8 h-8 text-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">¡Bienvenido al Club!</h2>
          <p className="text-slate-400">
            Gracias por ser parte de Troly. Estamos construyendo algo increíble para ti.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-troly-red selection:text-white">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-lg mx-auto px-6 py-4 flex justify-center">
          <span className="text-2xl font-bold italic tracking-tighter text-white">
            TROLY
          </span>
        </div>
      </header>

      <main className="pt-24 pb-12 px-4">
        <div className="max-w-lg mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-medium text-troly-red mb-4">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-troly-red opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-troly-red"></span>
              </span>
              Early Access
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
              Construyendo la comunidad de coleccionistas más grande de América
            </h1>
            <p className="text-slate-400 text-lg">
              Construyámosla juntos. Ayúdanos a diseñar la herramienta perfecta para tu colección.
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-xl overflow-hidden">
            <div className="h-1 w-full bg-gradient-to-r from-troly-red to-blue-600"></div>

            <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-10">

              {/* Section 1 */}
              <section className="space-y-6">
                <div className="flex items-center gap-3 text-troly-red mb-4">
                  <Car className="w-6 h-6" />
                  <h2 className="text-xl font-semibold text-white">Tu Colección</h2>
                </div>

                <div className="space-y-4">
                  <label className="block text-sm font-medium text-slate-300">
                    ¿Cómo llevas actualmente el registro de los carritos que tienes?
                  </label>
                  <select
                    name="collectionMethod"
                    value={formData.collectionMethod}
                    onChange={handleInputChange}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-troly-red focus:ring-1 focus:ring-troly-red appearance-none"
                  >
                    <option value="" disabled>Selecciona una opción</option>
                    <option value="Memoria">🧠 Memoria</option>
                    <option value="Excel">📊 Excel / Google Sheets</option>
                    <option value="Fotos">📸 Fotos en el celular</option>
                    <option value="Notas">📝 Notas</option>
                    <option value="App">📱 App genérica</option>
                    <option value="Ninguno">❌ No llevo registro</option>
                  </select>
                </div>

                <div className="space-y-4">
                  <label className="block text-sm font-medium text-slate-300">
                    ¿Qué usas para ver qué piezas te faltan durante una cacería?
                  </label>
                  <textarea
                    name="missingPiecesMethod"
                    value={formData.missingPiecesMethod}
                    onChange={handleInputChange}
                    rows={2}
                    placeholder="Ej. Reviso mi galería de fotos..."
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-troly-red focus:ring-1 focus:ring-troly-red text-base"
                  />
                </div>

                <div className="space-y-4">
                  <label className="block text-sm font-medium text-slate-300">
                    ¿Cuándo fue la última vez que compraste un repetido por error? ¿Qué pasó?
                  </label>
                  <textarea
                    name="duplicateBuyError"
                    value={formData.duplicateBuyError}
                    onChange={handleInputChange}
                    rows={2}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-troly-red focus:ring-1 focus:ring-troly-red text-base"
                  />
                </div>
              </section>

              <hr className="border-slate-800" />

              {/* Section 2 */}
              <section className="space-y-6">
                <div className="flex items-center gap-3 text-blue-500 mb-4">
                  <Users className="w-6 h-6" />
                  <h2 className="text-xl font-semibold text-white">Comunidad</h2>
                </div>

                <div className="space-y-4">
                  <label className="block text-sm font-medium text-slate-300">
                    ¿Qué tan importante es para ti mostrar tus piezas? (1-5)
                  </label>
                  <div className="flex justify-between gap-2">
                    {[1, 2, 3, 4, 5].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, showingImportance: num }))}
                        className={`flex-1 py-3 rounded-lg text-sm font-bold transition-all ${formData.showingImportance === num
                          ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                          : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                          }`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                  <div className="flex justify-between text-xs text-slate-500 px-1">
                    <span>No me interesa</span>
                    <span>Fundamental</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="block text-sm font-medium text-slate-300">
                    ¿Qué te frustra de las redes actuales al compartir tu colección?
                  </label>
                  <textarea
                    name="listingFrustrations"
                    value={formData.listingFrustrations}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-base"
                  />
                </div>

                <div className="space-y-4">
                  <label className="block text-sm font-medium text-slate-300">
                    ¿Conoces coleccionistas que compartan fotos constantemente? ¿Dónde?
                  </label>
                  <textarea
                    name="othersPlatform"
                    value={formData.othersPlatform}
                    onChange={handleInputChange}
                    rows={2}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-base"
                  />
                </div>
              </section>

              <hr className="border-slate-800" />

              {/* Section 3 */}
              <section className="space-y-6">
                <div className="flex items-center gap-3 text-green-500 mb-4">
                  <DollarSign className="w-6 h-6" />
                  <h2 className="text-xl font-semibold text-white">Mercado</h2>
                </div>

                <div className="space-y-4">
                  <label className="block text-sm font-medium text-slate-300">
                    ¿Cómo verificas si un precio es justo?
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {['eBay', 'Grupos FB', 'Vendedor', 'Experiencia', 'Otro'].map((source) => (
                      <button
                        key={source}
                        type="button"
                        onClick={() => handleCheckboxChange(source)}
                        className={`py-3 px-4 rounded-lg text-sm text-left transition-all flex items-center justify-between ${formData.priceCheckSources.includes(source)
                          ? 'bg-green-500/10 border border-green-500 text-green-400'
                          : 'bg-slate-800 border border-slate-700 text-slate-400 hover:border-slate-600'
                          }`}
                      >
                        {source}
                        {formData.priceCheckSources.includes(source) && <Check className="w-4 h-4" />}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="block text-sm font-medium text-slate-300">
                    ¿Qué fue lo más difícil de tu última compra o venta?
                  </label>
                  <textarea
                    name="lastTransactionDifficulty"
                    value={formData.lastTransactionDifficulty}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 text-base"
                  />
                </div>

                <div className="space-y-4">
                  <label className="block text-sm font-medium text-slate-300">
                    ¿Cómo influye el desconocimiento del precio en tu decisión?
                  </label>
                  <textarea
                    name="priceKnowledgeInfluence"
                    value={formData.priceKnowledgeInfluence}
                    onChange={handleInputChange}
                    rows={2}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 text-base"
                  />
                </div>
              </section>

              <hr className="border-slate-800" />

              {/* Section 4 */}
              <section className="space-y-6">
                <div className="flex items-center gap-3 text-purple-500 mb-4">
                  <Lightbulb className="w-6 h-6" />
                  <h2 className="text-xl font-semibold text-white">El Ideal</h2>
                </div>

                <div className="space-y-4">
                  <label className="block text-sm font-medium text-slate-300">
                    Si desaparecieran las apps actuales, ¿qué harías?
                  </label>
                  <textarea
                    name="noAppsScenario"
                    value={formData.noAppsScenario}
                    onChange={handleInputChange}
                    rows={2}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 text-base"
                  />
                </div>

                <div className="space-y-4">
                  <label className="block text-sm font-medium text-slate-300">
                    ¿Qué función NO podría faltar en tu app ideal? <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="idealAppFeature"
                    required
                    value={formData.idealAppFeature}
                    onChange={handleInputChange}
                    rows={3}
                    placeholder="Esta es la pregunta más importante..."
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 text-base"
                  />
                </div>

                <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-800">
                  <label className="block text-sm font-medium text-slate-300 mb-3">
                    ¿Te interesaría una entrevista de 10 min? (Deja tu contacto)
                  </label>
                  <input
                    type="text"
                    name="contactInfo"
                    value={formData.contactInfo}
                    onChange={handleInputChange}
                    placeholder="Correo o @Instagram"
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 text-base"
                  />
                </div>
              </section>

              <button
                type="submit"
                className="w-full group relative flex items-center justify-center gap-2 bg-gradient-to-r from-troly-red to-rose-600 hover:from-rose-600 hover:to-troly-red text-white font-bold py-4 px-8 rounded-xl transition-all transform hover:scale-[1.02] shadow-lg shadow-rose-900/20"
              >
                <span>Enviar y Unirme al Club</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

            </form>
          </div>

          <footer className="mt-12 text-center text-slate-600 text-sm">
            <p>&copy; {new Date().getFullYear()} Troly. All rights reserved.</p>
          </footer>
        </div>
      </main>
    </div>
  );
}

export default App;
