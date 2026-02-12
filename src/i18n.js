// i18n.js - Lightweight internationalization system for Troly

const STORAGE_KEY = 'troly_lang';

// Complete translation dictionary with die-cast terminology
const translations = {
    es: {
        // Hero Section
        'hero.badge': 'Early Access',
        'hero.title': 'Construyendo la comunidad de coleccionistas más grande de América',
        'hero.subtitle': 'Construyámosla juntos. Ayúdanos a diseñar la herramienta perfecta para tu colección.',

        // Section Headers
        'section.collection': 'Tu Colección',
        'section.community': 'Comunidad',
        'section.market': 'Mercado',
        'section.ideal': 'El Ideal',

        // Form Questions
        'form.collectionMethod.label': '¿Cómo llevas actualmente el registro de los carritos que tienes?',
        'form.collectionMethod.placeholder': 'Selecciona una opción',
        'form.missingPieces.label': '¿Qué usas para ver qué piezas te faltan durante una cacería?',
        'form.missingPieces.placeholder': 'Ej. Reviso mi galería de fotos...',
        'form.duplicateError.label': '¿Cuándo fue la última vez que compraste un repetido por error? ¿Qué pasó?',
        'form.showingImportance.label': '¿Qué tan importante es para ti mostrar tus piezas? (1-5)',
        'form.showingImportance.min': 'No me interesa',
        'form.showingImportance.max': 'Fundamental',
        'form.listingFrustrations.label': '¿Qué te frustra de las redes actuales al compartir tu colección?',
        'form.othersPlatform.label': '¿Conoces coleccionistas que compartan fotos constantemente? ¿Dónde?',
        'form.priceCheck.label': '¿Cómo verificas si un precio es justo?',
        'form.transactionDifficulty.label': '¿Qué fue lo más difícil de tu última compra o venta?',
        'form.priceKnowledge.label': '¿Cómo influye el desconocimiento del precio en tu decisión?',
        'form.noApps.label': 'Si desaparecieran las apps actuales, ¿qué harías?',
        'form.idealFeature.label': '¿Qué función NO podría faltar en tu app ideal?',
        'form.idealFeature.placeholder': 'Esta es la pregunta más importante...',
        'form.idealFeature.required': '*',
        'form.contactInfo.label': '¿Te interesaría una entrevista de 10 min? (Deja tu contacto)',
        'form.contactInfo.placeholder': 'Correo o @Instagram',

        // Select Options
        'option.memory': '🧠 Memoria',
        'option.excel': '📊 Excel / Google Sheets',
        'option.photos': '📸 Fotos en el celular',
        'option.notes': '📝 Notas',
        'option.app': '📱 App genérica',
        'option.none': '❌ No llevo registro',

        // Price Check Options
        'price.ebay': 'eBay',
        'price.facebook': 'Grupos FB',
        'price.seller': 'Vendedor',
        'price.experience': 'Experiencia',
        'price.other': 'Otro',

        // Buttons & Actions
        'button.submit': 'Enviar y Unirme al Club',
        'button.submitting': 'Enviando...',

        // Alerts
        'alert.success': '¡Gracias por unirte al club Troly!',
        'alert.error': 'Hubo un error al enviar el formulario. Por favor, intenta nuevamente.',

        // Success Page
        'success.title': '¡Bienvenido al Club!',
        'success.message': 'Gracias por ser parte de Troly. Estamos construyendo algo increíble para ti.',

        // Footer
        'footer.rights': 'All rights reserved.',
    },

    en: {
        // Hero Section
        'hero.badge': 'Early Access',
        'hero.title': 'Building the largest die-cast collector community in the Americas',
        'hero.subtitle': "Let's build it together. Help us design the perfect tool for your collection.",

        // Section Headers
        'section.collection': 'Your Collection',
        'section.community': 'Community',
        'section.market': 'Marketplace',
        'section.ideal': 'The Ideal',

        // Form Questions
        'form.collectionMethod.label': 'How do you currently track your die-cast collection?',
        'form.collectionMethod.placeholder': 'Select an option',
        'form.missingPieces.label': 'What do you use to check what you\'re missing during a hunt?',
        'form.missingPieces.placeholder': 'E.g., I check my photo gallery...',
        'form.duplicateError.label': 'When was the last time you bought a duplicate by mistake? What happened?',
        'form.showingImportance.label': 'How important is showcasing your pieces to you? (1-5)',
        'form.showingImportance.min': 'Not interested',
        'form.showingImportance.max': 'Essential',
        'form.listingFrustrations.label': 'What frustrates you about current social platforms when sharing your collection?',
        'form.othersPlatform.label': 'Do you know collectors who constantly share photos? Where?',
        'form.priceCheck.label': 'How do you verify if a price is fair?',
        'form.transactionDifficulty.label': 'What was most difficult about your last purchase or sale?',
        'form.priceKnowledge.label': 'How does not knowing the price affect your decision?',
        'form.noApps.label': 'If current apps disappeared, what would you do?',
        'form.idealFeature.label': 'What feature is a MUST-HAVE in your ideal app?',
        'form.idealFeature.placeholder': 'This is the most important question...',
        'form.idealFeature.required': '*',
        'form.contactInfo.label': 'Interested in a 10-min interview? (Leave your contact)',
        'form.contactInfo.placeholder': 'Email or @Instagram',

        // Select Options
        'option.memory': '🧠 Memory',
        'option.excel': '📊 Excel / Google Sheets',
        'option.photos': '📸 Phone photos',
        'option.notes': '📝 Notes',
        'option.app': '📱 Generic app',
        'option.none': '❌ No tracking',

        // Price Check Options
        'price.ebay': 'eBay',
        'price.facebook': 'Facebook Groups',
        'price.seller': 'Seller',
        'price.experience': 'Experience',
        'price.other': 'Other',

        // Buttons & Actions
        'button.submit': 'Submit and Join the Club',
        'button.submitting': 'Submitting...',

        // Alerts
        'alert.success': 'Thanks for joining the Troly club!',
        'alert.error': 'There was an error submitting the form. Please try again.',

        // Success Page
        'success.title': 'Welcome to the Club!',
        'success.message': "Thank you for being part of Troly. We're building something amazing for you.",

        // Footer
        'footer.rights': 'All rights reserved.',
    },

    pt: {
        // Hero Section
        'hero.badge': 'Acesso Antecipado',
        'hero.title': 'Construindo a maior comunidade de colecionadores de miniaturas da América',
        'hero.subtitle': 'Vamos construir juntos. Ajude-nos a criar a ferramenta perfeita para sua coleção.',

        // Section Headers
        'section.collection': 'Sua Coleção',
        'section.community': 'Comunidade',
        'section.market': 'Mercado',
        'section.ideal': 'O Ideal',

        // Form Questions
        'form.collectionMethod.label': 'Como você controla sua coleção de miniaturas atualmente?',
        'form.collectionMethod.placeholder': 'Selecione uma opção',
        'form.missingPieces.label': 'O que você usa para ver quais peças faltam durante uma caçada?',
        'form.missingPieces.placeholder': 'Ex. Verifico minha galeria de fotos...',
        'form.duplicateError.label': 'Quando foi a última vez que comprou uma peça repetida por engano? O que aconteceu?',
        'form.showingImportance.label': 'Quão importante é para você mostrar suas peças? (1-5)',
        'form.showingImportance.min': 'Não me interessa',
        'form.showingImportance.max': 'Fundamental',
        'form.listingFrustrations.label': 'O que te frustra nas redes sociais atuais ao compartilhar sua coleção?',
        'form.othersPlatform.label': 'Conhece colecionadores que compartilham fotos constantemente? Onde?',
        'form.priceCheck.label': 'Como você verifica se um preço é justo?',
        'form.transactionDifficulty.label': 'O que foi mais difícil na sua última compra ou venda?',
        'form.priceKnowledge.label': 'Como o desconhecimento do preço influencia sua decisão?',
        'form.noApps.label': 'Se os apps atuais desaparecessem, o que você faria?',
        'form.idealFeature.label': 'Qual função NÃO pode faltar no seu app ideal?',
        'form.idealFeature.placeholder': 'Esta é a pergunta mais importante...',
        'form.idealFeature.required': '*',
        'form.contactInfo.label': 'Interessado em uma entrevista de 10 min? (Deixe seu contato)',
        'form.contactInfo.placeholder': 'Email ou @Instagram',

        // Select Options
        'option.memory': '🧠 Memória',
        'option.excel': '📊 Excel / Google Sheets',
        'option.photos': '📸 Fotos no celular',
        'option.notes': '📝 Notas',
        'option.app': '📱 App genérico',
        'option.none': '❌ Não controlo',

        // Price Check Options
        'price.ebay': 'eBay',
        'price.facebook': 'Grupos FB',
        'price.seller': 'Vendedor',
        'price.experience': 'Experiência',
        'price.other': 'Outro',

        // Buttons & Actions
        'button.submit': 'Enviar e Entrar no Clube',
        'button.submitting': 'Enviando...',

        // Alerts
        'alert.success': 'Obrigado por entrar no clube Troly!',
        'alert.error': 'Houve um erro ao enviar o formulário. Por favor, tente novamente.',

        // Success Page
        'success.title': 'Bem-vindo ao Clube!',
        'success.message': 'Obrigado por fazer parte do Troly. Estamos construindo algo incrível para você.',

        // Footer
        'footer.rights': 'Todos os direitos reservados.',
    }
};

// Available languages configuration
const availableLanguages = [
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'pt', name: 'Português', flag: '🇧🇷' }
];

// Detect browser language
function detectBrowserLanguage() {
    const browserLang = navigator.language || navigator.userLanguage;
    const langCode = browserLang.split('-')[0].toLowerCase();

    // Map browser language to supported languages
    if (langCode === 'pt') return 'pt';
    if (langCode === 'en') return 'en';
    return 'es'; // Default to Spanish
}

// Get current language from localStorage or detect
export function getCurrentLanguage() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && translations[stored]) {
        return stored;
    }
    return detectBrowserLanguage();
}

// Set language and persist to localStorage
export function setLanguage(langCode) {
    if (translations[langCode]) {
        localStorage.setItem(STORAGE_KEY, langCode);
        // Update HTML lang attribute for accessibility
        document.documentElement.lang = langCode;
        return true;
    }
    return false;
}

// Translation function with fallback to Spanish
export function t(key) {
    const currentLang = getCurrentLanguage();
    const translation = translations[currentLang]?.[key];

    // Fallback chain: current lang → Spanish → key itself
    if (translation !== undefined) {
        return translation;
    }

    if (currentLang !== 'es' && translations.es[key] !== undefined) {
        return translations.es[key];
    }

    console.warn(`Missing translation for key: ${key} in language: ${currentLang}`);
    return key;
}

// Get all available languages for the selector
export function getAvailableLanguages() {
    return availableLanguages;
}

// Initialize language on module load
setLanguage(getCurrentLanguage());
