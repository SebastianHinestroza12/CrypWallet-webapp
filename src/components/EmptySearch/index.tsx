import { Box, Text, Center, Icon } from '@chakra-ui/react';
import { MdOutlineSearchOff } from 'react-icons/md';

export const EmptySearch = () => {
  return (
    <Center flexDirection="column" p={4}>
      <Box p={6} textAlign="center">
        <Icon as={MdOutlineSearchOff} boxSize="60px" mb={4} />
        <Text fontSize="lg">No se encontraron coincidencias</Text>
        <Text fontSize="sm" mt={2}>
          Intenta ajustar los términos de búsqueda o verifica tus filtros.
        </Text>
      </Box>
    </Center>
  );
};
