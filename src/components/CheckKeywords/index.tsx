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
    <Flex align="center">
      <Stack
        spacing={4}
        w="full"
        maxW="md"
        bg={useColorModeValue('white', 'gray.800')}
        rounded="xl"
        boxShadow="2xl"
        p={6}
      >
        <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
          Procederemos a verificar tus palabras de seguridad
        </Heading>

        <Text fontSize={{ base: 'sm', sm: 'md' }} color={useColorModeValue('gray.800', 'gray.400')}>
          Ingresa las palabras de seguridad en el mismo orden en que se las entregaron.
        </Text>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl id="keywords" isInvalid={!!errors.keywords}>
            <HStack>
              <Input
                placeholder="Palabra de seguridad"
                _placeholder={{ color: 'gray.500' }}
                type="text"
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
          <Grid display={'flex'} flexWrap={'wrap'} gap={4} mt={4}>
            {keywords.map((keyword, index) => (
              <GridItem key={index} width={'100%'}>
                <Tag
                  size={'ls'}
                  key={index}
                  p={2}
                  borderRadius="full"
                  variant="solid"
                  colorScheme="green"
                >
                  <TagLabel
                    style={{
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {keyword}
                  </TagLabel>
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
              isDisabled={!isValid || keywords.length !== 12}
            >
              Verificar Palabras
            </Button>
          </Stack>
        </form>
      </Stack>
    </Flex>
  );
};
