const db = require('../models');

const ROLES = db.ROLES;
const User = db.user;

checkDuplicateData = (request, response, next) => {
	// check if username already exists in database
	User.findOne({
		where: {
			username: request.body.username,
		},
	}).then((user) => {
		// if username already exists, throw an error
		if (user) {
			response.status(400).send({
				message: 'Sign up failed - Username is already in use.',
			});
			return;
		}

		// check if email already exists in database
		User.findOne({
			where: {
				email: request.body.email,
			},
		}).then((user) => {
			// if email already exists, throw an error
			if (user) {
				response.status(400).send({
					message: 'Sign up failed - Email is already in use.',
				});
				return;
			}

			// once all checks are done, go to the next middleware
			next();
		});
	});
};

checkRolesExisted = (request, response, next) => {
	if (request.body.roles) {
		for (const role of request.body.roles) {
			if (!ROLES.includes(role)) {
				response.status(400).send({
					message: 'Sign up failed - Role ' + role + ' does not exist.',
				});
				return;
			}
		}
	}

	// once all checks are done, go to the next middleware
	next();
};

const verifySignUp = {
	checkDuplicateData: checkDuplicateData,
	checkRolesExisted: checkRolesExisted,
};

module.exports = verifySignUp;
