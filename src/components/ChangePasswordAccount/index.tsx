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
  useBreakpointValue,
} from '@chakra-ui/react';
import { NumericKeypad } from '../NumericKeypad';

export const ChangePasswordAccount = () => {
  const [pin, setPin] = useState<string>('');
  const sizePin = useBreakpointValue({ base: true, md: false });

  const handleDeleteClick = () => {
    setPin((prevPin) => prevPin.slice(0, -1));
  };

  const handleDeleteAllClick = () => {
    setPin('');
  };

  const handleNumberClick = (num: number) => {
    setPin((prevPin) => {
      return prevPin + num.toString();
    });
  };

  return (
    <Flex align="center" justify="center" width={{ base: '100%', md: '50%' }}>
      <Stack spacing={6}>
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
                size={sizePin ? 'md' : 'lg'}
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
            onDeleteAllClick={handleDeleteAllClick}
            isDisabled={false}
          />
        </Box>
        <Stack px={10}>
          <Button
            bg="#1e59ea"
            size={'lg'}
            rounded="full"
            color="white"
            _hover={{
              bg: '#007bff',
            }}
          >
            Actualizar Contraseña
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
};
