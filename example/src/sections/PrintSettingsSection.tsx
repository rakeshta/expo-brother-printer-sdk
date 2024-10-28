import { StyleProp, ViewStyle } from 'react-native';

import { BPPrintSettings } from 'expo-brother-printer-sdk';

import { Row, Section, ToggleRow } from '../components';
import { GS } from '../styles';

export interface PrintSettingsSectionProps {
  style?: StyleProp<ViewStyle>;
  settings: BPPrintSettings;
  onChange: (settings: BPPrintSettings) => void | Promise<void>;
}

export function PrintSettingsSection({ style, settings, onChange }: PrintSettingsSectionProps) {
  // helper to fire onChange event
  const fireOnChange = <Key extends keyof BPPrintSettings>(key: Key, value: BPPrintSettings[Key]) =>
    onChange({ ...settings, [key]: value });

  // render
  return (
    <Section style={style} contentStyle={GS.m_0} title='Print Settings'>
      <Row text='Label Size' detail={`${settings.labelSize}`} />
      <ToggleRow text='Auto Cut' value={settings.autoCut} onChange={(v) => fireOnChange('autoCut', v)} />
      <Row text='Auto Cut Page Count' detail={`${settings.autoCutForEachPageCount ?? 1}`} />
      <ToggleRow text='Cut at End' value={settings.cutAtEnd} onChange={(v) => fireOnChange('cutAtEnd', v)} />
      <Row text='Resolution' detail={`${settings.resolution ?? 'Auto'}`} />
    </Section>
  );
}
