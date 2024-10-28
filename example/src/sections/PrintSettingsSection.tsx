import { useRef } from 'react';

import { StyleProp, ViewStyle } from 'react-native';

import sortBy from 'lodash/sortBy';
import startCase from 'lodash/startCase';

import { BPPrintSettings, BPQLLabelSize, BPResolution } from 'expo-brother-printer-sdk';

import { Row, Section, ToggleRow } from '../components';
import { ModalSelect, ModalSelectMethods } from '../modals';
import { GS } from '../styles';

// helpers -------------------------------------------------------------------------------------------------------------

function labelSizeToString(labelSize: BPQLLabelSize | undefined) {
  if (labelSize === undefined) return 'Not Set';
  return startCase(BPQLLabelSize[labelSize]);
}

function resolutionToString(resolution: BPResolution | undefined) {
  if (resolution === undefined) return 'Not Set';
  return startCase(BPResolution[resolution]);
}

// constants -----------------------------------------------------------------------------------------------------------

const labelSizeItems = sortBy(
  Object.values(BPQLLabelSize)
    .filter((value) => typeof value !== 'string')
    .map((value) => ({
      key: `${value}`,
      value,
      label: labelSizeToString(value),
    })),
  'label',
);

const resolutionItems = sortBy(
  Object.values(BPResolution)
    .filter((value) => typeof value !== 'string')
    .map((value) => ({
      key: `${value}`,
      value,
      label: resolutionToString(value),
    })),
  'label',
);

// component PrintSettingsSection --------------------------------------------------------------------------------------

export interface PrintSettingsSectionProps {
  style?: StyleProp<ViewStyle>;
  settings: BPPrintSettings;
  onChange: (settings: BPPrintSettings) => void | Promise<void>;
}

export function PrintSettingsSection({ style, settings, onChange }: PrintSettingsSectionProps) {
  // modal refs
  const labelSizeModalRef = useRef<ModalSelectMethods>(null);
  const resolutionModalRef = useRef<ModalSelectMethods>(null);

  // helper to fire onChange event
  const fireOnChange = <Key extends keyof BPPrintSettings>(key: Key, value: BPPrintSettings[Key]) =>
    onChange({ ...settings, [key]: value });

  // render
  return (
    <>
      {/* section */}
      <Section style={style} contentStyle={GS.m_0} title='Print Settings'>
        <Row
          text='Label Size'
          detail={labelSizeToString(settings.labelSize)}
          onPress={() => labelSizeModalRef.current?.present()}
        />
        <ToggleRow text='Auto Cut' value={settings.autoCut} onChange={(v) => fireOnChange('autoCut', v)} />
        <Row text='Auto Cut Page Count' detail={`${settings.autoCutForEachPageCount ?? 1}`} />
        <ToggleRow text='Cut at End' value={settings.cutAtEnd} onChange={(v) => fireOnChange('cutAtEnd', v)} />
        <Row
          text='Resolution'
          detail={resolutionToString(settings.resolution)}
          onPress={() => resolutionModalRef.current?.present()}
        />
      </Section>

      {/* label size select */}
      <ModalSelect
        ref={labelSizeModalRef}
        title='Label Size'
        items={labelSizeItems}
        selected={settings.labelSize}
        onSelect={(value) => fireOnChange('labelSize', value as BPQLLabelSize)}
      />

      {/* resolution select */}
      <ModalSelect
        ref={resolutionModalRef}
        title='Resolution'
        items={resolutionItems}
        selected={settings.resolution}
        onSelect={(value) => fireOnChange('resolution', value as BPResolution)}
      />
    </>
  );
}
