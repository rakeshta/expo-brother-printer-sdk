import Feather from '@expo/vector-icons/Feather';

import { Row, RowProps } from './Row';

export interface ToggleRowProps extends Omit<RowProps, 'accessory' | 'onPress'> {
  value?: boolean;
  onChange?: (value: boolean) => void | Promise<void>;
}

export function ToggleRow({ value, onChange, ...rest }: ToggleRowProps) {
  return (
    <Row
      {...rest}
      accessory={<Feather name={value ? 'check-square' : 'square'} size={24} />}
      onPress={onChange && (() => onChange(!value))}
    />
  );
}
