import type { FieldValues, Path, UseFormRegister } from 'react-hook-form';

export interface CommonFormProps<T extends FieldValues> {
  name: Path<T>;
  register: UseFormRegister<T>;
  error?: string;
  helperText?: string;
}
