import { m } from 'framer-motion';

import { Button, Stack, Typography } from '@mui/material';

import HeroIllustration from '@/components/illustrations/componentes/hero-illustration';
import { paths } from '@/routes/paths';
import { useTranslate } from '@/locales';
import { RouterLink } from '@/routes/components';
import { varBounce, varFade } from '@/components/animate';

export default function Hero() {
  const { t } = useTranslate();
  return (
    <Stack className='Hero' flexGrow={1} alignItems='center' direction={{ xs: 'column', md: 'row' }} spacing={5}>
      <Stack justifyContent='center' alignItems='center' flexGrow={{ xs: 0, md: 1 }} spacing={3}>
        <m.div {...varFade({ durationIn: 0.75 }).inUp}>
          <Typography sx={{ textAlign: 'center' }} variant='h2'>
            {t('home.hero.title')}
          </Typography>
        </m.div>
        <m.div {...varFade({ durationIn: 1 }).inUp}>
          <Typography sx={{ textAlign: 'center' }} variant='body1' maxWidth={{ xs: 'inheret', md: '600px' }} px={2}>
            {t('home.hero.body')}
          </Typography>
        </m.div>
        <m.div {...varBounce({ durationIn: 3 }).in}>
          <Button
            variant='contained'
            component={RouterLink}
            href={paths.quizes.root}
            size='large'
            sx={{ borderRadius: 10, px: 10 }}
          >
            <Typography noWrap variant='button'>
              {t('home.hero.get_started_label')}
            </Typography>
          </Button>
        </m.div>
      </Stack>
      <Stack
        justifyContent='center'
        sx={{ width: { xs: '100%', sm: '70%' }, maxWidth: '700px', flexGrow: { xs: 1, md: 0 } }}
      >
        <m.div {...varBounce({ durationIn: 1 }).in}>
          <HeroIllustration />
        </m.div>
      </Stack>
    </Stack>
  );
}
