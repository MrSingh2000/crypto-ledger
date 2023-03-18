require('ts-node/register');
module.exports = require('./app.config.ts');
module.exports = ({ config }) => {
    return {
        ...config,
    };
};