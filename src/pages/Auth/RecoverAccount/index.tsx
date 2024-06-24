/* eslint-disable indent */
import { useEffect, useState } from 'react';
import { Progress, Box, Flex } from '@chakra-ui/react';
import { CheckKeywordForm } from '../../../components/CheckKeywords';
import { VerifyAccountForm } from '../../../components/VerifyEmail';
import { ChangePasswordAccount } from '../../../components/ChangePasswordAccount';
import { Layout } from '../../../components/Layout';

export const RecoverAccountMultistep = () => {
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(33.33);
  console.log(setStep);

  useEffect(() => {
    switch (step) {
      case 1:
        setProgress(33.33);
        break;
      case 2:
        setProgress(66.66);
        break;
      case 3:
        setProgress(100);
        break;
      default:
        setProgress(33.33);
    }
  }, [step]);

  return (
    <Layout>
      <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
        <Box width="100%" px={{ base: 4, md: 10 }} py={4}>
          <Progress
            hasStripe
            value={progress}
            mb="5%"
            isAnimated
            sx={{
              '& > div': {
                backgroundColor: '#1e59ea',
              },
            }}
            height="20px"
          />
        </Box>
        <Flex justifyContent="center" alignItems="center" m={2}>
          {step === 1 ? (
            <VerifyAccountForm />
          ) : step === 2 ? (
            <CheckKeywordForm />
          ) : (
            <ChangePasswordAccount />
          )}
        </Flex>
      </Box>
    </Layout>
  );
};
