import { Box, Text, Flex, useColorModeValue, IconButton, HStack } from '@chakra-ui/react';
import { FooterLink } from '../FooterLink';
import { FiHeart } from 'react-icons/fi';
import { BsGithub, BsLinkedin } from 'react-icons/bs';

export const FooterSection = () => {
  return (
    <Box p="4" borderTop="1px" borderColor={useColorModeValue('gray.200', 'gray.700')}>
      <Flex justifyContent="center" alignItems="center" p={1}>
        <Text fontSize="sm" textAlign="center">
          Hecho con <FiHeart color="red" style={{ display: 'inline' }} size={20} /> por Sebastián
          Mena
        </Text>
      </Flex>
      <HStack justifyContent="center" mt={2} spacing={5} px={2}>
        <FooterLink
          href="https://www.linkedin.com/in/sebastian-mena12/"
          icon={
            <IconButton
              aria-label="Linkedin"
              size="lg"
              isRound={true}
              _hover={{ bg: '#0D74FF' }}
              icon={<BsLinkedin size="28px" />}
            />
          }
          text="LinkedIn"
        />
        <FooterLink
          href="https://github.com/SebastianHinestroza12"
          icon={
            <IconButton
              aria-label="github"
              size="lg"
              isRound={true}
              _hover={{ bg: '#000' }}
              icon={<BsGithub size="28px" />}
            />
          }
          text="GitHub"
        />
      </HStack>
      <Text fontSize="xs" textAlign="center" mt="2">
        © 2024 Sebastián Mena. All rights reserved.
      </Text>
    </Box>
  );
};
