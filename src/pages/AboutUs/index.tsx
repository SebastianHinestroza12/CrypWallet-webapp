/* eslint-disable max-len */
import {
  Box,
  Heading,
  Image,
  Text,
  Divider,
  Wrap,
  WrapItem,
  useColorModeValue,
  List,
  ListItem,
  ListIcon,
} from '@chakra-ui/react';
import { Tags } from '../../components/Tags';
import { MdCheckCircle } from 'react-icons/md';
import { SERVICES_ABOUT } from '../../constants';

export const AboutUs = () => {
  return (
    <Box>
      <Heading as="h1" mb={6}>
        About CrypWallet
      </Heading>
      <Box
        marginTop={{ base: '1', sm: '5' }}
        display="flex"
        flexDirection={{ base: 'column', sm: 'row' }}
        justifyContent="space-between"
      >
        <Box display="flex" flex="1" marginRight="3" position="relative" alignItems="center">
          <Box
            width={{ base: '100%', sm: '85%' }}
            zIndex="2"
            marginLeft={{ base: '0', sm: '5%' }}
            marginTop="5%"
          >
            <Box textDecoration="none" _hover={{ textDecoration: 'none' }}>
              <Image
                borderRadius="lg"
                src="https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=800&q=80"
                alt="CrypWallet Security"
                objectFit="contain"
              />
            </Box>
          </Box>
          <Box zIndex="1" width="100%" position="absolute" height="100%">
            <Box
              bgGradient={useColorModeValue(
                'radial(orange.600 1px, transparent 1px)',
                'radial(orange.300 1px, transparent 1px)',
              )}
              backgroundSize="20px 20px"
              opacity="0.4"
              height="100%"
            />
          </Box>
        </Box>
        <Box
          display="flex"
          flex="1"
          flexDirection="column"
          justifyContent="center"
          marginTop={{ base: '3', sm: '0' }}
        >
          <Tags tags={['Crypto', 'Security', 'Finance']} />
          <Heading marginTop="1">
            <Text textDecoration="none" _hover={{ textDecoration: 'none' }}>
              CrypWallet: Your Trusted Crypto Wallet
            </Text>
          </Heading>
          <Text
            as="p"
            marginTop="2"
            color={useColorModeValue('gray.700', 'gray.200')}
            fontSize="lg"
          >
            Fundada en 2024 por Sebastian Mena Hinestroza, CrypWallet es una aplicación progresiva
            (PWA) que permite a los usuarios administrar, comprar, vender, transferir y recibir una
            amplia variedad de criptomonedas de manera segura y eficiente.
          </Text>
        </Box>
      </Box>
      <Box marginTop="5">
        <Image
          borderRadius="lg"
          src="https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=800&q=80"
          alt="CrypWallet Features"
          objectFit="contain"
        />
      </Box>
      <Heading as="h2" marginTop="5">
        Why Choose CrypWallet?
      </Heading>
      <Text as="p" fontSize="lg" marginTop="2">
        En CrypWallet, nos tomamos muy en serio la seguridad de tu cuenta y el dinero de nuestros
        usuarios. Ofrecemos:
      </Text>
      <List paddingTop="4" spacing="3">
        {SERVICES_ABOUT.map((service) => (
          <ListItem key={service}>
            <ListIcon as={MdCheckCircle} color="green.500" boxSize={'21px'} />
            {service}
          </ListItem>
        ))}
      </List>
      <Divider marginTop="5" />
      <Wrap spacing="30px" marginTop="5">
        <WrapItem width={{ base: '100%', sm: '45%', md: '45%', lg: '30%' }}>
          <Box w="100%">
            <Box borderRadius="lg" overflow="hidden">
              <Box textDecoration="none" _hover={{ textDecoration: 'none' }}>
                <Image
                  transform="scale(1.0)"
                  src="https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=800&q=80"
                  alt="Crypto Management"
                  objectFit="contain"
                  width="100%"
                  transition="0.3s ease-in-out"
                  _hover={{
                    transform: 'scale(1.05)',
                  }}
                />
              </Box>
            </Box>
            <Tags tags={['Crypto', 'Management']} marginTop={3} />
            <Heading fontSize="xl" marginTop="2">
              <Text textDecoration="none" _hover={{ textDecoration: 'none' }}>
                Manage Your Cryptocurrencies
              </Text>
            </Heading>
            <Text as="p" fontSize="md" marginTop="2">
              Con CrypWallet, puedes administrar todas tus criptomonedas en un solo lugar, con total
              seguridad y facilidad.
            </Text>
          </Box>
        </WrapItem>
        <WrapItem width={{ base: '100%', sm: '45%', md: '45%', lg: '30%' }}>
          <Box w="100%">
            <Box borderRadius="lg" overflow="hidden">
              <Box textDecoration="none" _hover={{ textDecoration: 'none' }}>
                <Image
                  transform="scale(1.0)"
                  src="https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=800&q=80"
                  alt="Secure Transactions"
                  objectFit="contain"
                  width="100%"
                  transition="0.3s ease-in-out"
                  _hover={{
                    transform: 'scale(1.05)',
                  }}
                />
              </Box>
            </Box>
            <Tags tags={['Security', 'Transactions']} marginTop={3} />
            <Heading fontSize="xl" marginTop="2">
              <Text textDecoration="none" _hover={{ textDecoration: 'none' }}>
                Secure Transactions
              </Text>
            </Heading>
            <Text as="p" fontSize="md" marginTop="2">
              Realiza transacciones de compra, venta, transferencia y recepción de criptomonedas de
              forma rápida y segura con CrypWallet.
            </Text>
          </Box>
        </WrapItem>
      </Wrap>
    </Box>
  );
};
