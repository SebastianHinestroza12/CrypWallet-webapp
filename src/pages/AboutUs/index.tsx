import {
  Box,
  Heading,
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
      <Wrap spacing="30px" marginTop={6}>
        <WrapItem width={{ base: '100%', sm: '45%', md: '45%', lg: '30%' }}>
          <Box w="100%">
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
