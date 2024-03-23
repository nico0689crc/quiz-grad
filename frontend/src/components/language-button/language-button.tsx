import { useCallback } from 'react';

import { IconButton } from '@mui/material';
import Iconify from '@/components/iconify';
import { useLocales, useTranslate } from '@/locales';

const LanguageButton = () => {
  const { allLangs, currentLang } = useLocales();
  const { onChangeLang } = useTranslate();

  const onChangeLanguage = useCallback(() => {
    onChangeLang(allLangs.find((language) => language.value !== currentLang.value)?.value ?? currentLang.value);
  }, [allLangs, currentLang]);

  return (
    <IconButton color='primary' onClick={onChangeLanguage}>
      <Iconify icon={currentLang.icon} width={25} />
    </IconButton>
  );
};

export default LanguageButton;
