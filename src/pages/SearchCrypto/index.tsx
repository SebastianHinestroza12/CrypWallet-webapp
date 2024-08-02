import { ListCrypto } from '../../components/ListCrypto';
import { SearchBar } from '../../components/SearchBar';
import { Box, Stack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants';
import { useSearchCrypto } from '../../hooks/useSearchCrypto';
import { useStoreCrypto } from '../../stores/cryptocurrencies';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const MotionBox = motion(Box);

export const SearchCrypto = () => {
  const { currentCrypto } = useStoreCrypto();
  const { crypto, handleChange } = useSearchCrypto({
    filterSwitch: false,
    allCrypto: currentCrypto,
  });
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <Stack spacing={8}>
      <Box>
        <SearchBar handleChange={handleChange} title={t('search.title_search')} />
      </Box>
      <Box>
        {crypto.map((data, index) => (
          <MotionBox
            key={data.CoinInfo.Id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut', delay: index * 0.1 }}
          >
            <ListCrypto
              showSwitches={false}
              cryptocurrency={data}
              isCursorPointer
              onClick={() =>
                navigate(`${ROUTES.CRYPTO_DETAIL_MAIN}/${data.CoinInfo.FullName.toLowerCase()}`, {
                  state: { infoCrypto: data },
                })
              }
            />
          </MotionBox>
        ))}
      </Box>
    </Stack>
  );
};
