import { useCallback, useRef } from 'react';

export const useDebounce = (delay: number = 300, notDelayInFirstCall: boolean = true) => {
  const debouncing = useRef<number | undefined>(undefined);
  const isFirstCall = useRef(notDelayInFirstCall);

  const debounce = useCallback((func: () => void) => {
    if (isFirstCall.current) {
      isFirstCall.current = false;
      return func();
    }

    if (debouncing.current) {
      clearTimeout(debouncing.current);
    }

    debouncing.current = setTimeout(() => func(), delay);
  }, [delay]);

  return { debounce };
};
