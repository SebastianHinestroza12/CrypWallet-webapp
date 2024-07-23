import {
  Flex,
  Heading,
  Stack,
  Text,
  Button,
  Image,
  Container,
  useBreakpointValue,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { ROUTES } from '../../constants';

export function CallToActionWithIllustration() {
  const navigation = useNavigate();
  const sizeLogo = useBreakpointValue({ base: 150, md: 200 });
  return (
    <Container maxW={'7xl'}>
      <Stack
        textAlign={'center'}
        align={'center'}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 3, md: 15 }}
      >
        <Flex justifyContent={'center'} alignItems={'center'} flexDirection={'column'}>
          <Icon icon={'mingcute:safe-shield-2-fill'} width={sizeLogo} color="#1e59ea" />
        </Flex>
        <Heading
          fontWeight={600}
          fontSize={{ base: '3xl', sm: '5xl', md: '7xl' }}
          lineHeight={'110%'}
        >
          <Text as={'span'} color={'#1E59EA'} fontSize={{ base: '3xl', sm: '5xl', md: '7xl' }}>
            Cryp wallet
          </Text>
          , tu billetera de criptomonedas{' '}
          <Text as={'span'} color={'#1E59EA'}>
            fácil y segura
          </Text>
        </Heading>
        <Text color={'gray.500'} maxW={'3xl'}>
          Nunca pierdas una transacción. Mantén el control de tus criptomonedas y recibe
          notificaciones inteligentes en los momentos adecuados. Administra tu “Agenda Diaria” de
          criptomonedas cada mañana.
        </Text>
        <Stack
          spacing={{ base: 4, sm: 6 }}
          direction={{ base: 'column', sm: 'row' }}
          w={{ base: '100%', sm: '60%' }}
        >
          <Button
            rounded={'full'}
            size={'lg'}
            fontWeight={'normal'}
            px={6}
            color={'#FFF'}
            bg={'#1E59EA'}
            _hover={{ bg: '#007bff' }}
            w={'100%'}
            onClick={() => navigation(ROUTES.HOME)}
          >
            Empezar
          </Button>
          <Button
            onClick={() => navigation(ROUTES.ABOUT_US)}
            rounded={'full'}
            px={6}
            size={'lg'}
            fontWeight={'normal'}
            w={'100%'}
          >
            Saber más
          </Button>
        </Stack>
        <Flex w={'full'} justifyContent={'center'} alignItems={'center'}>
          <Image
            height={{ base: '100%', sm: '24rem', lg: '28rem' }}
            mt={{ base: 1, sm: 16 }}
            alt={'Login Image'}
            objectFit={'cover'}
            src={
              'https://res.cloudinary.com/dafsjo7al/image/upload/v1718577990/1-removebg-preview_zthfzk.png'
            }
          />
        </Flex>
      </Stack>
    </Container>
  );
}
