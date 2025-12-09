import { Box, Button, Icon, InputAdornment, TextField, Paper, useTheme } from '@mui/material';
import { Environment } from '../../environment';

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
  return (
    <Box height={theme.spacing(5)} marginX={1} padding={1} paddingX={1} display="flex" alignItems="center" component={Paper}>
      {showSearch && (
        <TextField
          size="small"
          placeholder={Environment.INPUT_SEARCH}
          value={search}
          onChange={(e) => changeSearch?.(e.target.value)}
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
