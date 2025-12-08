import { TextField, type TextFieldProps } from '@mui/material';
import { useController, type Control } from 'react-hook-form';

type Props = TextFieldProps & {
  name: string;
  control: Control<any>;
};

export const VTextFieldRHF = ({ name, control, ...rest }: Props) => {
  const {
    field: { onChange, value, ref, onBlur },
    fieldState: { error },
  } = useController({ name, control });
  
  return (
    <TextField
      {...rest}
      inputRef={ref}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      error={!!error}
      helperText={error?.message}
    />
  );
};