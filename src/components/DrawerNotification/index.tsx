import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  useDisclosure,
  useColorModeValue,
  DrawerCloseButton,
  Button,
  Stack,
  Text,
  Image,
} from '@chakra-ui/react';
import { Icon } from '@iconify/react';
import { useStoreAutheticated } from '../../stores/authentication';
import { TransactionHistory } from '../TransactionHistory';
import bell from '../../assets/bell-animate.svg';
export const DrawerNotification = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const bg = useColorModeValue('gray.100', '#171717');

  const { sendNotifications } = useStoreAutheticated();

  return (
    <>
      <Button onClick={onOpen} variant="ghost" aria-label="open notification">
        {sendNotifications.length > 0 ? (
          <Image src={bell} alt="Loading..." boxSize={{ base: '27px', md: '32px' }} />
        ) : (
          <Icon icon={'bytesize:bell'} width={22} />
        )}
      </Button>
      <Drawer placement={'right'} onClose={onClose} isOpen={isOpen} size={'xs'}>
        <DrawerOverlay />
        <DrawerContent bg={bg}>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">Notifications</DrawerHeader>
          <DrawerBody>
            {sendNotifications.length > 0 ? (
              <Stack spacing={3}>
                <TransactionHistory transactions={sendNotifications} showRemoveButton={true} />
              </Stack>
            ) : (
              <Stack spacing={3} align="center" justify="center" height="100%">
                <Icon icon="mdi:bell-off-outline" width={50} height={50} />
                <Text fontSize="lg" fontWeight="bold">
                  No notifications yet
                </Text>
                <Text>You're all caught up!</Text>
              </Stack>
            )}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};
