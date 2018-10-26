const env = process.env.NODE_ENV || 'development',
      localhost = 'mongodb://127.0.0.1:27017/';

if (env === 'development') {
    process.env.PORT = 3000;
    process.env.MONGODB_URI = `${localhost}TodoApp`;
} else if (env === 'test') {
    process.env.PORT = 3000;
    process.env.MONGODB_URI = `${localhost}TodoAppTest`;
}