import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Stack,
  Box,
  Grid,
  GridItem,
  Text,
  Button,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { FC } from 'react';
import { ROUTES } from '../../constants';
import { useTranslation } from 'react-i18next';

interface SecurityWordsModalProps {
  isOpen: boolean;
  onClose: () => void;
  dataUser: string[];
  bg: string;
}

export const SecurityWordsModal: FC<SecurityWordsModalProps> = ({
  isOpen,
  onClose,
  dataUser,
  bg,
}) => {
  const { t } = useTranslation();
  return (
    <Modal
      onClose={onClose}
      isOpen={isOpen}
      isCentered
      closeOnOverlayClick={false}
      closeOnEsc={false}
    >
      <ModalOverlay />
      <ModalContent mx={{ base: '5', md: '0' }} bg={bg} maxW={{ md: '80%' }}>
        <ModalHeader>{t('sign_up.modal_safe_words.title')}</ModalHeader>
        <Link to={ROUTES.USER_SIGNIN}>
          <ModalCloseButton />
        </Link>
        <ModalBody>
          <Stack spacing={3}>
            <Box>{t('sign_up.modal_safe_words.description')}</Box>
            <Grid templateColumns={{ base: 'repeat(3, 1fr)', md: 'repeat(4, 1fr)' }} gap={4} mt={4}>
              {dataUser.map((item) => (
                <GridItem key={item}>
                  <Box p={2} borderWidth={1} borderRadius="full">
                    <Text textAlign={'center'}>{item}</Text>
                  </Box>
                </GridItem>
              ))}
            </Grid>
          </Stack>
        </ModalBody>
        <ModalFooter>
          <Link to={ROUTES.USER_SIGNIN}>
            <Button onClick={onClose}>{t('sign_up.modal_safe_words.button_ok')}</Button>
          </Link>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
