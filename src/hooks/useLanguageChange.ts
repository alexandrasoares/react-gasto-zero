import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n/config';

/**
 * Hook customizado que força a re-renderização do componente quando o idioma muda.
 * Use este hook em componentes que precisam atualizar suas traduções dinamicamente.
 * 
 * @example
 * const { t } = useLanguageChange();
 */
export const useLanguageChange = () => {
  const { t } = useTranslation();
  const [, forceUpdate] = useState(0);

  useEffect(() => {
    const handleLanguageChange = () => {
      forceUpdate(prev => prev + 1);
    };

    i18n.on('languageChanged', handleLanguageChange);

    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, []);

  return { t };
};
