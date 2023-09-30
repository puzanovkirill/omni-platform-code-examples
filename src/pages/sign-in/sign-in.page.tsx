import { HStack, Button, Heading, Stack, Icon } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { SignIn } from 'phosphor-react';
import { useTranslation } from 'react-i18next';
import { FormPageLayout } from '../../layouts';
import { PATHNAMES } from '../../consts';
import { SignInFormModule } from './sign-in-form.module';

export function SignInPage() {
  const { t } = useTranslation();
  return (
    <FormPageLayout
      buttons={
        <Button
          id="register-button-sign-in-page"
          as={Link}
          to={PATHNAMES.sign_up}
          variant="outline"
          size="lg"
          fontWeight="normal"
        >
          {t('pages:SignIn.RegisterButton')}
        </Button>
      }
    >
      <Stack spacing={8}>
        <HStack spacing={2}>
          <Icon as={SignIn} w="12" h="12" />
          <Heading fontSize="4xl" fontWeight="normal">
            {t('pages:SignIn.Title')}
          </Heading>
        </HStack>
        <SignInFormModule />
      </Stack>
    </FormPageLayout>
  );
}
