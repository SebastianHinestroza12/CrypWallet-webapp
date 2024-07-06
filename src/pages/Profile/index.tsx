import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Avatar,
  AvatarBadge,
  IconButton,
  Center,
  useToast,
} from '@chakra-ui/react';
import { SmallCloseIcon } from '@chakra-ui/icons';
import { useStoreAutheticated } from '../../stores/authentication';
import { useForm } from 'react-hook-form';
import { UserProps } from '../../interfaces';
import { AuthService } from '../../services/auth.service';

export const UserProfileEdit = () => {
  const { authenticatedUser, authenticateUser } = useStoreAutheticated();
  const { id, name, lastName, email } = authenticatedUser;
  const toast = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name,
      lastName,
      email,
    },
  });

  const onSubmit = async (data: UserProps) => {
    // Simular una demora de 2 segundos, para que no sea tan rapido la actualizacion.
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const {
      status,
      data: { user },
    } = await AuthService.updateProfile(data, id!);

    if (status === 200) {
      toast({
        title: 'Actualización exitosa',
        description: 'Los datos del usuario han sido actualizados correctamente.',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });

      //Actualizar los datos del estado global
      authenticateUser({
        id: user.id,
        name: user.name,
        lastName: user.lastName,
        email: user.email,
      });
    } else {
      toast({
        title: 'Error al actualizar los datos',
        description: 'Hubo un problema al actualizar los datos del usuario.',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
    }
  };

  return (
    <Flex justifyContent={'center'} alignItems={'center'}>
      <Stack spacing={4} w={'full'} maxW={'lg'} rounded={'xl'} boxShadow={'2xl'} p={3} mx={2}>
        <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }} mb={2} textAlign={'center'}>
          User Profile
        </Heading>
        <FormControl id="avatar">
          <Stack direction={['column', 'row']} spacing={6}>
            <Center>
              <Avatar size="xl" src="https://bit.ly/sage-adebayo">
                <AvatarBadge
                  as={IconButton}
                  size="sm"
                  rounded="full"
                  top="-10px"
                  colorScheme="red"
                  aria-label="remove Image"
                  icon={<SmallCloseIcon />}
                />
              </Avatar>
            </Center>
            <Center w="full">
              <Button w="full">Change Icon</Button>
            </Center>
          </Stack>
        </FormControl>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={5}>
            <FormControl id="name" isRequired>
              <FormLabel>Name</FormLabel>
              <Input
                placeholder="Name"
                {...register('name', {
                  required: 'El nombre es obligatorio',
                  minLength: {
                    value: 3,
                    message: 'Mínimo 3 caracteres',
                  },
                  maxLength: {
                    value: 20,
                    message: 'Máximo 20 caracteres',
                  },
                  pattern: {
                    value: /^[a-zA-ZÀ-ÿ]+(?: [a-zA-ZÀ-ÿ]+)*$/,
                    message: 'Solo se permiten letras y no se permiten espacios en blanco.',
                  },
                })}
                _placeholder={{ color: 'gray.500' }}
                type="text"
              />
              {errors.name && <p>{errors.name.message}</p>}
            </FormControl>
            <FormControl id="lastName" isRequired>
              <FormLabel>Last Name</FormLabel>
              <Input
                placeholder="Last Name"
                {...register('lastName', {
                  required: 'El apellido es obligatorio',
                  minLength: {
                    value: 3,
                    message: 'Mínimo 3 caracteres',
                  },
                  maxLength: {
                    value: 20,
                    message: 'Máximo 20 caracteres',
                  },
                  pattern: {
                    value: /^[a-zA-ZÀ-ÿ]+(?: [a-zA-ZÀ-ÿ]+)*$/,
                    message: 'Solo se permiten letras y no se permiten espacios en blanco.',
                  },
                })}
                _placeholder={{ color: 'gray.500' }}
                type="text"
              />
              {errors.lastName && <p>{errors.lastName.message}</p>}
            </FormControl>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input
                placeholder="your-email@example.com"
                disabled
                {...register('email', {
                  required: 'El correo electrónico es obligatorio',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: 'No es un correo electrónico válido',
                  },
                })}
                _placeholder={{ color: 'gray.500' }}
                type="email"
              />
              {errors.email && <p>{errors.email.message}</p>}
            </FormControl>
            <Button
              mt={2}
              bg={'blue.400'}
              color={'white'}
              isLoading={isSubmitting}
              w="full"
              _hover={{
                bg: 'blue.500',
              }}
              type="submit"
            >
              Submit
            </Button>
          </Stack>
        </form>
      </Stack>
    </Flex>
  );
};
