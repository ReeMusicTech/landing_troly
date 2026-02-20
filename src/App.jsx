import React, { useState } from 'react';
import { t, getCurrentLanguage } from './i18n';
import LanguageSelector from './components/LanguageSelector';

// Chip definitions: key, i18n key, category
const CHIPS = [
  { key: 'search', label: 'chip.search', cat: 'cat.market' },
  { key: 'sell', label: 'chip.sell', cat: 'cat.market' },
  { key: 'price', label: 'chip.price', cat: 'cat.market' },
  { key: 'meet', label: 'chip.meet', cat: 'cat.community' },
  { key: 'events', label: 'chip.events', cat: 'cat.community' },
  { key: 'digitize', label: 'chip.digitize', cat: 'cat.collection' },
  { key: 'trade', label: 'chip.trade', cat: 'cat.market' },
  { key: 'raffle', label: 'chip.raffle', cat: 'cat.market' },
];

const INITIAL_CHIPS = {
  search: false, sell: false, price: false, meet: false,
  events: false, digitize: false, trade: false, raffle: false
};

const WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbyiYS7J4WOF6712dgJ7Gh-GVXTH-E_pe2OaAFOsvvjpySOPIt96toU01_mMuBaiXmp6SA/exec";

function App() {
  const [, setLanguage] = useState(getCurrentLanguage());
  const [chips, setChips] = useState(INITIAL_CHIPS);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleChip = (key) => {
    setChips(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);

    // Convert booleans to 1/0 integers for Google Sheets
    const payload = Object.fromEntries(
      Object.entries(chips).map(([k, v]) => [k, v ? 1 : 0])
    );

    try {
      await fetch(WEBHOOK_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      setChips(INITIAL_CHIPS);
      setSubmitted(true);
    } catch (error) {
      console.error('Error submitting:', error);
      alert(t('alert.error'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNotInterested = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    const payload = { not_interested: 1, search: 0, sell: 0, price: 0, meet: 0, events: 0, digitize: 0, trade: 0, raffle: 0 };
    try {
      await fetch(WEBHOOK_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      setSubmitted(true);
    } catch (error) {
      console.error('Error submitting:', error);
      alert(t('alert.error'));
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ── Success Screen ── */
  if (submitted) {
    return (
      <div style={{ minHeight: '100vh', background: '#0D0D0D', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }}>
        <div className="fade-in" style={{
          background: '#111111', border: '1px solid #1A2E28', borderRadius: '1.5rem',
          padding: '2.5rem 2rem', maxWidth: '450px', width: '100%', textAlign: 'center'
        }}>
          {/* Neon check circle */}
          <div style={{
            width: '72px', height: '72px', borderRadius: '50%',
            background: 'rgba(69, 230, 194, 0.1)', border: '2px solid #45E6C2',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 1.5rem',
            boxShadow: '0 0 24px rgba(69, 230, 194, 0.3)'
          }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#45E6C2" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#fff', marginBottom: '0.75rem' }}>
            {t('success.title')}
          </h2>
          <p style={{ color: '#7a9990', lineHeight: 1.6, marginBottom: '2rem' }}>
            {t('success.message')}
          </p>
          <p style={{ fontSize: '0.78rem', color: '#3d5e56', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            {t('success.footer')}
          </p>
          <p style={{ marginTop: '1.5rem', fontSize: '0.88rem', color: '#7a9990', lineHeight: 1.6 }}>
            {t('success.who')}{' '}
            <a
              href="https://troly.autos"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#45E6C2', fontWeight: 600, textDecoration: 'none' }}
              onMouseEnter={e => { e.currentTarget.style.textDecoration = 'underline'; }}
              onMouseLeave={e => { e.currentTarget.style.textDecoration = 'none'; }}
            >
              troly.autos
            </a>
          </p>
        </div>
      </div>
    );
  }

  /* ── Main Form ── */
  return (
    <div style={{ minHeight: '100vh', background: '#0D0D0D', color: '#e2e8f0' }}>

      {/* ── Header ── */}
      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        background: 'rgba(13,13,13,0.85)', backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(69,230,194,0.08)',
      }}>
        <div style={{
          maxWidth: '450px', margin: '0 auto',
          padding: '1rem 1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center'
        }}>
          <span style={{ fontSize: '1.5rem', fontWeight: 800, fontStyle: 'italic', letterSpacing: '-0.04em', color: '#fff' }}>
            TROLY
          </span>
          <LanguageSelector onLanguageChange={setLanguage} />
        </div>
      </header>

      {/* ── Main ── */}
      <main style={{ paddingTop: '5.5rem', paddingBottom: '3rem', padding: '5.5rem 1rem 3rem' }}>
        <div style={{ maxWidth: '450px', margin: '0 auto' }} className="fade-in">

          {/* ── Hero ── */}
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            {/* Badge pill */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              background: 'rgba(26,46,40,0.8)', border: '1px solid rgba(69,230,194,0.2)',
              borderRadius: '999px', padding: '0.3rem 0.85rem',
              fontSize: '0.72rem', fontWeight: 600, color: '#45E6C2',
              letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '1.25rem'
            }}>
              <span style={{
                width: '7px', height: '7px', borderRadius: '50%',
                background: '#45E6C2', display: 'inline-block',
                boxShadow: '0 0 6px #45E6C2'
              }} className="pulse-dot" />
              {t('hero.badge')}
            </div>

            <h1 style={{
              fontSize: 'clamp(1.6rem, 5vw, 2.1rem)', fontWeight: 800,
              color: '#ffffff', lineHeight: 1.25, marginBottom: '1rem',
              letterSpacing: '-0.02em'
            }}>
              {t('hero.title')}
            </h1>

            <p style={{ color: '#7a9990', fontSize: '1.15rem', lineHeight: 1.65 }}>
              {t('hero.subtitle')}
            </p>
          </div>

          {/* ── Form Card ── */}
          <div style={{
            background: '#111111', border: '1px solid #1A2E28',
            borderRadius: '1.5rem', overflow: 'hidden',
            boxShadow: '0 24px 64px rgba(0,0,0,0.6)'
          }}>
            {/* Neon top accent bar */}
            <div style={{
              height: '2px', width: '100%',
              background: 'linear-gradient(90deg, #45E6C2, #2ba88d, transparent)'
            }} />

            <form onSubmit={handleSubmit} style={{ padding: '1.75rem 1.5rem' }}>

              {/* Question */}
              <div style={{ marginBottom: '1.25rem' }}>
                <p style={{ fontSize: '1.25rem', fontWeight: 700, color: '#ffffff', marginBottom: '0.4rem' }}>
                  {t('form.question')}
                </p>
                <p style={{ fontSize: '0.95rem', color: '#4d7a6e', letterSpacing: '0.01em' }}>
                  {t('form.instruction')}
                </p>
              </div>

              {/* Chip Grid */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '1.75rem' }}>
                {CHIPS.map(({ key, label, cat }) => {
                  const isActive = chips[key];
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => toggleChip(key)}
                      style={{
                        width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        padding: '0.85rem 1rem',
                        borderRadius: '0.75rem',
                        outline: 'none',
                        cursor: 'pointer',
                        fontFamily: 'inherit',
                        fontSize: '0.92rem',
                        fontWeight: isActive ? 600 : 500,
                        textAlign: 'left',
                        // Dynamic styles
                        background: isActive ? '#45E6C2' : '#1A2E28',
                        border: `1px solid ${isActive ? '#45E6C2' : '#2a4a3e'}`,
                        color: isActive ? '#0A1F1B' : '#9db4ae',
                        boxShadow: isActive ? '0 0 18px rgba(69, 230, 194, 0.3), 0 2px 8px rgba(0,0,0,0.4)' : 'none',
                        transform: isActive ? 'scale(1.01)' : 'scale(1)',
                        transition: 'all 0.18s ease',
                      }}
                    >
                      <span>{t(label)}</span>
                      {/* Category badge */}
                      <span style={{
                        fontSize: '0.68rem', fontWeight: 600,
                        color: isActive ? 'rgba(10,31,27,0.7)' : '#3d5e56',
                        letterSpacing: '0.04em', textTransform: 'uppercase',
                        flexShrink: 0, marginLeft: '0.5rem'
                      }}>
                        {t(cat)}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  width: '100%', padding: '0.9rem',
                  borderRadius: '0.85rem', border: 'none',
                  fontFamily: 'inherit', fontSize: '1rem', fontWeight: 700,
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  letterSpacing: '0.02em',
                  background: isSubmitting
                    ? '#1A2E28'
                    : 'linear-gradient(135deg, #45E6C2 0%, #2ec4a6 100%)',
                  color: isSubmitting ? '#4d7a6e' : '#0A1F1B',
                  boxShadow: isSubmitting ? 'none' : '0 0 24px rgba(69,230,194,0.4), 0 4px 12px rgba(0,0,0,0.5)',
                  transform: isSubmitting ? 'scale(1)' : undefined,
                  transition: 'all 0.2s ease',
                  opacity: isSubmitting ? 0.6 : 1,
                }}
                onMouseEnter={e => { if (!isSubmitting) e.currentTarget.style.transform = 'scale(1.02)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}
              >
                {isSubmitting ? t('button.submitting') : `${t('button.submit')} ➔`}
              </button>

              {/* Not Interested button */}
              <button
                type="button"
                disabled={isSubmitting}
                onClick={handleNotInterested}
                style={{
                  width: '100%', padding: '0.75rem',
                  marginTop: '0.6rem',
                  borderRadius: '0.85rem',
                  border: '1px solid #2a4a3e',
                  background: 'transparent',
                  fontFamily: 'inherit', fontSize: '0.88rem', fontWeight: 500,
                  color: '#4d7a6e',
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  transition: 'all 0.18s ease',
                  opacity: isSubmitting ? 0.5 : 1,
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.color = '#7a9990';
                  e.currentTarget.style.borderColor = '#3d5e56';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color = '#4d7a6e';
                  e.currentTarget.style.borderColor = '#2a4a3e';
                }}
              >
                {t('button.notInterested')}
              </button>

              {/* Invite note inside card */}
              <p style={{
                textAlign: 'center', marginTop: '1rem',
                fontSize: '0.85rem', color: '#ffffff',
                fontWeight: 500,
              }}>
                {t('footer.invite')}
              </p>

            </form>
          </div>

          {/* ── Copyright outside card ── */}
          <p style={{
            textAlign: 'center', marginTop: '1.5rem',
            fontSize: '0.78rem', color: '#45E6C2',
            letterSpacing: '0.04em',
          }}>
            © 2026 Troly. All rights reserved.
          </p>

        </div>
      </main>
    </div>
  );
}

export default App;
