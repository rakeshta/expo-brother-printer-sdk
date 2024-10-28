import React from 'react';

import { View } from 'react-native';

import { BottomSheetBackdropProps } from '@gorhom/bottom-sheet';

export function CustomBackdrop({ animatedIndex, style }: BottomSheetBackdropProps) {
  return <View style={[style, { backgroundColor: 'rgba(0,0,0,0.5)' }]} />;
}
