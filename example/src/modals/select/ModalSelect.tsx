import { forwardRef, useImperativeHandle, useRef } from 'react';

import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { BottomSheetFlatList, BottomSheetModal } from '@gorhom/bottom-sheet';

import { CheckIcon, Row } from '../../components';
import { GS } from '../../styles';
import { CustomBackdrop } from './CustomBackdrop';

export interface ModalSelectItem<Value> {
  key?: string;
  value: Value;
  label: string;
}

export interface ModalSelectProps<Value> {
  style?: StyleProp<ViewStyle>;
  title: string;
  items: ModalSelectItem<Value>[];
  selected?: Value;
  onSelect: (value: Value) => void | Promise<void>;
}

export interface ModalSelectMethods {
  present: () => void;
  dismiss: () => void;
}

export const ModalSelect = forwardRef<ModalSelectMethods, ModalSelectProps<unknown>>(function ModalSelect(
  { style, title, items, selected, onSelect },
  ref,
) {
  // ref
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  // imperative method to present the modal
  useImperativeHandle(ref, () => ({
    present: () => bottomSheetRef.current?.present(),
    dismiss: () => bottomSheetRef.current?.dismiss(),
  }));

  // safe areas
  const safeAreaInsets = useSafeAreaInsets();

  // render
  return (
    <BottomSheetModal
      ref={bottomSheetRef}
      snapPoints={['50%']}
      enableDynamicSizing={false}
      backdropComponent={CustomBackdrop}
    >
      <View style={[styles.header, GS.border_b, GS.px_md]}>
        <Text style={[GS.font_bold, GS.text_md]}>{title}</Text>
      </View>
      <BottomSheetFlatList
        contentContainerStyle={[style, { paddingBottom: safeAreaInsets.bottom }]}
        scrollIndicatorInsets={{ bottom: safeAreaInsets.bottom }}
        data={items}
        keyExtractor={(item, index) => item.key ?? `${index}`}
        renderItem={({ item }) => (
          <Row
            text={item.label}
            accessory={item.value === selected ? <CheckIcon /> : undefined}
            onPress={() => {
              onSelect(item.value);
              bottomSheetRef.current?.dismiss();
            }}
          />
        )}
      />
    </BottomSheetModal>
  );
});

const styles = StyleSheet.create({
  header: {
    height: 28,
  },
});
