import { Box, Flex, Icon, Divider } from '@chakra-ui/react';
import { NavItemProps } from '../../interfaces';
import { useNavigate } from 'react-router-dom';

export const NavItem = ({ icon, showDivider, route, children, ...rest }: NavItemProps) => {
  const navigation = useNavigate();

  const handleNavigation = () => {
    if (route) {
      navigation(route);
    }
  };

  return (
    <Box
      as="a"
      href="#"
      style={{ textDecoration: 'none' }}
      _focus={{ boxShadow: 'none' }}
      overflow={'auto'}
    >
      <Flex
        as="div"
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        cursor="pointer"
        _hover={{
          bg: 'gray.900',
          color: 'white',
        }}
        {...rest}
        onClick={handleNavigation}
      >
        {icon && <Icon mr="4" fontSize="16" as={icon} boxSize={6} />}
        {children}
      </Flex>
      {showDivider && <Divider />}
    </Box>
  );
};
