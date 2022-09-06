const { authJwt } = require('../middleware');
const controller = require('../controllers/user.controller.js');

module.exports = function (app) {
	// set response header
	app.use(function (request, response, next) {
		response.header(
			'Access-Control-Allow-Headers',
			'x-access-token, Origin, Content-Type, Accept'
		);
		next();
	});

	// access /all route if user is not authenticated
	app.get('/api/test/all', controller.allAccess);

	// access /user route if user's token has been verified and user has user role
	app.get('/api/test/user', [authJwt.verifyToken], controller.userBoard);

	// access /editor route if user's token has been verified, editor role has been verified, and user has editor role
	app.get(
		'/api/test/editor',
		[authJwt.verifyToken, authJwt.isEditor],
		controller.editorBoard
	);

	// access /admin route if user's token has been verified, admin role has been verified, and user has admin role
	app.get(
		'/api/test/admin',
		[authJwt.verifyToken, authJwt.isAdmin],
		controller.adminBoard
	);
};
