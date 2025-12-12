import { Autocomplete, CircularProgress, TextField } from '@mui/material';
import { useAutoCompleteCity, type IAutoCompleteCityProps, type IAutoCompleteOption } from './useAutoCompleteCity';

export const AutoCompleteCity = ({ isExternalLoading = false, error, value, onChange }: IAutoCompleteCityProps) => {
  const { state, actions } = useAutoCompleteCity({ value, onChange });

  return (
    <Autocomplete
      openText="Abrir"
      closeText="Fechar"
      loadingText="Carregando..."
      noOptionsText="Nenhuma opção disponível"
      disablePortal
      loading={state.isLoadingCities}
      disabled={isExternalLoading}
      popupIcon={isExternalLoading || state.isLoadingCities ? <CircularProgress size={20} /> : undefined}
      inputValue={state.inputValue}
      onInputChange={(_event, newInputValue, reason) => actions.handleInputChange(_event, newInputValue, reason)}
      options={state.options}
      getOptionLabel={(option) => option.label}
      renderInput={(params) => <TextField {...params} label="Cidade" error={!!error} helperText={error} />}
      value={state.selectedOption}
      onChange={(_, newValue) => actions.handleSelectChange(newValue as IAutoCompleteOption)}
      isOptionEqualToValue={(option, value) => option.id === value.id}
    />
  );
};
