/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Text,
  FormErrorMessage,
} from '@chakra-ui/react';

export const SellCrypto = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const {
    state: { crypto, symbol },
  } = useLocation();

  console.log({ crypto, symbol });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <Box maxW="md" mx="auto" p={6} borderWidth={1} borderRadius="lg" boxShadow="lg">
      <Text fontSize="xl" fontWeight="bold" mb={4}>
        Vender
      </Text>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={4}>
          <FormControl id="amount" isInvalid={!!errors.amount}>
            <FormLabel>Cantidad a vender</FormLabel>
            <Input
              type="number"
              step="any"
              {...register('amount', { required: 'La cantidad es requerida', min: 0.0001 })}
            />
            <FormErrorMessage>{errors.amount?.message?.toString()}</FormErrorMessage>
          </FormControl>

          <Button type="submit" colorScheme="teal" size="lg" fontSize="md">
            Vender
          </Button>
        </Stack>
      </form>
    </Box>
  );
};
