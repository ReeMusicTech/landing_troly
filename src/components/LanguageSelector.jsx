import React, { useState } from 'react';
import { Globe, Check } from 'lucide-react';
import { getAvailableLanguages, getCurrentLanguage, setLanguage } from '../i18n';

function LanguageSelector({ onLanguageChange }) {
    const [isOpen, setIsOpen] = useState(false);
    const [currentLang, setCurrentLang] = useState(getCurrentLanguage());
    const languages = getAvailableLanguages();

    const handleLanguageSelect = (langCode) => {
        setLanguage(langCode);
        setCurrentLang(langCode);
        setIsOpen(false);

        // Notify parent component to re-render with new language
        if (onLanguageChange) {
            onLanguageChange(langCode);
        }
    };

    const currentLanguage = languages.find(lang => lang.code === currentLang);

    return (
        <div className="relative">
            {/* Trigger Button */}
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all text-slate-300 hover:text-white"
                aria-label="Select language"
                aria-expanded={isOpen}
            >
                <Globe className="w-4 h-4" />
                <span className="text-sm font-medium">{currentLanguage?.flag}</span>
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 z-40"
                        onClick={() => setIsOpen(false)}
                        aria-hidden="true"
                    />

                    {/* Menu */}
                    <div className="absolute right-0 mt-2 w-48 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                        {languages.map((lang) => (
                            <button
                                key={lang.code}
                                type="button"
                                onClick={() => handleLanguageSelect(lang.code)}
                                className={`w-full flex items-center justify-between px-4 py-3 text-left transition-colors ${currentLang === lang.code
                                        ? 'bg-troly-red/10 text-white'
                                        : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <span className="text-xl">{lang.flag}</span>
                                    <span className="text-sm font-medium">{lang.name}</span>
                                </div>
                                {currentLang === lang.code && (
                                    <Check className="w-4 h-4 text-troly-red" />
                                )}
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}

export default LanguageSelector;
