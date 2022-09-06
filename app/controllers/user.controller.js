// dashboards showing content based on user role

exports.allAccess = (request, response) => {
	response.status(200).send('Public content');
};

exports.userBoard = (request, response) => {
	response.status(200).send('User content');
};

exports.adminBoard = (request, response) => {
	response.status(200).send('Admin content');
};

exports.editorBoard = (request, response) => {
	response.status(200).send('Editor content');
};
