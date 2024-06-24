import { Layout } from '../../components/Layout';
import { Box, Flex, Stack } from '@chakra-ui/react';
import { SearchBar } from '../../components/SearchBar';
import { OperationButton } from '../../components/OperationButton';
import { GiShoppingBag } from 'react-icons/gi';
import { RiExchangeDollarLine } from 'react-icons/ri';
import { IoIosSend } from 'react-icons/io';
import { MdOutlineCallReceived } from 'react-icons/md';

export const Home = () => {
  return (
    <Layout>
      <Stack px={2} spacing={7}>
        <Box>
          <SearchBar />
        </Box>
        <Flex justifyContent={'space-between'}>
          <OperationButton icon={GiShoppingBag} text="buy" />
          <OperationButton icon={RiExchangeDollarLine} text="exchange" />
          <OperationButton icon={IoIosSend} text="send" />
          <OperationButton icon={MdOutlineCallReceived} text="receive" />
        </Flex>
      </Stack>
    </Layout>
  );
};
