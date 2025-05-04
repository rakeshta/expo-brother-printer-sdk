import { Image, ImageRequireSource } from 'react-native';

import RNFetchBlob from 'rn-fetch-blob';

export interface SampleMedia {
  name: string;
  thumbnail: ImageRequireSource;
  media: ImageRequireSource;
  mediaExt: string;
}

const SAMPLE_MEDIA: SampleMedia[] = [
  {
    name: 'PNG: I heart A',
    thumbnail: require('../../assets/Sample-01.png'),
    media: require('../../assets/Sample-01.png'),
    mediaExt: 'png',
  },
  {
    name: 'PNG: Gray Stripes',
    thumbnail: require('../../assets/Sample-02.png'),
    media: require('../../assets/Sample-02.png'),
    mediaExt: 'png',
  },
  {
    name: 'PDF: The quick brown fox',
    thumbnail: require('../../assets/Sample-03.png'),
    media: require('../../assets/Sample-03.pdf'),
    mediaExt: 'pdf',
  },
];

async function downloadMedia(url: string, ext: string): Promise<string> {
  const res = await RNFetchBlob.config({ fileCache: true, appendExt: ext }).fetch('GET', url);
  const path = res.path();
  return `file://${path}`;
}

export class MediaService {
  private static _sampleMediaURLs: Record<ImageRequireSource, string> = {};

  /**
   * Returns a list of sample media in the app.
   */
  public static get sampleMedia(): SampleMedia[] {
    return SAMPLE_MEDIA;
  }

  private static async _localUrlForAsset(asset: ImageRequireSource, ext: string): Promise<string> {
    // return cached image URL if available
    if (this._sampleMediaURLs[asset]) {
      return this._sampleMediaURLs[asset];
    }

    // fetch & cache image
    return (this._sampleMediaURLs[asset] = await (async () => {
      // locate the asset
      const mediaUrl = Image.resolveAssetSource(asset).uri;

      // if local, return immediately
      if (mediaUrl.startsWith('file://')) {
        return mediaUrl;
      }

      // download file from metro
      return downloadMedia(mediaUrl, ext);
    })());
  }

  /**
   * Returns a local file URL for the given sample media thumbnail.
   *
   * @remarks
   * If running in dev mode via metro, the file is downloaded from the the
   * metro server and cached locally.
   *
   * @param image - The sample media to get the URL for.
   * @returns The local file URL for the sample media thumbnail.
   */
  public static async urlForSampleThumbnail(image: SampleMedia): Promise<string> {
    return this._localUrlForAsset(image.thumbnail, 'png');
  }

  /**
   * Returns a local file URL for the given sample media.
   *
   * @remarks
   * If running in dev mode via metro, the file is downloaded from the the
   * metro server and cached locally.
   *
   * @param image - The sample media to get the URL for.
   * @returns The local file URL for the sample media.
   */
  public static async urlForSampleMedia(image: SampleMedia): Promise<string> {
    return this._localUrlForAsset(image.media, image.mediaExt);
  }
}
