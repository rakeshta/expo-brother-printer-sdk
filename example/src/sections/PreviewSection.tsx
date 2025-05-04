import { useEffect, useRef, useState } from 'react';

import { Image, StyleProp, ViewStyle } from 'react-native';

import Feather from '@expo/vector-icons/Feather';

import { Row, Section } from '../components';
import { ModalSelect, ModalSelectItem, ModalSelectMethods } from '../modals';
import { MediaService, SampleMedia } from '../services';
import { GS } from '../styles';

const IMAGE_SELECT_ITEMS = MediaService.sampleMedia.map(
  (image): ModalSelectItem<SampleMedia> => ({
    key: image.name,
    label: image.name,
    value: image,
  }),
);

export interface PreviewSectionProps {
  style?: StyleProp<ViewStyle>;
  selectedMedia: SampleMedia;
  onSelectMedia: (media: SampleMedia) => void;
}

export function PreviewSection({ style, selectedMedia, onSelectMedia }: PreviewSectionProps) {
  // state
  const [imageUri, setImageUri] = useState<string>();

  // modal refs
  const imageSelectModalRef = useRef<ModalSelectMethods>(null);

  // fetch image
  useEffect(() => {
    (async () => {
      const uri = await MediaService.urlForSampleThumbnail(selectedMedia);
      setImageUri(uri);
    })();
  }, [selectedMedia]);

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
        onSelect={(item) => onSelectMedia(item as SampleMedia)}
        selected={selectedMedia}
      />
    </>
  );
}
