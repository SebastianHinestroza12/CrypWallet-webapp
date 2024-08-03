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
import { useTranslation } from 'react-i18next';

export const AboutUs = () => {
  const { t } = useTranslation();
  return (
    <Box>
      <Heading as="h1" mb={6}>
        {t('about.title')}
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
          <Tags
            tags={[
              t('about.badge.badge_one.text_one'),
              t('about.badge.badge_one.text_two'),
              t('about.badge.badge_one.text_three'),
            ]}
          />
          <Heading marginTop="1">
            <Text textDecoration="none" _hover={{ textDecoration: 'none' }}>
              {t('about.section_one.title')}
            </Text>
          </Heading>
          <Text
            as="p"
            marginTop="2"
            color={useColorModeValue('gray.700', 'gray.200')}
            fontSize="lg"
          >
            {t('about.section_one.description')}
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
        {t('about.section_two.title')}
      </Heading>
      <Text as="p" fontSize="lg" marginTop="2">
        {t('about.section_two.description')}
      </Text>
      <List paddingTop="4" spacing="3">
        {SERVICES_ABOUT.map((service) => (
          <ListItem key={service.key}>
            <ListIcon as={MdCheckCircle} color="green.500" boxSize={'21px'} />
            {t(`about.section_two.${service.key}`)}
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
            <Tags
              tags={[t('about.badge.badge_two.text_one'), t('about.badge.badge_two.text_two')]}
              marginTop={3}
            />
            <Heading fontSize="xl" marginTop="2">
              <Text textDecoration="none" _hover={{ textDecoration: 'none' }}>
                {t('about.section_three.container_one.title')}
              </Text>
            </Heading>
            <Text as="p" fontSize="md" marginTop="2">
              {t('about.section_three.container_one.description')}
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
            <Tags
              tags={[t('about.badge.badge_three.text_one'), t('about.badge.badge_three.text_two')]}
              marginTop={3}
            />
            <Heading fontSize="xl" marginTop="2">
              <Text textDecoration="none" _hover={{ textDecoration: 'none' }}>
                {t('about.section_three.container_two.title')}
              </Text>
            </Heading>
            <Text as="p" fontSize="md" marginTop="2">
              {t('about.section_three.container_two.description')}
            </Text>
          </Box>
        </WrapItem>
      </Wrap>
    </Box>
  );
};
