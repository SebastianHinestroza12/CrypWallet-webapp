import { Flex, useColorModeValue, Text } from '@chakra-ui/react';
import { Icon } from '@iconify/react';
import { useStorePaymentMethods } from '../../stores/paymentMethods';
import { PaymentMethodsIprops } from '../../interfaces/paymentMethods';

export const PaymentCard = ({ icon, label, method, color }: PaymentMethodsIprops) => {
  const { selectedPaymentMethod, setPaymentMethods } = useStorePaymentMethods();
  const BG_COLOR = useColorModeValue('#FFF', '#171717');

  return (
    <Flex
      maxWidth={'400px'}
      px={4}
      justifyContent={'space-between'}
      borderWidth="1px"
      width={'full'}
      borderRadius="lg"
      bg={BG_COLOR}
      boxShadow="lg"
      textAlign="center"
      cursor="pointer"
      _hover={{ boxShadow: '2xl', transform: 'scale(1.1)', transition: 'all 0.3s ease-in-out' }}
      onClick={() => setPaymentMethods(method)}
      borderColor={selectedPaymentMethod === method ? '#1e59ea' : 'inherit'}
    >
      <Icon icon={icon} width={70} height={70} color={color} />
      <Text mt={4} fontSize="lg" fontWeight="bold">
        {label}
      </Text>
    </Flex>
  );
};
