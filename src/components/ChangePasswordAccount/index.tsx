import { useState } from 'react';
import {
  Button,
  FormControl,
  Flex,
  PinInput,
  PinInputField,
  Stack,
  Center,
  Heading,
  HStack,
  Box,
} from '@chakra-ui/react';
import { NumericKeypad } from '../NumericKeypad';

export const ChangePasswordAccount = () => {
  const [pin, setPin] = useState<string>('');

  const handleDeleteClick = () => {
    setPin((prevPin) => prevPin.slice(0, -1));
  };

  const handleFingerprintClick = () => {
    console.log('Fingerprint clicked');
  };

  const handleNumberClick = (num: number) => {
    setPin((prevPin) => {
      return prevPin + num.toString();
    });
  };

  return (
    <Flex minH="100vh" align="center" justify="center">
      <Stack spacing={4} w="full" maxW="sm" p={6} my={10}>
        <Center>
          <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }} textAlign="center">
            Has verificado tu cuenta correctamente, ahora procede a cambiar tu contraseña.
          </Heading>
        </Center>
        <FormControl>
          <Center>
            <HStack>
              <PinInput
                type="number"
                size="lg"
                value={pin}
                onChange={setPin}
                colorScheme="blue"
                onComplete={() => console.log('PIN completo')}
              >
                {Array.from({ length: 6 }).map((_, index) => (
                  <PinInputField key={index} readOnly style={{ borderColor: '#1e59ea' }} />
                ))}
              </PinInput>
            </HStack>
          </Center>
        </FormControl>
        <Box>
          <NumericKeypad
            onNumberClick={handleNumberClick}
            onDeleteClick={handleDeleteClick}
            onFingerprintClick={handleFingerprintClick}
            isDisabled={false}
          />
        </Box>
        <Stack spacing={6}>
          <Button
            bg="blue.400"
            rounded="full"
            color="white"
            _hover={{
              bg: 'blue.500',
            }}
          >
            Actualizar Contraseña
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
};
