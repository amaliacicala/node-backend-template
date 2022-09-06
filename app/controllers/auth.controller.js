const db = require('../models');
const config = require('../config/auth.config');

const User = db.user;
const Role = db.role;
const Op = db.Sequelize.Op; // import operators (basic: and, or, equals, not equal, etc; comparisons: greater, not greater, etc.)

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// signup controller
exports.signup = (request, response) => {
	// save user to database
	User.create({
		username: request.body.username,
		email: request.body.email,
		password: bcrypt.hashSync(request.body.password, 8), // synchronously generate a 8-character hash for the given string (password)
	})
		.then((user) => {
			if (request.body.roles) {
				// if user already corresponds to a role, merge the data
				Role.findAll({
					where: {
						name: {
							[Op.or]: request.body.roles,
						},
					},
				}).then((roles) => {
					user.setRoles(roles).then(() => {
						response.send({ message: 'User registered successfully.' });
					});
				});
			} else {
				// if user does not have a role, set it to 1 (user role)
				user.setRoles([1]).then(() => {
					response.send({ message: 'User registered successfully.' });
				});
			}
		})
		.catch((error) => {
			response.status(500).send({ message: error.message });
		});
};

// signin controller
exports.signin = (request, response) => {
	// fetch user from database
	User.findOne({
		where: {
			username: request.body.username,
		},
	})
		.then((user) => {
			if (!user) {
				// if user does not exist in the database
				return response.status(404).send({ message: 'User not found.' });
			}

			// check encrypted password validity
			const passwordIsValid = bcrypt.compareSync(
				request.body.password,
				user.password
			);

			// if password is not valid, do not set an access token and throw an error
			if (!passwordIsValid) {
				return response.status(401).send({
					accessToken: null,
					message: 'Password is invalid.',
				});
			}

			// take secret from auth.config.js
			const token = jwt.sign({ id: user.id }, config.secret, {
				expiresIn: 86400, // 24 hours in milliseconds
			});

			// push roles into a new authorities array with the syntax: ROLES_ROLE
			const authorities = [];
			user.getRoles().then((roles) => {
				for (const role of roles) {
					authorities.push('ROLE_' + role.name.toUpperCase());
				}
				response.status(200).send({
					id: user.id,
					username: user.username,
					email: user.email,
					roles: authorities,
					accessToken: token,
				});
			});
		})
		.catch((error) => {
			response.status(500).send({ message: error.message });
		});
};
