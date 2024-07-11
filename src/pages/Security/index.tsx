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
          { text: 'Safe Words', icon: 'carbon:view-filled', route: ROUTES.SECURUTY_SECRET_WORDS },
          {
            text: 'Change Password',
            icon: 'ic:sharp-change-circle',
            route: ROUTES.SECURUTY_CHANGE_PASSWORD,
          },
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
              <Box
                onClick={() => navigation(route)}
                _hover={{ transform: 'scale(1.2)', cursor: 'pointer' }}
              >
                <Icon icon={icon} width="30px" height="30px" />
              </Box>
            ) : (
              component
            )}
          </Flex>
        ))}
      </Stack>
    </Box>
  );
};
