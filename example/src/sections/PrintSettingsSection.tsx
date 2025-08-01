import React, { useRef } from 'react';

import { StyleProp, ViewStyle } from 'react-native';

import sortBy from 'lodash/sortBy';
import startCase from 'lodash/startCase';

import { BPHalftone, BPPrintSettings, BPQLLabelSize, BPResolution, BPRotation } from 'expo-brother-printer-sdk';

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

function rotationToString(rotation: BPRotation | undefined) {
  if (rotation === undefined) return 'Not Set';
  return startCase(BPRotation[rotation]);
}

function halftoneToString(halftone: BPHalftone | undefined) {
  if (halftone === undefined) return 'Not Set';
  return startCase(BPHalftone[halftone]);
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

const rotationItems = sortBy(
  Object.values(BPRotation)
    .filter((value) => typeof value !== 'string')
    .map((value) => ({
      key: `${value}`,
      value,
      label: rotationToString(value),
    })),
  'value',
);

const halftoneItems = sortBy(
  Object.values(BPHalftone)
    .filter((value) => typeof value !== 'string')
    .map((value) => ({
      key: `${value}`,
      value,
      label: halftoneToString(value),
    })),
  'label',
);
const halftoneThresholdItems = [
  { key: '0', value: 0, label: '0' },
  { key: '64', value: 64, label: '64' },
  { key: '128', value: 128, label: '128' },
  { key: '192', value: 192, label: '192' },
  { key: '255', value: 255, label: '255' },
];

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
  const rotationModalRef = useRef<ModalSelectMethods>(null);
  const halftoneModalRef = useRef<ModalSelectMethods>(null);
  const halftoneThresholdModalRef = useRef<ModalSelectMethods>(null);

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
        <Row
          text='Image Rotation'
          detail={rotationToString(settings.imageRotation)}
          onPress={() => rotationModalRef.current?.present()}
        />
        <Row
          text='Halftone'
          detail={halftoneToString(settings.halftone)}
          onPress={() => halftoneModalRef.current?.present()}
        />
        <Row
          text='Halftone Threshold'
          detail={`${settings.halftoneThreshold ?? 'Default'}`}
          onPress={() => halftoneThresholdModalRef.current?.present()}
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

      {/* image rotation select */}
      <ModalSelect
        ref={rotationModalRef}
        title='Image Rotation'
        items={rotationItems}
        selected={settings.imageRotation}
        onSelect={(value) => fireOnChange('imageRotation', value as BPRotation)}
      />

      {/* halftone select */}
      <ModalSelect
        ref={halftoneModalRef}
        title='Halftone'
        items={halftoneItems}
        selected={settings.halftone}
        onSelect={(value) => fireOnChange('halftone', value as BPHalftone)}
      />

      {/* halftone threshold select */}
      <ModalSelect
        ref={halftoneThresholdModalRef}
        title='Halftone Threshold'
        items={halftoneThresholdItems}
        selected={settings.halftoneThreshold}
        onSelect={(value) => fireOnChange('halftoneThreshold', value as number)}
      />
    </>
  );
}
