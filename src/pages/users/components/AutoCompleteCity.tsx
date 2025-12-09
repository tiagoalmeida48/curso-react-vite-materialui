import { citiesQuery, useCityById, useDebounce } from '@/shared/hooks';
import { Autocomplete, CircularProgress, TextField } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useMemo, useRef, useState } from 'react';

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
    const optionInList = options.find((option) => option.id === value);
    if (optionInList) return optionInList;
    if (selectedCity && selectedCity.id === value) {
      return { id: selectedCity.id, label: selectedCity.name };
    }
    return null;
  }, [value, options, selectedCity]);

  const [inputValue, setInputValue] = useState('');
  const hasInitializedRef = useRef(false);

  useEffect(() => {
    if (!hasInitializedRef.current && selectedOption?.label) {
      setInputValue(selectedOption.label);
      hasInitializedRef.current = true;
    }
  }, [selectedOption?.label]);

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
      inputValue={inputValue}
      onInputChange={(_event, newInputValue, reason) => {
        if (reason === 'input') {
          setInputValue(newInputValue);
          setSearch(newInputValue);
        } else if (reason === 'clear') {
          setInputValue('');
          setSearch('');
        }
      }}
      options={options}
      getOptionLabel={(option) => option.label}
      renderInput={(params) => <TextField {...params} label="Cidade" error={!!error} helperText={error} />}
      value={selectedOption}
      onChange={(_, newValue) => {
        setInputValue(newValue?.label || '');
        setSearch('');
        onChange?.(newValue?.id);
      }}
      isOptionEqualToValue={(option, value) => option.id === value.id}
    />
  );
};
