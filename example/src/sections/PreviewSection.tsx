import { useEffect, useRef, useState } from 'react';

import { Image, StyleProp, ViewStyle } from 'react-native';

import Feather from '@expo/vector-icons/Feather';

import { Row, Section } from '../components';
import { ModalSelect, ModalSelectItem, ModalSelectMethods } from '../modals';
import { MediaService, SampleImage } from '../services';
import { GS } from '../styles';

const IMAGE_SELECT_ITEMS = MediaService.sampleImages.map(
  (image): ModalSelectItem<SampleImage> => ({
    key: image.name,
    label: image.name,
    value: image,
  }),
);

export interface PreviewSectionProps {
  style?: StyleProp<ViewStyle>;
  selectedImage: SampleImage;
  onSelectImage: (image: SampleImage) => void;
}

export function PreviewSection({ style, selectedImage, onSelectImage }: PreviewSectionProps) {
  // state
  const [imageUri, setImageUri] = useState<string>();

  // modal refs
  const imageSelectModalRef = useRef<ModalSelectMethods>(null);

  // fetch image
  useEffect(() => {
    (async () => {
      const uri = await MediaService.urlForSampleImage(selectedImage);
      setImageUri(uri);
    })();
  }, [selectedImage]);

  // render
  return (
    <>
      {/* section */}
      <Section
        style={style}
        contentStyle={GS.m_0}
        title='Preview'
        titleAccessory={<Feather name='menu' size={24} />}
        onPress={() => imageSelectModalRef.current?.present()}
      >
        {imageUri ?
          <Image style={GS.aspect_square} source={{ uri: imageUri }} />
        : <Row text='Loading...' />}
      </Section>

      {/* image select */}
      <ModalSelect
        ref={imageSelectModalRef}
        title='Select Image'
        items={IMAGE_SELECT_ITEMS}
        onSelect={(item) => onSelectImage(item as SampleImage)}
        selected={selectedImage}
      />
    </>
  );
}
