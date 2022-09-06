const { DataTypes } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
	return sequelize.define('roles', {
		// roles will be a table in the database
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
		},
		name: {
			type: DataTypes.STRING,
		},
	});
};
