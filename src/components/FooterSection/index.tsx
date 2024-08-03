import { Box, Text, useColorModeValue, IconButton, HStack } from '@chakra-ui/react';
import { FooterLink } from '../FooterLink';
import { BsGithub, BsLinkedin } from 'react-icons/bs';
import { useTranslation } from 'react-i18next';

export const FooterSection = () => {
  const BG_COLOR = useColorModeValue('gray.300', '#000');
  const { t } = useTranslation();
  return (
    <Box p="2" borderTop="1px" borderColor={useColorModeValue('gray.300', '#171717')}>
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
              _hover={{ bg: BG_COLOR }}
              icon={<BsGithub size="28px" />}
            />
          }
          text="GitHub"
        />
      </HStack>
      <Text fontSize="small" textAlign="center" mt="2">
        © 2024 Sebastián Mena. {t('footer.duty')}
      </Text>
    </Box>
  );
};
