import express from 'express';
import cors from 'cors';

const corsOptions = {
	origin: 'http://localhost:8080',
};

const app = express();

// prevent cors errors
app.use(cors(corsOptions));

// parse all requests of content-type (e.g., application/json)
app.use(express.json());

// parse all requests with url-encoded (application-urlencoded)
app.use(express.urlencoded({ extended: true }));

// init first generic route
app.get('/', (request, response) => {
	response.json({ message: 'all ok' });
});

// import auth and user routes
import './routes/auth.routes.js';
import './routes/user.routes.js';

// set PORT and listen
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
	console.log(`[server] Server up and running on port ${PORT}`);
});

// init MySQL database

import db from './config/seq.config.js';
const Role = db.role;

function init() {
	// create new Role properties for the db object with the roles defined in db.ROLES
	Role.create({
		id: 1,
		name: 'user',
	});

	Role.create({
		id: 2,
		name: 'admin',
	}),
		Role.create({
			id: 3,
			name: 'editor',
		}),
		Role.create({
			id: 4,
			name: 'superAdmin',
		});
}

// synchronize database
db.sequelize.sync().then(() => {
	console.log('Database up');
	init();
});
