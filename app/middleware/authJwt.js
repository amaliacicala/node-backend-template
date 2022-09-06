const jwt = require('jsonwebtoken');
const config = require('../config/auth.config.js');
const db = require('../config/seq.config.js');

const User = db.user;

// middleware which verifies tokens
verifyToken = (request, response, next) => {
	let token = request.headers['x-access-token'];

	if (!token) {
		return response.status(403).send({
			message: 'No token provided.',
		});
	}

	jwt.verify(token, config.secret, (error, decoded) => {
		if (error) {
			return response.status(401).send({
				message: 'Unauthorized.',
			});
		}
		request.userId = decoded.id;
		next(); // go to the next middleware
	});
};

// middleware which checks if user has admin role
isAdmin = (request, response, next) => {
	// Sequelize methods that finds (User) by primary key
	User.findByPk(request.userId).then((user) => {
		user.getRoles().then((roles) => {
			for (const role of roles) {
				// if user has admin role, accept and go to the next middleware
				if (role.name === 'admin') {
					next();
					return;
				}
			}

			// if user does not have admin role, throw an error
			response.status(403).send({
				message: 'Admin role is required.',
			});
		});
	});
};

// middleware which checks if user has editor role
isEditor = (request, response, next) => {
	User.findByPk(request.userId).then((user) => {
		user.getRoles().then((roles) => {
			for (const role of roles) {
				// if user has editor role, accept and go to the next middleware
				if (role.name === 'editor') {
					next();
					return;
				}
			}

			// if user does not have editor role, throw an error
			response.status(403).send({
				message: 'Editor role is required.',
			});
		});
	});
};

// middleware which checks if user has either admin or role editor
isAdminOrEditor = (request, response, next) => {
	User.findByPk(request.userId).then((user) => {
		user.getRoles().then((roles) => {
			for (const role of roles) {
				// if user has either admin or editor role, accept and go to the next middleware
				if (role.name === 'admin') {
					next();
					return;
				}

				if (role.name === 'editor') {
					next();
					return;
				}

				response.status(403).send({
					message: 'Admin or editor role is required.',
				});
			}
		});
	});
};

const authJwt = {
	verifyToken: verifyToken,
	isAdmin: isAdmin,
	isEditor: isEditor,
	isAdminOrEditor: isAdminOrEditor,
};

module.exports = authJwt;
