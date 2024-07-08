import {
  Box,
  Center,
  Flex,
  FormControl,
  Heading,
  HStack,
  PinInput,
  PinInputField,
  Stack,
  Text,
} from '@chakra-ui/react';
import { NumericKeypad } from '../NumericKeypad';
import { usePinInput } from '../../hooks/usePinInput';
import { AuthService } from '../../services/auth.service';
import { useStoreAutheticated } from '../../stores/authentication';

export const VerifyOtp = () => {
  const { setRecoveryStep, setRecoreyProgress, userIdRecoveryAccount } = useStoreAutheticated();
  const {
    pin,
    borderColorPin,
    shake,
    setShake,
    setBorderColorPin,
    handleNumberClick,
    handleDeleteClick,
    handleDeleteAllClick,
    resetShake,
    setPin,
  } = usePinInput({
    onComplete: async (pin: string) => {
      try {
        const { status } = await AuthService.verifyOTP({ otp: pin }, userIdRecoveryAccount!);

        if (status === 200) {
          setBorderColorPin('green');
          setTimeout(() => {
            setRecoveryStep(3);
            setRecoreyProgress(75);
          }, 2000);
        }
      } catch (error: unknown) {
        setBorderColorPin('red');
        setShake(true);
        setTimeout(() => {
          resetShake();
        }, 1000);
        setPin('');
      }
    },
  });

  return (
    <Flex flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
      <Stack spacing={6} maxW={'lg'} mx={2}>
        <Box>
          <Stack spacing={4}>
            <Heading fontSize={'3xl'} textAlign={'center'}>
              Verify OTP Code
            </Heading>
            <FormControl>
              <Center>
                <HStack>
                  <PinInput
                    type="number"
                    size={'lg'}
                    value={pin}
                    onChange={setPin}
                    colorScheme="blue"
                    mask
                  >
                    {Array.from({ length: 6 }).map((_, index) => (
                      <PinInputField
                        key={index}
                        readOnly
                        style={{ borderColor: borderColorPin }}
                        type="number"
                        className={shake ? 'shake' : ''}
                        sx={{
                          borderWidth: '4px',
                          borderRadius: 'md',
                          fontSize: '1.7em',
                        }}
                      />
                    ))}
                  </PinInput>
                </HStack>
              </Center>
            </FormControl>
            <Text textAlign={'center'} color={'gray.500'}>
              Enter the OTP code sent to your email for verification.
            </Text>
            <Box>
              <NumericKeypad
                onNumberClick={handleNumberClick}
                onDeleteClick={handleDeleteClick}
                onDeleteAllClick={handleDeleteAllClick}
                isDisabled={false}
              />
            </Box>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};
