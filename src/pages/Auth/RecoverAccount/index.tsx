import { Progress, Box, Flex } from '@chakra-ui/react';
import { CheckKeywordForm } from '../../../components/CheckKeywords';
import { VerifyAccountForm } from '../../../components/VerifyEmail';
import { ChangePasswordAccount } from '../../../components/ChangePasswordAccount';
import { VerifyOtp } from '../../../components/VerifyOTP';
import { useStoreAutheticated } from '../../../stores/authentication';

export const RecoverAccountMultistep = () => {
  const { recoveryStep, recoveryProgress } = useStoreAutheticated();
  return (
    <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <Box width="100%" px={{ base: 4, md: 10 }} py={2}>
        <Progress
          hasStripe
          value={recoveryProgress}
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
        {recoveryStep === 1 ? (
          <VerifyAccountForm />
        ) : recoveryStep === 2 ? (
          <VerifyOtp />
        ) : recoveryStep === 3 ? (
          <CheckKeywordForm />
        ) : (
          <ChangePasswordAccount />
        )}
      </Flex>
    </Box>
  );
};
