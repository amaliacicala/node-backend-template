const { DataTypes } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
	return sequelize.define('users', {
		// roles will be a table in the database; convert roles model into MySQL
		username: {
			type: DataTypes.STRING,
		},
		email: {
			type: DataTypes.STRING,
		},
		password: {
			type: DataTypes.STRING,
		},
	});
};
