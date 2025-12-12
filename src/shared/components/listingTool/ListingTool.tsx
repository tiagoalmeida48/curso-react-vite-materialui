import { Environment } from '@/shared/environment';
import { Box, Button, Icon, InputAdornment, Paper, TextField } from '@mui/material';
import { useListingTool, type IListingToolProps } from './useListingTool';

export const ListingTool = ({
  search = '',
  showSearch = false,
  buttonNewLabel = 'Novo',
  showButtonNew = true,
  changeSearch,
  onClickButtonNew
}: IListingToolProps) => {
  const { internalSearch, theme, setInternalSearch } = useListingTool({ search, changeSearch });

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
