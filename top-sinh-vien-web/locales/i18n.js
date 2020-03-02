import i18n from 'i18next';
import vi_language from './vi';

i18n.init({
  // we init with resources
  resources: {
    vi: {
      translations: vi_language
    }
  },
  lng: 'vi',
  fallbackLng: 'en',
  debug: false,

  // have a common namespace used around the full app
  ns: ['translations'],
  defaultNS: 'translations',
  interpolation: {
    escapeValue: false, // not needed for react!!
    formatSeparator: ','
  },
  react: {
    wait: true
  }
});

export default i18n;
