import { Image } from 'react-native';

import RNFetchBlob from 'rn-fetch-blob';

const sampleImage = require('../../assets/Sample-Image.png');

async function downloadImage(url: string): Promise<string> {
  const res = await RNFetchBlob.config({ fileCache: true, appendExt: 'png' }).fetch('GET', url);
  const path = res.path();
  return `file://${path}`;
}

export class MediaService {
  private static _sampleFileUrl?: string;

  /**
   * Returns a local file URL for the sample image.
   *
   * If running in dev mode via metro, the image is downloaded from the the
   * metro server and cached locally.
   */
  public static async sampleImageUrl() {
    // return cached image
    if (this._sampleFileUrl) {
      return this._sampleFileUrl;
    }

    // fetch & cache image
    return (this._sampleFileUrl = await (async () => {
      // locate sample image
      const imageUri = Image.resolveAssetSource(sampleImage).uri;

      // if local, return immediately
      if (imageUri.startsWith('file://')) {
        return imageUri;
      }

      // download image from metro
      return downloadImage(imageUri);
    })());
  }
}
