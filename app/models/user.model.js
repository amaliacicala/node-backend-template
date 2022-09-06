const { DataTypes } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
	return sequelize.define('users', {
		// users will be a table in the database
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
