import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  async restToFile(s: string): Promise<File> {
    let src = await this.getBase64ImageFromUrl(s);
    return this.dataURLtoFile(src, s);
  }

  getImageByFilename(filename: string): string {
    let url = null;
    if (filename) {
      url = `${environment.api_image}${filename}`;
      let idx = url.indexOf('/api/image/get?q=');
      if (idx > -1) {
        url = url.replace('/api/image/get?q=', '/');
      }
      if (url.indexOf('/api/pdf/get?q=') > 0) {
        url = url.replace('/api/pdf/get?q=', '/');
      }
      if (url.indexOf('//tenant/') > 0) {
        url = url.replace('//tenant/', '/tenant/');
      }
      if (url.indexOf('bm/') > 0) {
        url = url.replace('bm/', '/bm/');
      }
      if (url.indexOf('//bm/') > 0) {
        url = url.replace('//bm/', '/bm/');
      }

      // console.log('url',url)
      // if (url.indexOf('/bm//') > 0) {
      //   url = url.replace('/bm//', '/bm/');
      // }
      // if (url.indexOf('//') > 0) {
      //   url = url.replace('//', '/');
      // }
    }
    return url;
  }

  dataURLtoFile(dataurl, filename): File {
    let arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }

  private async getBase64ImageFromUrl(imageUrl) {
    let res = await fetch(imageUrl);
    let blob = await res.blob();
    return new Promise((resolve, reject) => {
      let reader = new FileReader();
      reader.addEventListener(
        'load',
        function () {
          resolve(reader.result);
        },
        false
      );

      reader.onerror = () => {
        return reject(this);
      };
      reader.readAsDataURL(blob);
    });
  }
}
