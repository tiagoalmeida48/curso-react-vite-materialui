import { citiesQuery, useCityById, useDebounce } from '@/shared/hooks';
import { Autocomplete, CircularProgress, TextField } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';

type TAutoCompleteOption = {
  id: number;
  label: string;
};

interface IAutoCompleteCityProps {
  isExternalLoading?: boolean;
  value?: number;
  onChange?: (value: number | undefined) => void;
  error?: string;
}

export const AutoCompleteCity = ({ isExternalLoading = false, value, onChange, error }: IAutoCompleteCityProps) => {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search);

  const { data: citiesData, isLoading: isLoadingCities } = useQuery(citiesQuery(1, debouncedSearch));
  const { data: selectedCity } = useCityById(value || 0);

  const options: TAutoCompleteOption[] = useMemo(() => {
    const cities = citiesData?.data || [];
    return cities.map((city) => ({ id: city.id, label: city.name }));
  }, [citiesData]);

  const selectedOption: TAutoCompleteOption | null = useMemo(() => {
    if (!value) return null;

    // First try to find in current options
    const optionInList = options.find((option) => option.id === value);
    if (optionInList) return optionInList;

    // If not in list, but we have the detail fetched
    if (selectedCity && selectedCity.id === value) {
      return { id: selectedCity.id, label: selectedCity.name };
    }

    return null;
  }, [value, options, selectedCity]);

  // Synchronize search with selected value label when it changes (optional but good for UX)
  /* 
   We don't necessarily want to change 'search' when value changes, 
   because it might trigger a new search that filters out the selected item if it's not unique enough.
   Usually keeping them separate is fine.
  */

  return (
    <Autocomplete
      openText="Abrir"
      closeText="Fechar"
      loadingText="Carregando..."
      noOptionsText="Nenhuma opção disponível"
      disablePortal
      loading={isLoadingCities}
      disabled={isExternalLoading}
      popupIcon={isExternalLoading || isLoadingCities ? <CircularProgress size={20} /> : undefined}
      onInputChange={(_event, newValue) => {
        setSearch(newValue);
      }}
      options={options}
      getOptionLabel={(option) => option.label}
      renderInput={(params) => <TextField {...params} label="Cidade" error={!!error} helperText={error} />}
      value={selectedOption}
      onChange={(_, newValue) => {
        onChange?.(newValue?.id);
      }}
      isOptionEqualToValue={(option, value) => option.id === value.id}
    />
  );
};
