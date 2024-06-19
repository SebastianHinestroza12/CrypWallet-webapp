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
} from '@chakra-ui/react';

type FormData = {
  keywords: string[];
};

export const CheckKeywordForm = () => {
  const {
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    setError,
    clearErrors,
  } = useForm<FormData>({
    mode: 'onChange',
  });

  const [keywords, setKeywords] = useState<string[]>([]);
  const [currentKeyword, setCurrentKeyword] = useState('');

  const handleAddKeyword = () => {
    if (keywords.length < 12 && currentKeyword.trim() !== '') {
      setKeywords((prev) => [...prev, currentKeyword.trim()]);
      setCurrentKeyword('');
      clearErrors('keywords');
    } else {
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

  const onSubmit = () => {
    if (keywords.length !== 12) {
      setError('keywords', {
        type: 'manual',
        message: 'Debe ingresar exactamente 12 palabras.',
      });
    } else {
      console.log('Palabras clave para recuperar cuenta:', keywords);
    }
  };

  return (
    <Flex minH="100vh" align="center" justify="center" p={4}>
      <Stack
        spacing={4}
        w="full"
        maxW="md"
        bg={useColorModeValue('white', 'gray.800')}
        rounded="xl"
        boxShadow="2XL"
        p={6}
        my={12}
      >
        <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
          Recupera tu cuenta
        </Heading>
        <Text fontSize={{ base: 'sm', sm: 'md' }} color={useColorModeValue('gray.800', 'gray.400')}>
          Ingresa tus palabras clave en el mismo orden en que se las entregaron.
        </Text>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl id="keywords" isInvalid={!!errors.keywords}>
            <HStack>
              <Input
                placeholder="Ingrese una palabra clave"
                _placeholder={{ color: 'gray.500' }}
                type="text"
                value={currentKeyword}
                onChange={handleKeywordChange}
              />
              <Button
                onClick={handleAddKeyword}
                rounded={'full'}
                bg={'#1E59EA'}
                _hover={{ bg: '#007bff' }}
              >
                Agregar
              </Button>
            </HStack>
            <FormErrorMessage>{errors.keywords?.message}</FormErrorMessage>
          </FormControl>
          <Grid display={'flex'} flexWrap={'wrap'} gap={4} mt={4}>
            {keywords.map((keyword, index) => (
              <GridItem key={index}>
                <Tag
                  size={'ls'}
                  key={index}
                  p={2}
                  borderRadius="full"
                  variant="solid"
                  colorScheme="green"
                >
                  <TagLabel>{keyword}</TagLabel>
                  <TagCloseButton onClick={() => handleRemoveKeyword(keyword)} />
                </Tag>
              </GridItem>
            ))}
          </Grid>
          <Stack spacing={6} mt={6}>
            <Button
              rounded={'full'}
              type="submit"
              bg={'#1E59EA'}
              _hover={{ bg: '#007bff' }}
              color="white"
              isLoading={isSubmitting}
              isDisabled={!isValid || keywords.length !== 12}
            >
              Verificar palabras
            </Button>
          </Stack>
        </form>
      </Stack>
    </Flex>
  );
};
