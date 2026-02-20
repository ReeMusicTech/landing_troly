// i18n.js - Lightweight internationalization system for Troly

const STORAGE_KEY = 'troly_lang';

const translations = {
    es: {
        // Hero
        'hero.badge': 'Early Access',
        'hero.title': 'Construyendo la comunidad de coleccionistas más grande de América',
        'hero.subtitle': 'Construyámosla juntos. Ayúdanos a diseñar la herramienta perfecta para tu colección.',

        // Form
        'form.question': '¿Qué quieres hacer hoy?',
        'form.instruction': 'Marca una o varias opciones',

        // Chips
        'chip.search': 'Buscar una pieza',
        'chip.sell': 'Vender una pieza',
        'chip.price': 'Saber el precio de una pieza',
        'chip.meet': 'Conocer otros coleccionistas',
        'chip.events': 'Ver eventos de diecast',
        'chip.digitize': 'Digitalizar mi colección',
        'chip.trade': 'Cambiar una pieza',
        'chip.raffle': 'Rifar una pieza',

        // Category labels
        'cat.market': 'Mercado',
        'cat.community': 'Comunidad',
        'cat.collection': 'Tu colección',

        // Submit button
        'button.submit': 'Enviar',
        'button.submitting': 'Enviando...',

        // Footer
        'footer.invite': 'El acceso será por invitación',

        // Alerts
        'alert.success': '¡Gracias! Tus preferencias fueron guardadas.',
        'alert.error': 'Hubo un error al enviar. Por favor, intenta de nuevo.',

        // Success screen
        'success.title': '¡Gracias por tu aporte!',
        'success.message': 'Usaremos tus respuestas para construir la herramienta perfecta para coleccionistas.',
        'success.footer': 'El acceso será por invitación',
    },

    en: {
        // Hero
        'hero.badge': 'Early Access',
        'hero.title': 'Building the largest die-cast collector community in the Americas',
        'hero.subtitle': "Let's build it together. Help us design the perfect tool for your collection.",

        // Form
        'form.question': 'What do you want to do today?',
        'form.instruction': 'Select one or more options',

        // Chips
        'chip.search': 'Find a piece',
        'chip.sell': 'Sell a piece',
        'chip.price': 'Get a price quote',
        'chip.meet': 'Meet other collectors',
        'chip.events': 'See diecast events',
        'chip.digitize': 'Digitize my collection',
        'chip.trade': 'Trade a piece',
        'chip.raffle': 'Raffle a piece',

        // Category labels
        'cat.market': 'Market',
        'cat.community': 'Community',
        'cat.collection': 'My collection',

        // Submit button
        'button.submit': 'Submit',
        'button.submitting': 'Submitting...',

        // Footer
        'footer.invite': 'Access will be by invitation only',

        // Alerts
        'alert.success': 'Thanks! Your preferences have been saved.',
        'alert.error': 'There was an error submitting. Please try again.',

        // Success screen
        'success.title': 'Thank you for contributing!',
        'success.message': "We'll use your answers to build the perfect tool for collectors.",
        'success.footer': 'Access will be by invitation only',
    },

    pt: {
        // Hero
        'hero.badge': 'Acesso Antecipado',
        'hero.title': 'Construindo a maior comunidade de colecionadores de miniaturas da América',
        'hero.subtitle': 'Vamos construir juntos. Ajude-nos a criar a ferramenta perfeita para sua coleção.',

        // Form
        'form.question': 'O que você quer fazer hoje?',
        'form.instruction': 'Marque uma ou várias opções',

        // Chips
        'chip.search': 'Encontrar uma peça',
        'chip.sell': 'Vender uma peça',
        'chip.price': 'Cotar o preço de uma peça',
        'chip.meet': 'Conhecer outros colecionadores',
        'chip.events': 'Ver eventos de diecast',
        'chip.digitize': 'Digitalizar minha coleção',
        'chip.trade': 'Trocar uma peça',
        'chip.raffle': 'Rifar uma peça',

        // Category labels
        'cat.market': 'Mercado',
        'cat.community': 'Comunidade',
        'cat.collection': 'Minha coleção',

        // Submit button
        'button.submit': 'Enviar',
        'button.submitting': 'Enviando...',

        // Footer
        'footer.invite': 'O acesso será por convite',

        // Alerts
        'alert.success': 'Obrigado! Suas preferências foram salvas.',
        'alert.error': 'Houve um erro ao enviar. Por favor, tente novamente.',

        // Success screen
        'success.title': 'Obrigado pela sua contribuição!',
        'success.message': 'Usaremos suas respostas para construir a ferramenta perfeita para colecionadores.',
        'success.footer': 'O acesso será por convite',
    }
};

const availableLanguages = [
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'pt', name: 'Português', flag: '🇧🇷' }
];

function detectBrowserLanguage() {
    const browserLang = (navigator.language || navigator.userLanguage).split('-')[0].toLowerCase();
    if (browserLang === 'pt') return 'pt';
    if (browserLang === 'en') return 'en';
    return 'es';
}

export function getCurrentLanguage() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && translations[stored]) return stored;
    return detectBrowserLanguage();
}

export function setLanguage(langCode) {
    if (translations[langCode]) {
        localStorage.setItem(STORAGE_KEY, langCode);
        document.documentElement.lang = langCode;
        return true;
    }
    return false;
}

export function t(key) {
    const currentLang = getCurrentLanguage();
    const translation = translations[currentLang]?.[key];
    if (translation !== undefined) return translation;
    if (currentLang !== 'es' && translations.es[key] !== undefined) return translations.es[key];
    console.warn(`Missing translation for key: ${key} in language: ${currentLang}`);
    return key;
}

export function getAvailableLanguages() {
    return availableLanguages;
}

setLanguage(getCurrentLanguage());
