import { useEffect, useState } from 'react';

import { Image, StyleProp, ViewStyle } from 'react-native';

import { Row, Section } from '../components';
import { MediaService } from '../services';
import { GS } from '../styles';

export interface PreviewSectionProps {
  style?: StyleProp<ViewStyle>;
}

export function PreviewSection({ style }: PreviewSectionProps) {
  // state
  const [imageUri, setImageUri] = useState<string>();

  // fetch image
  useEffect(() => {
    (async () => {
      const uri = await MediaService.sampleImageUrl();
      setImageUri(uri);
      console.log('imageUri', uri);
    })();
  }, []);

  // render
  return (
    <Section style={style} contentStyle={GS.m_0} title='Preview'>
      {imageUri ?
        <Image style={[GS.rounded_md, { aspectRatio: 1 }]} source={{ uri: imageUri }} />
      : <Row text='Loading...' />}
    </Section>
  );
}
