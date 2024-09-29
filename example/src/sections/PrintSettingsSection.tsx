import { StyleProp, ViewStyle } from 'react-native';

import { Row, Section } from '../components';

export interface PrintSettingsSectionProps {
  style?: StyleProp<ViewStyle>;
}

export function PrintSettingsSection({ style }: PrintSettingsSectionProps) {
  // render
  return (
    <Section style={style} title='Print Settings'>
      <Row text='TODO' />
    </Section>
  );
}
