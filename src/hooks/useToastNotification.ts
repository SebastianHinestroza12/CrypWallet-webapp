import { useToast, ToastPosition } from '@chakra-ui/react';

export const useToastNotification = () => {
  const toast = useToast();

  const displayToast = (
    title: string,
    description: string,
    status: 'success' | 'error' | 'warning' | 'info',
    duration = 5000,
    isClosable = true,
    position: ToastPosition = 'top-right',
  ) => {
    toast({
      title,
      description,
      status,
      duration,
      position,
      isClosable,
    });
  };

  return { displayToast };
};
