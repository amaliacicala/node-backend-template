const dotenv = require('dotenv/config');

module.exports = {
	HOST: 'localhost',
	USER: 'root',
	PASSWORD: process.env.MYSQL_PASSWORD,
	DB: 'testDB',
	dialect: 'mysql',
	pool: {
		// optional or default values will be set
		min: 0, // minimum number of connection in pool (default: 0)
		max: 3, // maximum number of connection in pool (default: 5)
		acquire: 30000, // maximum time, in milliseconds, that pool will try to get connection from the database before throwing an error (default: 60000)
		idle: 10000, // maximum time, in milliseconds, that a connection with the database can be idle while waiting for a response before being released
	},
};
