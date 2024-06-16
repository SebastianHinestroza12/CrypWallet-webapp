import { Stack, Image, useColorMode } from '@chakra-ui/react';
import { LogoIProps } from '../../types/logo';

export const Logo = ({ size, styles }: LogoIProps) => {
  const { colorMode } = useColorMode();
  const isDarkMode = colorMode === 'dark';
  const logoUrl = isDarkMode
    ? 'https://res.cloudinary.com/dafsjo7al/image/upload/v1717709429/Captura_de_pantalla_2024-06-06_161425-Photoroom_v11dni.png'
    : 'https://res.cloudinary.com/dafsjo7al/image/upload/v1717709428/Captura_de_pantalla_2024-06-06_161442-Photoroom_vfafpj.png';

  return (
    <Stack className={styles}>
      <Image alt={'Logo App'} boxSize={size} objectFit={'contain'} src={logoUrl} />
    </Stack>
  );
};
