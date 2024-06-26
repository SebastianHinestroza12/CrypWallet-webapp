import { useParams } from 'react-router-dom';

export const DetailCrypto = () => {
  const { cryptoId } = useParams();
  return <div>{cryptoId}</div>;
};
