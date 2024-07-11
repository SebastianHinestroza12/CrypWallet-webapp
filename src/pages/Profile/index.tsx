import { ChangeEvent, useState, useRef } from 'react';
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
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useColorModeValue,
} from '@chakra-ui/react';
import { SmallCloseIcon } from '@chakra-ui/icons';
import { useStoreAutheticated } from '../../stores/authentication';
import { useForm } from 'react-hook-form';
import { UserProps } from '../../interfaces';
import { AuthService } from '../../services/auth.service';
import { useToastNotification } from '../../hooks/useToastNotification';
import axios from 'axios';

const { VITE_KEY_UPLOAD_PRESET } = import.meta.env;

export const UserProfileEdit = () => {
  const { authenticatedUser, authenticateUser, avatarUrl, setAvatarUrl } = useStoreAutheticated();
  const { id, name, lastName, email } = authenticatedUser;
  const { displayToast } = useToastNotification();
  const [isLoading, setIsLoading] = useState(false);
  const avatarDefault =
    'https://res.cloudinary.com/dwbytrdzg/image/upload/v1720594871/default-avatar_pnnlf2.png';
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const cancelRef = useRef<HTMLButtonElement>(null);
  const BG_COLOR = useColorModeValue('#FFF', '#171717');

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

  const handleImageUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (!files || files.length === 0) {
      const errorMessage = !files
        ? 'No se pudo acceder a los archivos. Por favor, intente nuevamente.'
        : 'No se seleccionó ningún archivo. Por favor, seleccione un archivo y vuelva a intentarlo.';

      displayToast('Error al subir la imagen', errorMessage, 'error');
      return;
    }

    const formData = new FormData();
    formData.append('file', files[0]);
    formData.append('upload_preset', VITE_KEY_UPLOAD_PRESET);

    try {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      const {
        data: { secure_url },
      } = await axios.post('https://api.cloudinary.com/v1_1/dwbytrdzg/image/upload', formData);
      setIsLoading(false);
      setAvatarUrl(secure_url, true);
      displayToast(
        'Imagen subida correctamente',
        'La imagen de tu avatar ha sido actualizada correctamente.',
        'success',
      );
    } catch (error) {
      setIsLoading(false);
      displayToast(
        'Error al subir la imagen',
        'Hubo un problema al subir la imagen de tu avatar.',
        'error',
      );
    }
  };

  const onSubmit = async (data: UserProps) => {
    // Simular una demora de 2 segundos, para que no sea tan rapido la actualizacion.
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const {
      status,
      data: { user },
    } = await AuthService.updateProfile(data, id!);

    if (status === 200) {
      displayToast(
        'Actualización exitosa',
        'Los datos del usuario han sido actualizados correctamente.',
        'success',
      );
      //Actualizar los datos del estado global
      authenticateUser({
        id: user.id,
        name: user.name,
        lastName: user.lastName,
        email: user.email,
      });
    } else {
      displayToast(
        'Error al actualizar los datos',
        'Hubo un problema al actualizar los datos del usuario.',
        'error',
      );
    }
  };

  const handleRemoveAvatar = () => {
    if (avatarUrl === avatarDefault) {
      displayToast('¡Info!', 'No puedes eliminar la imagen predeterminada del avatar.', 'warning');
      return;
    }

    setIsDialogOpen(true);
  };

  const confirmRemoveAvatar = () => {
    setAvatarUrl(avatarDefault, true);
    displayToast('Éxito', 'Imagen eliminada correctamente.', 'success');
    setIsDialogOpen(false);
  };

  return (
    <Flex justifyContent={'center'} alignItems={'center'} pb={3}>
      <Stack
        spacing={4}
        w={'full'}
        maxW={'lg'}
        rounded={'xl'}
        boxShadow={'2xl'}
        p={5}
        bg={BG_COLOR}
      >
        <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }} mb={2} textAlign={'center'}>
          Profile
        </Heading>
        <FormControl id="avatar">
          <Stack direction={['column', 'row']} spacing={6}>
            <Center>
              <Avatar size="xl" src={avatarUrl}>
                <AvatarBadge
                  as={IconButton}
                  onClick={handleRemoveAvatar}
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
              <Input
                type="file"
                accept="image/*"
                name="file"
                display={'none'}
                onChange={handleImageUpload}
                id="file-upload"
              />
              <FormLabel htmlFor="file-upload" w="full">
                <Button as="span" w="full" isLoading={isLoading}>
                  Change Picture
                </Button>
              </FormLabel>
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
              bg={'#1e59ea'}
              color={'white'}
              isLoading={isSubmitting}
              w="full"
              _hover={{
                bg: 'blue.500',
              }}
              type="submit"
            >
              Save
            </Button>
          </Stack>
        </form>
      </Stack>

      <AlertDialog
        isOpen={isDialogOpen}
        leastDestructiveRef={cancelRef}
        onClose={() => setIsDialogOpen(false)}
      >
        <AlertDialogOverlay display="flex" justifyContent="center" alignItems="center">
          <AlertDialogContent
            bg={BG_COLOR}
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
            maxWidth="xs"
            mx="auto"
            boxShadow={'2xl'}
          >
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Eliminar Avatar
            </AlertDialogHeader>

            <AlertDialogBody>
              ¿Estás seguro de que deseas eliminar la imagen de tu perfil?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={() => setIsDialogOpen(false)}>
                Cancelar
              </Button>
              <Button colorScheme="red" onClick={confirmRemoveAvatar} ml={3}>
                Eliminar
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Flex>
  );
};
