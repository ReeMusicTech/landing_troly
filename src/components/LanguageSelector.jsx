import React, { useState } from 'react';
import { getAvailableLanguages, getCurrentLanguage, setLanguage } from '../i18n';

function LanguageSelector({ onLanguageChange }) {
    const [isOpen, setIsOpen] = useState(false);
    const [currentLang, setCurrentLang] = useState(getCurrentLanguage());
    const languages = getAvailableLanguages();

    const handleLanguageSelect = (langCode) => {
        setLanguage(langCode);
        setCurrentLang(langCode);
        setIsOpen(false);
        if (onLanguageChange) onLanguageChange(langCode);
    };

    return (
        <div style={{ position: 'relative' }}>
            {/* Trigger */}
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Select language"
                aria-expanded={isOpen}
                style={{
                    display: 'flex', alignItems: 'center', gap: '0.4rem',
                    padding: '0.4rem 0.75rem', borderRadius: '0.6rem',
                    background: 'rgba(26,46,40,0.7)', border: '1px solid rgba(69,230,194,0.15)',
                    cursor: 'pointer', fontFamily: 'inherit',
                    fontSize: '0.82rem', fontWeight: 600,
                    color: '#9db4ae', letterSpacing: '0.03em',
                    transition: 'all 0.15s ease',
                }}
                onMouseEnter={e => {
                    e.currentTarget.style.borderColor = 'rgba(69,230,194,0.35)';
                    e.currentTarget.style.color = '#45E6C2';
                }}
                onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'rgba(69,230,194,0.15)';
                    e.currentTarget.style.color = '#9db4ae';
                }}
            >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="2" y1="12" x2="22" y2="12" />
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
                {currentLang.toUpperCase()}
            </button>

            {/* Backdrop */}
            {isOpen && (
                <>
                    <div
                        style={{ position: 'fixed', inset: 0, zIndex: 40 }}
                        onClick={() => setIsOpen(false)}
                        aria-hidden="true"
                    />
                    {/* Dropdown */}
                    <div style={{
                        position: 'absolute', right: 0, top: 'calc(100% + 0.5rem)',
                        background: '#111111', border: '1px solid #1A2E28',
                        borderRadius: '0.85rem', overflow: 'hidden',
                        zIndex: 50, minWidth: '160px',
                        boxShadow: '0 16px 40px rgba(0,0,0,0.7), 0 0 0 1px rgba(69,230,194,0.05)',
                        animation: 'fadeIn 0.15s ease forwards'
                    }}>
                        {languages.map((lang) => {
                            const isActive = currentLang === lang.code;
                            return (
                                <button
                                    key={lang.code}
                                    type="button"
                                    onClick={() => handleLanguageSelect(lang.code)}
                                    style={{
                                        width: '100%', display: 'flex', alignItems: 'center', gap: '0.75rem',
                                        padding: '0.7rem 1rem', border: 'none', cursor: 'pointer',
                                        fontFamily: 'inherit', fontSize: '0.85rem', fontWeight: isActive ? 600 : 400,
                                        textAlign: 'left',
                                        background: isActive ? 'rgba(69,230,194,0.08)' : 'transparent',
                                        color: isActive ? '#45E6C2' : '#9db4ae',
                                        transition: 'all 0.12s ease',
                                        borderLeft: isActive ? '2px solid #45E6C2' : '2px solid transparent',
                                    }}
                                    onMouseEnter={e => {
                                        if (!isActive) {
                                            e.currentTarget.style.background = 'rgba(26,46,40,0.6)';
                                            e.currentTarget.style.color = '#fff';
                                        }
                                    }}
                                    onMouseLeave={e => {
                                        if (!isActive) {
                                            e.currentTarget.style.background = 'transparent';
                                            e.currentTarget.style.color = '#9db4ae';
                                        }
                                    }}
                                >
                                    <span style={{ fontSize: '1.1rem' }}>{lang.flag}</span>
                                    <span>{lang.name}</span>
                                </button>
                            );
                        })}
                    </div>
                </>
            )}
        </div>
    );
}

export default LanguageSelector;
