import { useDebounce, useGetAllCity, useGetByIdCity } from '@/shared/hooks';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useMemo, useRef, useState, type SyntheticEvent } from 'react';

export interface IAutoCompleteOption {
  id: number;
  label: string;
}

export interface IAutoCompleteCityProps {
  isExternalLoading?: boolean;
  value?: number;
  error?: string;
  onChange?: (value: number | undefined) => void;
}

export const useAutoCompleteCity = ({ value, onChange }: IAutoCompleteCityProps) => {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search);

  const { data: citiesData, isLoading: isLoadingCities } = useQuery(useGetAllCity(1, debouncedSearch));
  const { data: selectedCity } = useGetByIdCity(value || 0);

  const options: IAutoCompleteOption[] = useMemo(() => {
    const cities = citiesData?.items || [];
    return cities.map((city) => ({ id: city.id, label: city.name }));
  }, [citiesData]);

  const [inputValue, setInputValue] = useState('');
  const hasInitializedRef = useRef(false);

  const selectedOption: IAutoCompleteOption | null = useMemo(() => {
    if (!value) return null;
    const optionInList = options.find((option) => option.id === value);
    if (optionInList) return optionInList;
    if (selectedCity && selectedCity.data.id === value) {
      return { id: selectedCity.data.id, label: selectedCity.data.name };
    }
    return null;
  }, [value, options, selectedCity]);

  useEffect(() => {
    if (!hasInitializedRef.current && selectedOption?.label) {
      setInputValue(selectedOption.label);
      hasInitializedRef.current = true;
    }
  }, [selectedOption?.label]);

  const handleInputChange = (_event: SyntheticEvent<Element, Event>, newInputValue: string, reason: string) => {
    if (reason === 'input') {
      setInputValue(newInputValue);
      setSearch(newInputValue);
    } else if (reason === 'clear') {
      setInputValue('');
      setSearch('');
    }
  };

  const handleSelectChange = (newValue: IAutoCompleteOption) => {
    setInputValue(newValue?.label || '');
    setSearch('');
    onChange?.(newValue?.id);
  };

  return {
    state: {
      options,
      selectedOption,
      inputValue,
      isLoadingCities
    },
    actions: {
      handleInputChange,
      handleSelectChange
    }
  };
};
