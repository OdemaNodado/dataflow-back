module.exports = {
	client: 'postgresql',
	connection: {
		host: '10.2.1.18',
		port: '5432',
		database: 'dataflow',
		user: 'dataflow',
		password: 'Pw_flow01'
	},
	pool: {
		min: 20,
		max: 100
	}
};
