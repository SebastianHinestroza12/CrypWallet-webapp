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
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

const MotionStack = motion(Stack);

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
  const { t } = useTranslation();

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
        ? t('profile.alert_profile.upload_image.alert_one.description_one')
        : t('profile.alert_profile.upload_image.alert_one.description_two');

      displayToast(t('profile.alert_profile.upload_image.alert_one.title'), errorMessage, 'error');
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
        t('profile.alert_profile.upload_image.alert_two.title'),
        t('profile.alert_profile.upload_image.alert_two.description'),
        'success',
      );
    } catch (error) {
      setIsLoading(false);
      displayToast(
        t('profile.alert_profile.upload_image.alert_three.title'),
        t('profile.alert_profile.upload_image.alert_three.description'),
        'error',
      );
    }
  };

  const onSubmit = async (data: UserProps) => {
    if (data.name === name && data.lastName === lastName) {
      displayToast(
        t('profile.alert_profile.on_submit.alert_one.title'),
        t('profile.alert_profile.on_submit.alert_one.description'),
        'warning',
      );
      return;
    }

    // Simular una demora de 2 segundos, para que no sea tan rapido la actualizacion.
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const {
      status,
      data: { user },
    } = await AuthService.updateProfile(data, id!);

    if (status === 200) {
      displayToast(
        t('profile.alert_profile.on_submit.alert_two.title'),
        t('profile.alert_profile.on_submit.alert_two.description'),
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
        t('profile.alert_profile.on_submit.alert_three.title'),
        t('profile.alert_profile.on_submit.alert_three.description'),
        'error',
      );
    }
  };

  const handleRemoveAvatar = () => {
    if (avatarUrl === avatarDefault) {
      displayToast(
        t('profile.alert_profile.remove_avatar.alert_one.title'),
        t('profile.alert_profile.remove_avatar.alert_one.description'),
        'warning',
      );
      return;
    }

    setIsDialogOpen(true);
  };

  const confirmRemoveAvatar = () => {
    setAvatarUrl(avatarDefault, true);
    displayToast(
      t('profile.alert_profile.confirm_remove.alert_one.title'),
      t('profile.alert_profile.confirm_remove.alert_one.description'),
      'success',
    );
    setIsDialogOpen(false);
  };

  return (
    <Flex justifyContent={'center'} alignItems={'center'} pb={3}>
      <MotionStack
        spacing={4}
        w={'full'}
        maxW={'lg'}
        rounded={'xl'}
        boxShadow={'2xl'}
        p={5}
        bg={BG_COLOR}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }} mb={2} textAlign={'center'}>
          {t('profile.title')}
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
                <Button as="span" w="full" isLoading={isLoading} textTransform={'capitalize'}>
                  {t('profile.change_picture')}
                </Button>
              </FormLabel>
            </Center>
          </Stack>
        </FormControl>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={5}>
            <FormControl id="name" isRequired>
              <FormLabel>{t('profile.input_name')}</FormLabel>
              <Input
                placeholder={t('profile.input_name')}
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
              <FormLabel textTransform={'capitalize'}>{t('profile.input_last_name')}</FormLabel>
              <Input
                placeholder={t('profile.input_last_name')}
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
              <FormLabel textTransform={'capitalize'}>{t('profile.input_email')}</FormLabel>
              <Input
                placeholder="email@example.com"
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
              {t('profile.button_save')}
            </Button>
          </Stack>
        </form>
      </MotionStack>

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
              {t('profile.overlay_dialog.text_header')}
            </AlertDialogHeader>

            <AlertDialogBody>{t('profile.overlay_dialog.text_body')}</AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={() => setIsDialogOpen(false)}>
                {t('profile.overlay_dialog.button_cancel')}
              </Button>
              <Button colorScheme="red" onClick={confirmRemoveAvatar} ml={3}>
                {t('profile.overlay_dialog.button_confirm')}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Flex>
  );
};
