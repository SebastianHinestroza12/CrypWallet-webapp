/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Button,
  FormControl,
  Flex,
  Heading,
  Input,
  Stack,
  Text,
  useColorModeValue,
  FormErrorMessage,
  HStack,
  Grid,
  GridItem,
  Tag,
  TagLabel,
  TagCloseButton,
  Box,
} from '@chakra-ui/react';
import { IoIosAddCircle } from 'react-icons/io';
import { useStoreAutheticated } from '../../stores/authentication';
import { useToastNotification } from '../../hooks/useToastNotification';
import { AuthService } from '../../services/auth.service';

type FormData = {
  keywords: string[];
};

export const CheckKeywordForm = () => {
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    clearErrors,
  } = useForm<FormData>({
    mode: 'onChange',
  });
  const { setRecoveryStep, setRecoreyProgress, userIdRecoveryAccount } = useStoreAutheticated();
  const { displayToast } = useToastNotification();
  const bg = useColorModeValue('gray.100', '#171717');
  const [keywords, setKeywords] = useState<string[]>([]);
  const [currentKeyword, setCurrentKeyword] = useState('');

  const handleAddKeyword = () => {
    if (keywords.length < 12 && currentKeyword.trim() !== '') {
      setKeywords((prev) => [...prev, currentKeyword.trim()]);
      setCurrentKeyword('');
      clearErrors('keywords');
    } else {
      if (keywords.length === 12) {
        setError('keywords', {
          type: 'manual',
          message: 'Has agregado ya 12 palabras. Procede a verificarlas.',
        });

        return;
      }
      setError('keywords', {
        type: 'manual',
        message: 'Debe ingresar exactamente 12 palabras.',
      });
    }
  };

  const handleRemoveKeyword = (keyword: string) => {
    setKeywords((prev) => prev.filter((k) => k !== keyword));
  };

  const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentKeyword(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddKeyword();
    }
  };

  const onSubmit = async () => {
    if (keywords.length !== 12) {
      setError('keywords', {
        type: 'manual',
        message: 'Debe ingresar exactamente 12 palabras.',
      });
    } else {
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        const { status } = await AuthService.checkWords({
          userId: userIdRecoveryAccount!,
          words: keywords,
        });

        if (status === 200) {
          displayToast('Éxito', 'Palabras de seguridad verificadas correctamente.', 'success');
          setTimeout(() => {
            setRecoveryStep(4);
            setRecoreyProgress(100);
          }, 4000);
        }
      } catch (error: any) {
        if (error.code === 'ERR_NETWORK') {
          return displayToast(
            'Error del Servidor',
            'Por favor, inténtalo de nuevo más tarde.',
            'error',
          );
        }
        const { status } = error.response;

        if (status === 400) {
          displayToast(
            'Palabras incorrectas',
            'Las palabras ingresadas no coinciden. Recuerda ingresarlas en el mismo orden en que se te fueron dadas.',
            'error',
          );
        }
      }
    }
  };

  return (
    <Flex align="center">
      <Stack spacing={4} w="full" maxW="md" bg={bg} rounded="xl" boxShadow="2xl" p={6}>
        <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
          Procederemos a verificar tus palabras de seguridad
        </Heading>

        <Text fontSize={{ base: 'sm', sm: 'md' }} color={useColorModeValue('gray.800', 'gray.400')}>
          Ingresa las 12 palabras de seguridad en el mismo orden en que se las entregaron.
        </Text>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl id="keywords" isInvalid={!!errors.keywords}>
            <HStack>
              <Input
                placeholder="Palabra de seguridad"
                _placeholder={{ color: 'gray.500' }}
                type="text"
                onKeyDown={handleKeyDown}
                value={currentKeyword}
                onChange={handleKeywordChange}
              />
              <Box
                onClick={handleAddKeyword}
                _hover={{ transform: 'scale(1.1)', cursor: 'pointer' }}
                transition="transform 0.2s"
              >
                <IoIosAddCircle size={40} color="#1E59EA" />
              </Box>
            </HStack>
            <FormErrorMessage>{errors.keywords?.message}</FormErrorMessage>
          </FormControl>
          <Grid display={'flex'} flexWrap={'wrap'} gap={3} mt={3}>
            {keywords.map((keyword, index) => (
              <GridItem key={index}>
                <Tag
                  size={'ls'}
                  p={2}
                  borderRadius="full"
                  variant="solid"
                  colorScheme="green"
                  maxW="200px"
                  overflow="hidden"
                  whiteSpace="nowrap"
                  textOverflow="ellipsis"
                >
                  <TagLabel>{keyword}</TagLabel>
                  <TagCloseButton onClick={() => handleRemoveKeyword(keyword)} />
                </Tag>
              </GridItem>
            ))}
          </Grid>
          <Stack mt={5}>
            <Button
              rounded="full"
              type="submit"
              bg="#1E59EA"
              _hover={{ bg: '#007bff' }}
              color="white"
              isLoading={isSubmitting}
              isDisabled={keywords.length !== 12}
            >
              Verificar
            </Button>
          </Stack>
        </form>
      </Stack>
    </Flex>
  );
};
