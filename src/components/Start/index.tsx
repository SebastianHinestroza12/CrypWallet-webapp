/* eslint-disable max-len */
import { Flex, Container, Heading, Stack, Text, Button, Image } from '@chakra-ui/react';
import { Logo } from '../Logo';

export function CallToActionWithIllustration() {
  return (
    <Container maxW={'7xl'}>
      <Stack
        textAlign={'center'}
        align={'center'}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 5, md: 20 }}
      >
        <Logo
          url="https://res.cloudinary.com/dafsjo7al/image/upload/v1717709429/Captura_de_pantalla_2024-06-06_161425-Photoroom_v11dni.png"
          size="60%"
        />
        <Heading
          fontWeight={600}
          fontSize={{ base: '3xl', sm: '4xl', md: '6xl' }}
          lineHeight={'110%'}
        >
          Tu billetera de criptomonedas{' '}
          <Text as={'span'} color={'#daa520'}>
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
            colorScheme="orange"
            px={6}
            bg={'#daa520'}
            _hover={{ bg: '#ffd700' }}
            w={'100%'}
          >
            Empezar
          </Button>
          <Button rounded={'full'} px={6} size={'lg'} fontWeight={'normal'} w={'100%'}>
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
              'https://res.cloudinary.com/dafsjo7al/image/upload/v1718251242/1-removebg-preview_lxqsmo.png'
            }
          />
        </Flex>
      </Stack>
    </Container>
  );
}
