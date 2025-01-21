import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'ionic-app-meter-reader',
  appName: 'meter-reader',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  },
};
export default config;