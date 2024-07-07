import {
  Box,
  SimpleGrid,
  Text,
  Flex,
  IconButton,
  useColorModeValue,
  Heading,
  Stack,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { useStoreAutheticated } from '../../../stores/authentication';

export const SafeWords = () => {
  const navigate = useNavigate();
  const bg = useColorModeValue('gray.200', '#151515');
  const boxBg = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.800', 'white');
  const { safeWords } = useStoreAutheticated();

  return (
    <Box p={5} bg={bg} borderRadius="lg" boxShadow="md">
      <Flex justifyContent="space-between" alignItems="center" mb={4}>
        <Heading as="h2" size="lg">
          Safe Words
        </Heading>
        <IconButton
          icon={<Icon icon="mdi:arrow-left" width="24" height="24" />}
          onClick={() => navigate(-1)}
          variant="outline"
          aria-label="Go back"
        />
      </Flex>
      <Stack spacing={4} mb={4}>
        <Text fontSize="md" color={textColor}>
          Estas son tus palabras clave. No las compartas con nadie por cuestiones de seguridad.
        </Text>
      </Stack>
      <SimpleGrid columns={3} spacing={4}>
        {safeWords.map((word, index) => (
          <Box key={index} bg={boxBg} p={3} borderRadius="md" boxShadow="sm" textAlign="center">
            <Text color={textColor} fontSize="lg">
              {word}
            </Text>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};
