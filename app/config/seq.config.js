const config = require('../config/db.config.js');
const Sequelize = require('sequelize');

// pass the db.config to a new Sequelize object
const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
	host: config.HOST,
	dialect: config.dialect,
	operatorsAliases: false,
	pool: {
		min: config.pool.min,
		max: config.pool.max,
		acquire: config.pool.acquire,
		idle: config.pool.idle,
	},
});

// create db instance
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// import user and role models and assign them to new properties of the db object
db.user = require('../models/user.model')(sequelize, Sequelize);
db.role = require('../models/role.model')(sequelize, Sequelize);

// set user and role models relationships
db.role.belongsToMany(db.user, {
	// one role belongs to many users
	through: 'user_roles', // this is the join
	foreignKey: 'roleId',
	otherKey: 'userId',
});

db.user.belongsToMany(db.role, {
	// one user belongs to many roles
	through: 'user_roles', // this is the join
	foreignKey: 'userId',
	otherKey: 'roleId',
});

db.ROLES = ['user', 'admin', 'editor', 'superAdmin'];

module.exports = db;
