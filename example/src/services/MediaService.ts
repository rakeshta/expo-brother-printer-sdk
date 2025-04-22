import { Image, ImageRequireSource } from 'react-native';

import RNFetchBlob from 'rn-fetch-blob';

export interface SampleImage {
  name: string;
  source: ImageRequireSource;
}

const SampleImages: SampleImage[] = [
  {
    name: 'Sample 1',
    source: require('../../assets/Sample-01.png'),
  },
  {
    name: 'Sample 2',
    source: require('../../assets/Sample-02.png'),
  },
];

async function downloadImage(url: string): Promise<string> {
  const res = await RNFetchBlob.config({ fileCache: true, appendExt: 'png' }).fetch('GET', url);
  const path = res.path();
  return `file://${path}`;
}

export class MediaService {
  private static _sampleImageURLs: Record<ImageRequireSource, string> = {};

  /**
   * Returns a list of sample images in the app.
   */
  public static get sampleImages(): SampleImage[] {
    return SampleImages;
  }

  /**
   * Returns a local file URL for the given sample image.
   *
   * @remarks
   * If running in dev mode via metro, the image is downloaded from the the
   * metro server and cached locally.
   *
   * @param image - The sample image to get the URL for.
   * @returns The local file URL for the sample image.
   */
  public static async urlForSampleImage(image: SampleImage): Promise<string> {
    // return cached image URL if available
    if (this._sampleImageURLs[image.source]) {
      return this._sampleImageURLs[image.source];
    }

    // fetch & cache image
    return (this._sampleImageURLs[image.source] = await (async () => {
      // locate sample image
      const imageUri = Image.resolveAssetSource(image.source).uri;

      // if local, return immediately
      if (imageUri.startsWith('file://')) {
        return imageUri;
      }

      // download image from metro
      return downloadImage(imageUri);
    })());
  }
}
