/* eslint-disable max-len */
import { Stack, Image, useColorMode } from '@chakra-ui/react';
import { LogoIProps } from '../../types/logo';

export const Logo = ({ size, styles, withLetters }: LogoIProps) => {
  const { colorMode } = useColorMode();
  const isDarkMode = colorMode === 'dark';
  const logoWithLetters = isDarkMode
    ? 'https://res.cloudinary.com/dafsjo7al/image/upload/v1718591567/Captura_de_pantalla_2024-06-06_161425-removebg-preview_bemzw2.png'
    : 'https://res.cloudinary.com/dafsjo7al/image/upload/v1718591566/Captura_de_pantalla_2024-06-06_161442-removebg-preview_xm1o3z.png';

  const logoWithoutLetters = isDarkMode
    ? 'https://res.cloudinary.com/dafsjo7al/image/upload/v1718589549/Captura_de_pantalla_2024-06-06_155406-removebg-preview_xck7fu.png'
    : 'https://res.cloudinary.com/dafsjo7al/image/upload/v1718589549/Captura_de_pantalla_2024-06-06_161434-removebg-preview_ridorn.png';

  const logo = withLetters ? logoWithLetters : logoWithoutLetters;
  return (
    <Stack className={styles}>
      <Image alt={'Logo App'} boxSize={size} objectFit={'contain'} src={logo} />
    </Stack>
  );
};
