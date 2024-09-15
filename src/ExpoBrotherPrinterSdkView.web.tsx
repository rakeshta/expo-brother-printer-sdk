import * as React from 'react';

import { ExpoBrotherPrinterSdkViewProps } from './ExpoBrotherPrinterSdk.types';

export default function ExpoBrotherPrinterSdkView(props: ExpoBrotherPrinterSdkViewProps) {
  return (
    <div>
      <span>{props.name}</span>
    </div>
  );
}
