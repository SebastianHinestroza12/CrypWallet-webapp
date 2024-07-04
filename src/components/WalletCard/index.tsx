import { Box, Flex, Text, IconButton } from '@chakra-ui/react';
import { Icon } from '@iconify/react';

export const WalletCard = ({ name }: { name: string }) => {
  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      p={2}
      borderWidth={1}
      borderRadius="md"
      boxShadow="sm"
      mb={4}
      position="relative"
    >
      <Box display="flex" alignItems="center">
        <Box position="relative" display="inline-block" mr={2}>
          <Icon icon="mdi:safe" width="40" height="40" />
          <Box
            position="absolute"
            top="-5px"
            right="-5px"
            bg="green.400"
            borderRadius="full"
            p="2px"
          >
            <Icon icon="mdi:check-bold" color="white" width="16" height="16" />
          </Box>
        </Box>
        <Text fontSize="lg">{name}</Text>
      </Box>
      <IconButton
        aria-label="Options"
        icon={<Icon icon="mdi:dots-vertical" width="24" height="24" />}
        variant="ghost"
      />
    </Flex>
  );
};