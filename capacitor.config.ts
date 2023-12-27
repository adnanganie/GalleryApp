import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.adnan.galleryApp',
  appName: 'GalleryApp',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  }
};

export default config;
