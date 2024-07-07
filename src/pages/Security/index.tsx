import { Box, Flex, Heading, Switch, Text, Stack, useColorModeValue } from '@chakra-ui/react';
import { Icon } from '@iconify/react';
import { useSecurityStore } from '../../stores/security';
import { ROUTES } from '../../constants';
import { useNavigate } from 'react-router-dom';

export const SecurityList = () => {
  const { isPassCodeEnabled, togglePassCode } = useSecurityStore();
  const BG = useColorModeValue('gray.200', '#151515');
  const navigation = useNavigate();

  return (
    <Box>
      <Heading as="h1" mb={6} textAlign="center">
        Security Options
      </Heading>
      <Stack spacing={4}>
        {[
          { text: 'Safe Words', icon: 'lucide:view', route: ROUTES.SECURUTY_SECRET_WORDS },
          {
            text: 'Pass Code',
            component: (
              <Switch
                isChecked={isPassCodeEnabled}
                onChange={togglePassCode}
                sx={{
                  '.chakra-switch__track': {
                    backgroundColor: isPassCodeEnabled ? 'green' : '#A0AEC0',
                  },
                  '.chakra-switch__thumb': {
                    backgroundColor: '#FFF',
                  },
                }}
                size="lg"
              />
            ),
          },
        ].map(({ text, icon, component, route }) => (
          <Flex
            key={text}
            justifyContent="space-between"
            bg={BG}
            borderRadius="lg"
            alignItems="center"
            px={2}
            py={3}
            cursor="pointer"
          >
            <Text>{text}</Text>
            {icon ? (
              <Icon icon={icon} width="30px" height="30px" onClick={() => navigation(route)} />
            ) : (
              component
            )}
          </Flex>
        ))}
      </Stack>
    </Box>
  );
};
