import { useState } from 'react';
import { Box, Flex, IconButton, Icon, Text, useColorModeValue } from '@chakra-ui/react';
import { FaHome, FaSearch, FaBell, FaUser } from 'react-icons/fa';

const tabs = [
  { icon: FaHome, label: 'Home', path: '/home' },
  { icon: FaSearch, label: 'Search', path: '/search' },
  { icon: FaBell, label: 'Notifications', path: '/notifications' },
  { icon: FaUser, label: 'Profile', path: '/profile' },
];

export const TabBottomMobile = () => {
  const [selectedTab, setSelectedTab] = useState('/home');

  const handleTabClick = (path: string) => {
    setSelectedTab(path);
  };

  const getIconColor = (path: string) => (selectedTab === path ? '#1e59ea' : 'inherit');

  return (
    <Box
      position="fixed"
      bottom="0"
      left="0"
      width="100%"
      boxShadow="0 -2px 13px rgba(0, 0, 0, 0.1)"
      bg={useColorModeValue('white', '#101010')}
    >
      <Flex justify="space-around" align="center" py="2">
        {tabs.map((tab) => (
          <Flex
            key={tab.path}
            direction="column"
            align="center"
            onClick={() => handleTabClick(tab.path)}
          >
            <IconButton
              icon={<Icon as={tab.icon} color={getIconColor(tab.path)} boxSize={5} />}
              aria-label={tab.label}
              variant="shot"
            />
            <Text fontSize="x-small" color={getIconColor(tab.path)}>
              {tab.label}
            </Text>
          </Flex>
        ))}
      </Flex>
    </Box>
  );
};
