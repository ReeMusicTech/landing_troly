import React, { useState } from 'react';
import { ArrowRight, Check, Car, Users, DollarSign, Lightbulb, ChevronRight } from 'lucide-react';
import { t, getCurrentLanguage } from './i18n';
import LanguageSelector from './components/LanguageSelector';

function App() {
  const [language, setLanguage] = useState(getCurrentLanguage());
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
  const [isSubmitting, setIsSubmitting] = useState(false);

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

    // Prevenir envíos duplicados
    if (isSubmitting) return;

    // Activar estado de carga
    setIsSubmitting(true);

    // EL CHISMOSO 🕵️‍♂️
    console.log("Lo que voy a enviar:", formData);

    const WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbyiYS7J4WOF6712dgJ7Gh-GVXTH-E_pe2OaAFOsvvjpySOPIt96toU01_mMuBaiXmp6SA/exec";

    try {
      await fetch(WEBHOOK_URL, {
        method: "POST",
        mode: "no-cors", // Importante para evitar errores de CORS con Google
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      // ✅ ÉXITO: Limpiar el formulario y resetear a valores iniciales
      setFormData({
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

      alert(t('alert.success'));

    } catch (error) {
      // ❌ ERROR: Mostrar mensaje y permitir reintentar
      console.error("Error al enviar el formulario:", error.message);
      alert(t('alert.error'));
    } finally {
      // Siempre desactivar el estado de carga
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 max-w-md w-full text-center shadow-2xl">
          <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-8 h-8 text-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">{t('success.title')}</h2>
          <p className="text-slate-400">
            {t('success.message')}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-troly-red selection:text-white">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-lg mx-auto px-6 py-4 flex justify-between items-center">
          <span className="text-2xl font-bold italic tracking-tighter text-white">
            TROLY
          </span>
          <LanguageSelector onLanguageChange={setLanguage} />
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
              {t('hero.badge')}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
              {t('hero.title')}
            </h1>
            <p className="text-slate-400 text-lg">
              {t('hero.subtitle')}
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
                  <h2 className="text-xl font-semibold text-white">{t('section.collection')}</h2>
                </div>

                <div className="space-y-4">
                  <label className="block text-sm font-medium text-slate-300">
                    {t('form.collectionMethod.label')}
                  </label>
                  <select
                    name="collectionMethod"
                    value={formData.collectionMethod}
                    onChange={handleInputChange}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-troly-red focus:ring-1 focus:ring-troly-red appearance-none"
                  >
                    <option value="" disabled>{t('form.collectionMethod.placeholder')}</option>
                    <option value="Memoria">{t('option.memory')}</option>
                    <option value="Excel">{t('option.excel')}</option>
                    <option value="Fotos">{t('option.photos')}</option>
                    <option value="Notas">{t('option.notes')}</option>
                    <option value="App">{t('option.app')}</option>
                    <option value="Ninguno">{t('option.none')}</option>
                  </select>
                </div>

                <div className="space-y-4">
                  <label className="block text-sm font-medium text-slate-300">
                    {t('form.missingPieces.label')}
                  </label>
                  <textarea
                    name="missingPiecesMethod"
                    value={formData.missingPiecesMethod}
                    onChange={handleInputChange}
                    rows={2}
                    placeholder={t('form.missingPieces.placeholder')}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-troly-red focus:ring-1 focus:ring-troly-red text-base"
                  />
                </div>

                <div className="space-y-4">
                  <label className="block text-sm font-medium text-slate-300">
                    {t('form.duplicateError.label')}
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
                  <h2 className="text-xl font-semibold text-white">{t('section.community')}</h2>
                </div>

                <div className="space-y-4">
                  <label className="block text-sm font-medium text-slate-300">
                    {t('form.showingImportance.label')}
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
                    <span>{t('form.showingImportance.min')}</span>
                    <span>{t('form.showingImportance.max')}</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="block text-sm font-medium text-slate-300">
                    {t('form.listingFrustrations.label')}
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
                    {t('form.othersPlatform.label')}
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
                  <h2 className="text-xl font-semibold text-white">{t('section.market')}</h2>
                </div>

                <div className="space-y-4">
                  <label className="block text-sm font-medium text-slate-300">
                    {t('form.priceCheck.label')}
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {['ebay', 'facebook', 'seller', 'experience', 'other'].map((source) => (
                      <button
                        key={source}
                        type="button"
                        onClick={() => handleCheckboxChange(source)}
                        className={`py-3 px-4 rounded-lg text-sm text-left transition-all flex items-center justify-between ${formData.priceCheckSources.includes(source)
                          ? 'bg-green-500/10 border border-green-500 text-green-400'
                          : 'bg-slate-800 border border-slate-700 text-slate-400 hover:border-slate-600'
                          }`}
                      >
                        {t(`price.${source}`)}
                        {formData.priceCheckSources.includes(source) && <Check className="w-4 h-4" />}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="block text-sm font-medium text-slate-300">
                    {t('form.transactionDifficulty.label')}
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
                    {t('form.priceKnowledge.label')}
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
                  <h2 className="text-xl font-semibold text-white">{t('section.ideal')}</h2>
                </div>

                <div className="space-y-4">
                  <label className="block text-sm font-medium text-slate-300">
                    {t('form.noApps.label')}
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
                    {t('form.idealFeature.label')} <span className="text-red-500">{t('form.idealFeature.required')}</span>
                  </label>
                  <textarea
                    name="idealAppFeature"
                    required
                    value={formData.idealAppFeature}
                    onChange={handleInputChange}
                    rows={3}
                    placeholder={t('form.idealFeature.placeholder')}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 text-base"
                  />
                </div>

                <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-800">
                  <label className="block text-sm font-medium text-slate-300 mb-3">
                    {t('form.contactInfo.label')}
                  </label>
                  <input
                    type="text"
                    name="contactInfo"
                    value={formData.contactInfo}
                    onChange={handleInputChange}
                    placeholder={t('form.contactInfo.placeholder')}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 text-base"
                  />
                </div>
              </section>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full group relative flex items-center justify-center gap-2 font-bold py-4 px-8 rounded-xl transition-all shadow-lg ${isSubmitting
                  ? 'bg-slate-700 text-slate-400 cursor-not-allowed opacity-60'
                  : 'bg-gradient-to-r from-troly-red to-rose-600 hover:from-rose-600 hover:to-troly-red text-white transform hover:scale-[1.02] shadow-rose-900/20'
                  }`}
              >
                <span>{isSubmitting ? t('button.submitting') : t('button.submit')}</span>
                {!isSubmitting && (
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                )}
              </button>

            </form>
          </div>

          <footer className="mt-12 text-center text-slate-600 text-sm">
            <p>&copy; {new Date().getFullYear()} Troly. {t('footer.rights')}</p>
          </footer>
        </div>
      </main>
    </div>
  );
}

export default App;
