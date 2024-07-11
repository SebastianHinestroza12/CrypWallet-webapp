import { useState, ChangeEvent } from 'react';
import { ListCrypto } from '../../components/ListCrypto';
import { SearchBar } from '../../components/SearchBar';
import { Box, Stack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useStoreCrypto } from '../../stores/cryptocurrencies';
import { ROUTES } from '../../constants';

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
          crypto.CoinInfo.FullName.toLowerCase().includes(lowerCaseTextValue) ||
          crypto.CoinInfo.Name.toLowerCase().includes(lowerCaseTextValue),
      ),
    );
  };

  return (
    <Stack spacing={8}>
      <SearchBar handleChange={handleChange} />
      <Box>
        {crypto.map((data) => (
          <ListCrypto
            showSwitches={false}
            key={data.CoinInfo.Id}
            cryptocurrency={data}
            isCursorPointer
            onClick={() =>
              navigate(`${ROUTES.CRYPTO_DETAIL_MAIN}/${data.CoinInfo.FullName.toLowerCase()}`)
            }
          />
        ))}
      </Box>
    </Stack>
  );
};
