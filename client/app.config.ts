module.exports = {
  name: 'MyApp',
  version: '1.0.0',
  extra: {
    eas: {
      projectId: "bf85755d-4e0f-43c5-a3d0-af4a658e2dab"
    },
    apiUrl: process.env.API_URL || 'http://192.168.43.154:3000',
    android: {
      package: "mrsingh",
    },
  },
};


  // url 1 = http://192.168.43.154:3000
  // url 2 = http://192.168.30.145:19000