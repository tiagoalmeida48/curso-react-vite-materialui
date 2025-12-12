import { Environment } from '@/shared/environment';
import { useDebounce } from '@/shared/hooks';
import { useTheme } from '@mui/material';
import { useEffect, useState } from 'react';

export interface IListingToolProps {
  search?: string;
  showSearch?: boolean;
  buttonNewLabel?: string;
  showButtonNew?: boolean;
  changeSearch?: (value: string) => void;
  onClickButtonNew?: () => void;
}

export const useListingTool = ({ search = '', changeSearch }: IListingToolProps) => {
  const theme = useTheme();
  const [internalSearch, setInternalSearch] = useState(search);
  const debouncedSearch = useDebounce(internalSearch, Environment.DEBOUNCE_DELAY);

  useEffect(() => {
    if (debouncedSearch !== search) {
      changeSearch?.(debouncedSearch);
    }
  }, [debouncedSearch, changeSearch, search]);

  useEffect(() => {
    setInternalSearch(search);
  }, [search]);

  return {
    theme,
    internalSearch,
    setInternalSearch,
  };
};
