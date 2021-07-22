const ApiGateway = require('moleculer-web')

module.exports = {
	name: 'Api',
	mixins: [ApiGateway],

	// More info about settings: https://moleculer.services/docs/0.13/moleculer-web.html
	settings: {
		port: process.env.PORT || 3040,
		path: '/api',
		routes: [
			{
				path: '/webhooks',
				mappingPolicy: 'restrict',
				aliases: {
					'POST /habitica': 'habitica.onWebhookTrigger'
				},
				bodyParsers: {
					json: true
				}
			},
			
			{
				path: '/habitica/',
				mappingPolicy: 'restrict',
				aliases: {
					'GET /tasks/': 'habiticaTask.list',
				},
				bodyParsers: {
					json: true
				}
			},

			{
				mappingPolicy: 'restrict',
				path: '/status',
				aliases: {
					'GET /'(req, res) {
						res.end(JSON.stringify({ alive: true }))
					}
				},
				bodyParsers: {
					json: true
				}
			},

			{
				mappingPolicy: 'restrict',
				path: '/mocks',
				aliases: {
					'GET /products': 'mocks.getProducts',
					'GET /product/:id': 'mocks.getProductById',
				},
				bodyParsers: {
					json: true
				},
				cors: {
					origin: [ 'http://localhost:3000' ],
					methods: ['GET'],
					credentials: false
				},
			}

		]
	},

	methods: {}
}
