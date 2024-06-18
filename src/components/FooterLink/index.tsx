import { Link, Box } from '@chakra-ui/react';
import { FooterLinkProps } from '../../interfaces';

export const FooterLink = ({ href, icon, text }: FooterLinkProps) => {
  return (
    <Link
      href={href}
      isExternal
      color="blue.500"
      display={'flex'}
      flexDirection={'column'}
      justifyContent={'center'}
      alignItems={'center'}
    >
      <Box>{icon}</Box>
      <Box> {text}</Box>
    </Link>
  );
};
