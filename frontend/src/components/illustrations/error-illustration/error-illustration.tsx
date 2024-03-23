'use client';

import { Button, Stack } from '@mui/material';

import { useTranslate } from '@/locales';

import { RouterLink } from '@/routes/components';
import { paths } from '@/routes/paths';

import { IllustrationContainer, PageErrorIllustration } from '@/components/illustrations';

const ErrorIllustration = () => {
  const { t } = useTranslate();

  return (
    <Stack justifyContent='center' alignItems='center' flexGrow={1}>
      <IllustrationContainer
        illustration={<PageErrorIllustration />}
        title={t('common.labels.something_went_wrong')}
        subTitle={t('common.labels.something_went_wrong_2')}
        caButton={
          <Button component={RouterLink} href={paths.home} size='large' color='primary' variant='contained'>
            {t('common.labels.not_found_cabutton_home')}
          </Button>
        }
      />
    </Stack>
  );
};

export default ErrorIllustration;
