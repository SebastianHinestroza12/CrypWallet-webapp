import { Flex, Container, Heading, Stack, Text, Button, Image } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { Logo } from '../../components/Logo';

export function CallToActionWithIllustration() {
  const navigation = useNavigate();
  const handleNavigation = (route: string) => {
    navigation(route);
  };

  return (
    <Container maxW={'7xl'}>
      <Stack
        textAlign={'center'}
        align={'center'}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 3, md: 20 }}
      >
        <Logo size="67%" styles="d-flex items-center justify-center" withLetters />
        <Heading
          fontWeight={600}
          fontSize={{ base: '3xl', sm: '4xl', md: '6xl' }}
          lineHeight={'110%'}
        >
          Tu billetera de criptomonedas{' '}
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
            onClick={() => handleNavigation('/home')}
          >
            Empezar
          </Button>
          <Button
            onClick={() => handleNavigation('/about-us')}
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
