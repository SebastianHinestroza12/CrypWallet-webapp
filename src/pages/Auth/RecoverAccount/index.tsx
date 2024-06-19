import { useState } from 'react';
import { Progress, Box, useToast, Container } from '@chakra-ui/react';
import { CheckKeywordForm } from '../../../components/CheckKeywords';
import { VerifyAccountForm } from '../../../components/VerifyEmail';
import { ChangePasswordAccount } from '../../../components/ChangePasswordAccount';

export const RecoverAccountMultistep = () => {
  const toast = useToast();
  const [step, setStep] = useState(3);
  const [progress, setProgress] = useState(33.33);
  console.log(toast, setProgress, setStep);
  return (
    <Container>
      <Box rounded="lg" shadow="1px 1px 3px rgba(0,0,0,0.3)" maxWidth={800} p={6} m="10px auto">
        <Progress hasStripe value={progress} mb="5%" mx="5%" isAnimated></Progress>
        {step === 1 ? (
          <VerifyAccountForm />
        ) : step === 2 ? (
          <CheckKeywordForm />
        ) : (
          <ChangePasswordAccount />
        )}
      </Box>
    </Container>
  );
};
