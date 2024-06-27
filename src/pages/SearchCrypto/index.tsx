import { useState, ChangeEvent } from 'react';
import { ListCrypto } from '../../components/ListCrypto';
import { SearchBar } from '../../components/SearchBar';
import { Box, Stack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useStoreCrypto } from '../../stores/cryptocurrencies';

export const SearchCrypto = () => {
  const { currentCrypto } = useStoreCrypto();
  const [crypto, setCrypto] = useState(currentCrypto);
  const navigate = useNavigate();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value: textValue } = event.target;
    const lowerCaseTextValue = textValue.toLowerCase();

    if (!lowerCaseTextValue) {
      setCrypto(currentCrypto);
      return;
    }

    setCrypto(
      currentCrypto.filter(
        (crypto) =>
          crypto.name?.toLowerCase().includes(lowerCaseTextValue) ||
          crypto.symbol?.toLowerCase().includes(lowerCaseTextValue),
      ),
    );
  };

  return (
    <Stack p={2} spacing={8}>
      <SearchBar handleChange={handleChange} />
      <Box>
        {crypto.map((data) => (
          <ListCrypto
            showSwitches={false}
            key={data.id}
            cryptocurrency={data}
            onClick={() => navigate(`/crypto/detail/${data.id}`)}
          />
        ))}
      </Box>
    </Stack>
  );
};
