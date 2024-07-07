import { useState, FC } from 'react';
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

interface PassCodePromptProps {
  onSuccess: () => void;
}

export const PassCode: FC<PassCodePromptProps> = ({ onSuccess }) => {
  const [pin, setPin] = useState<string>('');
  const [borderColorPin, setBorderColorPin] = useState('#1e59ea');
  const [shake, setShake] = useState<boolean>(false);
  const {
    authenticatedUser: { email },
  } = useStoreAutheticated();

  const handleNumberClick = (num: number) => {
    setPin((prevPin) => {
      const newPin = prevPin + num.toString();
      if (newPin.length === 6) {
        handleLoginAttempt(newPin);
      } else {
        setBorderColorPin('#1e59ea');
      }
      return newPin.length <= 6 ? newPin : prevPin;
    });
  };

  const handleLoginAttempt = async (pin: string) => {
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
        setShake(false);
        setBorderColorPin('#1e59ea');
      }, 1000);
      setPin('');
    }
  };

  const handleDeleteClick = () => {
    setPin((prevPin) => prevPin.slice(0, -1));
    setBorderColorPin('#1e59ea');
  };

  const handleDeleteAllClick = () => {
    setPin('');
  };

  return (
    <Flex flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
      <Stack spacing={6} maxW={'lg'} mx={2}>
        <Box>
          <Stack spacing={4}>
            <Heading fontSize={'3xl'} textAlign={'center'}>
              Enter passcode
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
