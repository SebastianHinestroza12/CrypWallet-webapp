import { Box, Flex, Icon, Divider } from '@chakra-ui/react';
import { NavItemProps } from '../../interfaces';

export const NavItem = ({ icon, showDivider, children, ...rest }: NavItemProps) => {
  return (
    <Box as="a" href="#" style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
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
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
      {showDivider && <Divider />}
    </Box>
  );
};
