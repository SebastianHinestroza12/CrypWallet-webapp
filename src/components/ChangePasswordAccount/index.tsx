import {
  FormControl,
  Flex,
  PinInput,
  PinInputField,
  Stack,
  Center,
  Heading,
  HStack,
  Box,
  useBreakpointValue,
} from '@chakra-ui/react';
import { NumericKeypad } from '../NumericKeypad';
import { usePinInput } from '../../hooks/usePinInput';
import { AuthService } from '../../services/auth.service';
import { useToastNotification } from '../../hooks/useToastNotification';
import { useStoreAutheticated } from '../../stores/authentication';
import { ROUTES } from '../../constants';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const ChangePasswordAccount = () => {
  const sizePin = useBreakpointValue({ base: true, md: false });
  const { displayToast } = useToastNotification();
  const { t } = useTranslation();
  const { userIdRecoveryAccount, logoutUser } = useStoreAutheticated();
  const navigation = useNavigate();
  const { pin, handleNumberClick, handleDeleteClick, handleDeleteAllClick, setPin } = usePinInput({
    onComplete: async (pin: string) => {
      try {
        const { status } = await AuthService.forgotPassword(userIdRecoveryAccount!, {
          newPassword: pin,
        });

        if (status === 200) {
          logoutUser();
          displayToast(
            t('recover_account.step_four.alert_step.alert_one.title'),
            t('recover_account.step_four.alert_step.alert_one.description'),
            'success',
          );
          setTimeout(() => navigation(ROUTES.USER_SIGNIN), 2000);
        }
      } catch (error: unknown) {
        setPin('');
        displayToast(
          t('recover_account.step_four.alert_step.alert_two.title'),
          t('recover_account.step_four.alert_step.alert_two.description'),
          'error',
        );
      }
    },
  });

  return (
    <Flex align="center" justify="center" width={{ base: '100%', md: '50%' }}>
      <Stack spacing={6}>
        <Center>
          <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }} textAlign="center">
            {t('recover_account.step_four.title')}
          </Heading>
        </Center>
        <FormControl>
          <Center>
            <HStack>
              <PinInput
                type="number"
                size={sizePin ? 'md' : 'lg'}
                value={pin}
                onChange={setPin}
                colorScheme="blue"
                onComplete={() => console.log('PIN completo')}
              >
                {Array.from({ length: 6 }).map((_, index) => (
                  <PinInputField
                    type="number"
                    key={index}
                    readOnly
                    style={{ borderColor: '#1e59ea' }}
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
        <Box>
          <NumericKeypad
            onNumberClick={handleNumberClick}
            onDeleteClick={handleDeleteClick}
            onDeleteAllClick={handleDeleteAllClick}
            isDisabled={false}
          />
        </Box>
      </Stack>
    </Flex>
  );
};
