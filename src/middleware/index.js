import { Router } from 'express';

export default ({ config, db }) => {
	let routes = Router();

	// add middleware here
	routes.route('/sstest')
		.get(function(req, res) {
			res.json("I think this works");
		})

	return routes;
}
