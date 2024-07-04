import { Flex, Text, VStack } from '@chakra-ui/react';
import { Icon } from '@iconify/react';

export const EmptyState = ({ message = 'No hay criptomonedas para visualizar' }) => {
  return (
    <Flex textAlign="center" py={5} px={6} flexDirection={'column'} alignItems={'center'}>
      <Icon icon="mdi:alert-circle-outline" width="60" height="60" color="gray.500" />
      <VStack mt={3}>
        <Text fontSize="lg">{message}</Text>
        <Text fontSize="md">Por favor, añade algunas criptomonedas para interactuar.</Text>
      </VStack>
    </Flex>
  );
};
