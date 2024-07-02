import { Box, Text } from '@chakra-ui/react';

interface PrefeListProps {
  title: string;
  subTitle: string;
}

export const PreferenceList = ({ title, subTitle }: PrefeListProps) => {
  return (
    <Box>
      <Text fontSize={'medium'}>{title}</Text>
      <Text fontSize={'small'}>{subTitle}</Text>
    </Box>
  );
};
