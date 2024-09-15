import { NativeModulesProxy, EventEmitter, Subscription } from 'expo-modules-core';

// Import the native module. On web, it will be resolved to ExpoBrotherPrinterSdk.web.ts
// and on native platforms to ExpoBrotherPrinterSdk.ts
import ExpoBrotherPrinterSdkModule from './ExpoBrotherPrinterSdkModule';
import ExpoBrotherPrinterSdkView from './ExpoBrotherPrinterSdkView';
import { ChangeEventPayload, ExpoBrotherPrinterSdkViewProps } from './ExpoBrotherPrinterSdk.types';

// Get the native constant value.
export const PI = ExpoBrotherPrinterSdkModule.PI;

export function hello(): string {
  return ExpoBrotherPrinterSdkModule.hello();
}

export async function setValueAsync(value: string) {
  return await ExpoBrotherPrinterSdkModule.setValueAsync(value);
}

const emitter = new EventEmitter(ExpoBrotherPrinterSdkModule ?? NativeModulesProxy.ExpoBrotherPrinterSdk);

export function addChangeListener(listener: (event: ChangeEventPayload) => void): Subscription {
  return emitter.addListener<ChangeEventPayload>('onChange', listener);
}

export async function startBluetoothSearch() {
  return await ExpoBrotherPrinterSdkModule.startBluetoothSearch();
}

export { ExpoBrotherPrinterSdkView, ExpoBrotherPrinterSdkViewProps, ChangeEventPayload };
