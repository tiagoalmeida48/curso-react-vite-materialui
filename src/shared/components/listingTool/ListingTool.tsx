import { Environment } from '@/shared/environment';
import { useDebounce } from '@/shared/hooks';
import { Box, Button, Icon, InputAdornment, Paper, TextField, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';

interface ListingToolProps {
  search?: string;
  showSearch?: boolean;
  changeSearch?: (value: string) => void;
  buttonNewLabel?: string;
  showButtonNew?: boolean;
  onClickButtonNew?: () => void;
}

export const ListingTool = ({
  search = '',
  showSearch = false,
  changeSearch,
  buttonNewLabel = 'Novo',
  showButtonNew = true,
  onClickButtonNew
}: ListingToolProps) => {
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

  return (
    <Box height={theme.spacing(5)} marginX={1} padding={4} paddingX={1} display="flex" alignItems="center" component={Paper}>
      {showSearch && (
        <TextField
          size="small"
          placeholder={Environment.INPUT_SEARCH}
          value={internalSearch}
          onChange={(e) => setInternalSearch(e.target.value)}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Icon>search</Icon>
                </InputAdornment>
              )
            }
          }}
        />
      )}
      <Box flex={1} display="flex" justifyContent="flex-end">
        {showButtonNew && (
          <Button variant="contained" color="primary" disableElevation endIcon={<Icon>add</Icon>} onClick={onClickButtonNew}>
            {buttonNewLabel}
          </Button>
        )}
      </Box>
    </Box>
  );
};
