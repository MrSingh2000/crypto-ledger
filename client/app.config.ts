import { ExpoConfig, ConfigContext } from 'expo/config';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  slug: 'my-app',
  name: 'My App',
  extra: {
    apiUrl: 'https://cryptoledger.onrender.com'
  }
});

// apiUrl: process.env.API_URL || 'http://192.168.43.154:3000'

// module.exports = {
//   name: 'MyApp',
//   version: '1.0.0',
//   extra: {
//     apiUrl: process.env.API_URL || 'http://192.168.43.154:3000',
//   },
// };


  // url 1 = http://192.168.43.154:3000
  // url 2 = http://192.168.30.145:19000