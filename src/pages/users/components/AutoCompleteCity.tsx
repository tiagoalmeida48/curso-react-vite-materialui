import { useCities } from '@/shared/hooks';
import { Autocomplete, CircularProgress, TextField } from '@mui/material';
import { useEffect, useMemo, useRef, useState } from 'react';

type TAutoCompleteProps = {
  id: number;
  label: string;
};

interface IAutoCompleteCityProps {
  isExternalLoading?: boolean;
  value?: number;
  onChange?: (value: number | undefined) => void;
  error?: string;
}

export const AutoCompleteCity: React.FC<IAutoCompleteCityProps> = ({ isExternalLoading = false, value, onChange, error }) => {
  const [search, setSearch] = useState('');
  const onChangeRef = useRef(onChange);

  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  const { data, isLoading } = useCities(1, search);

  const options: TAutoCompleteProps[] = useMemo(() => {
    const cities = data?.data || [];
    return cities.map((city) => ({ id: city.id, label: city.name }));
  }, [data]);

  const autoCompleteSelectedOptions = useMemo(() => {
    if (!value) return null;
    return options.find((option) => option.id === value) || null;
  }, [value, options]);

  return (
    <Autocomplete
      openText="Abrir"
      closeText="Fechar"
      loadingText="Carregando..."
      noOptionsText="Nenhuma opção disponível"
      disablePortal
      loading={isLoading}
      disabled={isExternalLoading}
      popupIcon={isExternalLoading || isLoading ? <CircularProgress size={20} /> : undefined}
      onInputChange={(_event, newValue, reason) => {
        if (reason === 'input') {
          setSearch(newValue);
        } else if (reason === 'clear') {
          setSearch('');
        }
      }}
      options={options}
      getOptionLabel={(option) => option.label}
      renderInput={(params) => <TextField {...params} label="Cidade" error={!!error} helperText={error} />}
      value={autoCompleteSelectedOptions}
      onChange={(_, newValue) => {
        const newId = newValue?.id;
        if (newId !== value) {
          onChangeRef.current?.(newId);
        }
      }}
      isOptionEqualToValue={(option, value) => option.id === value?.id}
    />
  );
};
