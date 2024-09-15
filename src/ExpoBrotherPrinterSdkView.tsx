import { requireNativeViewManager } from 'expo-modules-core';
import * as React from 'react';

import { ExpoBrotherPrinterSdkViewProps } from './ExpoBrotherPrinterSdk.types';

const NativeView: React.ComponentType<ExpoBrotherPrinterSdkViewProps> =
  requireNativeViewManager('ExpoBrotherPrinterSdk');

export default function ExpoBrotherPrinterSdkView(props: ExpoBrotherPrinterSdkViewProps) {
  return <NativeView {...props} />;
}
