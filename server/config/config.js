const env = process.env.NODE_ENV || 'development',
      localhost = 'mongodb://127.0.0.1:27017/';

if (env === 'development' || env === 'test') {
    const config = require('./config.json'),
          envConfig = config[env];
    
    Object.keys(envConfig).forEach(key => process.env[key] = envConfig[key]);
}