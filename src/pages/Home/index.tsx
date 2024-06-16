import { Layout } from '../../components/Layout';
import { Stack } from '@chakra-ui/react';

export const Home = () => {
  return (
    <Stack>
      <Layout>
        <p className="text-2xl font-bold text-center text-blue-500 p-4 bg-gray-100 rounded-lg shadow-md">
          Dios es bueno
        </p>
      </Layout>
    </Stack>
  );
};
