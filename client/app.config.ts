interface ExpoConfig {
  name: string,
  version: string,
  extra: {
    apiUrl: string,
    hand: string
  }
}

const config: ExpoConfig = {
  name: 'MyApp',
  version: '1.0.0',
  extra: {
    apiUrl: process.env.API_URL || 'http://192.168.43.154:3000',
    hand: "Handis this"
  }
};

export default config;

// module.exports = {
//   name: 'MyApp',
//   version: '1.0.0',
//   extra: {
//     apiUrl: process.env.API_URL || 'http://192.168.43.154:3000',
//   },
// };


  // url 1 = http://192.168.43.154:3000
  // url 2 = http://192.168.30.145:19000