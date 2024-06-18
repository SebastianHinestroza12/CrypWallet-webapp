/* eslint-disable no-unused-vars */
import React from 'react';
import { Grid, GridItem } from '@chakra-ui/react';
import { FaFingerprint, FaTimes } from 'react-icons/fa';
import { IconButton } from '../../components/IconButton';
import { NumberButton } from '../../components/NumberButton';

interface NumericKeypadProps {
  onNumberClick: (num: number) => void;
  onDeleteClick: () => void;
  onFingerprintClick: () => void;
  isDisabled: boolean;
}

export const NumericKeypad: React.FC<NumericKeypadProps> = ({
  onNumberClick,
  onDeleteClick,
  onFingerprintClick,
  isDisabled,
}) => {
  return (
    <Grid templateColumns="repeat(3, 1fr)" gap={5} padding={4}>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => (
        <GridItem key={number} display="flex" justifyContent="center">
          <NumberButton number={number} onClick={onNumberClick} disabled={isDisabled} />
        </GridItem>
      ))}
      <GridItem display="flex" justifyContent="center">
        <IconButton icon={FaFingerprint} onClick={onFingerprintClick} disabled={isDisabled} />
      </GridItem>
      <GridItem display="flex" justifyContent="center">
        <NumberButton number={0} onClick={onNumberClick} disabled={isDisabled} />
      </GridItem>
      <GridItem display="flex" justifyContent="center">
        <IconButton icon={FaTimes} onClick={onDeleteClick} disabled={isDisabled} />
      </GridItem>
    </Grid>
  );
};
