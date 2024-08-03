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
    <Box mb={3}>
      <Heading as="h1" mb={6}>
        {t('about.title')}
      </Heading>
      <Box
        marginTop={{ base: '1', sm: '5' }}
        display="flex"
        flexDirection={{ base: 'column', sm: 'row' }}
        justifyContent="space-between"
      >
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
          src="https://res.cloudinary.com/dafsjo7al/image/upload/v1722709107/iPhone-12-PRO-MAX-localhost_xvijuz.png"
          alt="CrypWallet Security"
          objectFit="contain"
          transition="0.3s ease-in-out"
          _hover={{
            transform: 'scale(1.05)',
          }}
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
                  src="https://res.cloudinary.com/dafsjo7al/image/upload/v1722709317/iPhone-12-PRO-MAX-localhost_1_uwcdq0.png"
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
                  src="https://res.cloudinary.com/dafsjo7al/image/upload/v1722709857/iPhone-12-PRO-MAX-localhost_3_fc9ip2.png"
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
