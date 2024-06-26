import { Flex, Text } from '@chakra-ui/react';
import { Layout } from '../../components/Layout';

export const Notifications = () => {
  return (
    <Layout>
      <Flex>
        <Text className="text-2xl font-bold text-center text-blue-500 p-4 bg-gray-100 rounded-lg shadow-md">
          Notifications
        </Text>
      </Flex>
    </Layout>
  );
};
