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
        <ModalHeader>Palabras de Seguridad</ModalHeader>
        <Link to={'/auth/user-signin'}>
          <ModalCloseButton />
        </Link>
        <ModalBody>
          <Stack spacing={3}>
            <Box>
              A continuación, te proporcionaremos las palabras de seguridad de tu cuenta. Estas
              palabras son cruciales para la recuperación de tu cuenta en caso de que lo necesites.
              Para garantizar la seguridad de tu cuenta, te recomendamos encarecidamente que guardes
              estas palabras en un lugar seguro y no las compartas con nadie bajo ninguna
              circunstancia.
            </Box>
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
          <Link to={'/auth/user-signin'}>
            <Button onClick={onClose}>Entendido</Button>
          </Link>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
