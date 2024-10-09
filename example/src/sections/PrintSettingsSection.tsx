import { StyleProp, ViewStyle } from 'react-native';

import { Row, Section } from '../components';
import { GS } from '../styles';

export interface PrintSettingsSectionProps {
  style?: StyleProp<ViewStyle>;
}

export function PrintSettingsSection({ style }: PrintSettingsSectionProps) {
  // render
  return (
    <Section style={style} contentStyle={GS.m_0} title='Print Settings'>
      <Row text='TODO' />
    </Section>
  );
}
