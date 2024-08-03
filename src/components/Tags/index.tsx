import { HStack, Tag, Text } from '@chakra-ui/react';
import { PropsTags } from '../../interfaces';

export const Tags = (props: PropsTags) => {
  const { marginTop = 0, tags } = props;

  return (
    <HStack spacing={2} marginTop={marginTop}>
      {tags.map((tag) => {
        return (
          <Tag py={1} variant="solid" bg={'#1e59ea'} key={tag}>
            <Text textTransform={'capitalize'} color={'#FFF'}>
              {tag}
            </Text>
          </Tag>
        );
      })}
    </HStack>
  );
};
