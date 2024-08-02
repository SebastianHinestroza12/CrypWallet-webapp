import { FC } from 'react';
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
import { NumericKeypad } from '../../../components/NumericKeypad';
import { useStoreAutheticated } from '../../../stores/authentication';
import { AuthService } from '../../../services/auth.service';
import { usePinInput } from '../../../hooks/usePinInput';
import { useTranslation } from 'react-i18next';

interface PassCodePromptProps {
  onSuccess: () => void;
}

export const PassCode: FC<PassCodePromptProps> = ({ onSuccess }) => {
  const {
    authenticatedUser: { email },
  } = useStoreAutheticated();
  const { t } = useTranslation();

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
        const { status } = await AuthService.loginUser({ email: email!, password: pin });

        if (status === 200) {
          setBorderColorPin('green');
          setTimeout(() => onSuccess(), 1500);
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
      <Stack spacing={6} maxW={'lg'}>
        <Box>
          <Stack spacing={4}>
            <Heading fontSize={'3xl'} textAlign={'center'}>
              {t('security_manager.pass_code.title')}
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
                        className={shake ? 'shake' : ''}
                        sx={{
                          borderWidth: '2px',
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
              {t('security_manager.pass_code.description')}
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
