/* eslint-disable no-unused-vars */
import { useState, useCallback } from 'react';

interface UsePinInputProps {
  onComplete: (pin: string) => void;
}

export const usePinInput = ({ onComplete }: UsePinInputProps) => {
  const [pin, setPin] = useState<string>('');
  const [borderColorPin, setBorderColorPin] = useState('#1e59ea');
  const [shake, setShake] = useState<boolean>(false);

  const handleNumberClick = useCallback(
    (num: number) => {
      setPin((prevPin) => {
        const newPin = prevPin + num.toString();
        if (newPin.length === 6) {
          onComplete(newPin);
        } else {
          setBorderColorPin('#1e59ea');
        }
        return newPin.length <= 6 ? newPin : prevPin;
      });
    },
    [onComplete],
  );

  const handleDeleteClick = useCallback(() => {
    setPin((prevPin) => prevPin.slice(0, -1));
    setBorderColorPin('#1e59ea');
  }, []);

  const handleDeleteAllClick = useCallback(() => {
    setPin('');
  }, []);

  const resetShake = useCallback(() => {
    setShake(false);
    setBorderColorPin('#1e59ea');
  }, []);

  return {
    pin,
    borderColorPin,
    shake,
    setShake,
    setBorderColorPin,
    handleNumberClick,
    handleDeleteClick,
    handleDeleteAllClick,
    resetShake,
    setPin,
  };
};
