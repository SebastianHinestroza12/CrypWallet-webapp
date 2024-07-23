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
import { useToastNotification } from '../../../hooks/useToastNotification';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../constants';

export const ChangePassword = () => {
  const {
    authenticatedUser: { id },
    logoutUser,
  } = useStoreAutheticated();
  const { displayToast } = useToastNotification();
  const navigation = useNavigate();

  const {
    pin,
    borderColorPin,
    handleNumberClick,
    handleDeleteClick,
    handleDeleteAllClick,
    setPin,
  } = usePinInput({
    onComplete: async (pin: string) => {
      try {
        const { status } = await AuthService.forgotPassword(id!, { newPassword: pin });

        if (status === 200) {
          displayToast(
            'Contraseña cambiada correctamente.',
            'Por favor inicia sesión nuevamente.',
            'success',
          );
          setTimeout(() => {
            logoutUser();
            navigation(ROUTES.USER_SIGNIN);
          }, 2000);
        }
      } catch (error) {
        displayToast(
          'Error',
          'Se produjo un error al intentar cambiar la contraseña. Por favor, inténtelo de nuevo más tarde.',
          'error',
        );
      }
    },
  });

  return (
    <Flex flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
      <Stack spacing={6} maxW={'lg'}>
        <Box>
          <Stack spacing={4}>
            <Heading fontSize={'3xl'} textAlign={'center'}>
              Enter New Password
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
              El código de acceso añade una capa adicional de seguridad al usar la aplicación.
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
