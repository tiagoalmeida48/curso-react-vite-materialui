import { useDebounce } from "@/shared/hooks";
import { CitiesService } from "@/shared/services/api/cities/CitiesService";
import { Autocomplete, CircularProgress, TextField } from "@mui/material";
import { useField } from "@unform/core";
import { useEffect, useMemo, useState } from "react";

type TAutoCompleteProps = {
  id: number;
  label: string;
}

interface IAutoCompleteCityProps {
  isExternalLoading?: boolean;
}

export const AutoCompleteCity: React.FC<IAutoCompleteCityProps> = ({ isExternalLoading = false }) => {
  const { fieldName, registerField, error, defaultValue, clearError } = useField('cityId');
  const { debounce } = useDebounce();

  const [options, setOptions] = useState<TAutoCompleteProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedId, setSelectedId] = useState<number | undefined>(defaultValue);

  useEffect(() => {
    registerField({
      name: fieldName,
      getValue: () => selectedId,
      setValue: (_, newSelectedId) => setSelectedId(newSelectedId)
    });
  }, [registerField, fieldName, selectedId]);

  useEffect(() => {
    setLoading(true);
    debounce(() => {
      CitiesService.getAll(1, search).then((result) => {
        setLoading(false);
        if (result instanceof Error) {
          alert(result.message);
        } else {
          setOptions(result.data.map((city) => ({ id: city.id, label: city.name })));
        }
      });
    });
  }, [search]);

  const autoCompleteSelectedOptions = useMemo(() => {
    if (!selectedId) return null;

    return options.find((option) => option.id === selectedId) || null;
  }, [selectedId, options]);

  return (
    <Autocomplete
      openText="Abrir"
      closeText="Fechar"
      loadingText="Carregando..."
      noOptionsText="Nenhuma opção disponível"

      disablePortal

      loading={loading}
      disabled={isExternalLoading}
      popupIcon={isExternalLoading || loading ? <CircularProgress size={20} /> : undefined}
      onInputChange={(_, newValue) => setSearch(newValue)}
      options={options}
      getOptionLabel={(option) => option.label}
      renderInput={(params) => <TextField {...params} label="Cidade" error={!!error} helperText={error} />}
      value={autoCompleteSelectedOptions}
      onChange={(_, newValue) => {setSelectedId(newValue?.id); setSearch(''); clearError();}}
    />
  );
};