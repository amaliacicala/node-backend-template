const { verifySignUp } = require('../middleware');
const controller = require('../controllers/auth.controller.js');

module.exports = function (app) {
	// set response header
	app.use(function (request, response, next) {
		response.header(
			'Access-Control-Allow-Headers',
			'x-access-token, Origin, Content-Type, Accept'
		);
		next();
	});

	// access signup route once all checks from verifySignUp middleware and signup auth controller pass
	app.post(
		'/api/auth/signup',
		[verifySignUp.checkDuplicateData, verifySignUp.checkRolesExisted],
		controller.signup
	);

	// access signin route once all checks from signin auth controller pass
	app.post('/api/auth/signin', [controller.signin]);
};
