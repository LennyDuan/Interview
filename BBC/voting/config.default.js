var config = {
  debug: true,
  port: 3000,
  db: 'mongodb://127.0.0.1/voting_prod',
};

if (process.env.NODE_ENV === 'dev' || config.debug == true) {
  config.db = 'mongodb://127.0.0.1/voting_dev';
}
module.exports = config;
