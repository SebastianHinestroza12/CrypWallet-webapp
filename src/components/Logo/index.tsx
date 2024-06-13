import { Flex, Image } from '@chakra-ui/react';
import { LogoIProps } from '../../types/logo';

export const Logo = ({ url, size }: LogoIProps) => {
  return (
    <Flex flex={1} justifyContent={'center'} alignItems={'center'}>
      <Image alt={'Login Image'} objectFit={'cover'} width={size} src={url} />
    </Flex>
  );
};
