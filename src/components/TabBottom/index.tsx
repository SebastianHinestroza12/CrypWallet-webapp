import { Box, Flex, IconButton, Icon, Text, useColorModeValue } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useStoreTab } from '../../stores/currentMobileTab';
import { TABS_BOTTOM } from '../../constants';

export const TabBottomMobile = () => {
  const { selectedTab, setSelectedTab } = useStoreTab();
  const navigation = useNavigate();

  const handleTabClick = (path: string) => {
    setSelectedTab(path);
    navigation(path);
  };

  const getIconColor = (path: string) => (selectedTab === path ? '#1e59ea' : 'inherit');

  return (
    <Box
      position="fixed"
      bottom="0"
      left="0"
      width="100%"
      boxShadow="0 -2px 13px rgba(0, 0, 0, 0.1)"
      bg={useColorModeValue('#FFF', '#101010')}
    >
      <Flex justify="space-around" align="center" py="2">
        {TABS_BOTTOM.map((tab) => (
          <Flex
            key={tab.path}
            direction="column"
            align="center"
            onClick={() => handleTabClick(tab.path)}
          >
            <IconButton
              icon={<Icon as={tab.icon} color={getIconColor(tab.path)} boxSize={6} />}
              aria-label={tab.label}
              variant="shot"
            />
            <Text fontSize="small" color={getIconColor(tab.path)}>
              {tab.label}
            </Text>
          </Flex>
        ))}
      </Flex>
    </Box>
  );
};
