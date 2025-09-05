import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import translationEN from './locales/en/translation.json';
import translationES from './locales/es/translation.json';

i18n
    // Detecta el idioma del navegador del usuario
    .use(LanguageDetector)
    // Pasa la instancia de i18n a react-i18next.
    .use(initReactI18next)
    // Configuración inicial
    .init({
        debug: true, // Ponlo en 'false' en producción
        fallbackLng: 'es', // Idioma por defecto si el del navegador falla
        interpolation: {
            escapeValue: false, // React ya protege contra XSS
        },
        resources: {
            en: {
                translation: translationEN
            },
            es: {
                translation: translationES
            }
        }
    });

export default i18n;