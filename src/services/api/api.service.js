const ApiGateway = require('moleculer-web')

/**                                
 * @typedef ServiceRoute           
 * @property {string} path         
 * @property {string} mappingPolicy
 * @property {object} aliases      
 * @property {object} bodyParsers  
 */

const defaultRoutes = [
	{
		path: '/status',
		aliases: {
			'GET /' (req, res) {
				res.end(JSON.stringify({ alive: true }))
			}
		},
		mappingPolicy: 'restrict',
		bodyParsers: {
			json: true
		}
	}
]

module.exports = {
	name: 'Api',
	mixins: [ApiGateway],

	// More info about settings: https://moleculer.services/docs/0.13/moleculer-web.html
	settings: {
		port: process.env.PORT || 3040,
		path: '/api',
		/** @type {ServiceRoute[]} **/
		routes: [
			{
				path: '/webhooks',
				aliases: {
					'POST /habitica': 'habitica.onWebhookTrigger'
				},
				mappingPolicy: 'restrict',
				bodyParsers: {
					json: true
				}
			},

			{
				path: '/habitica/',
				aliases: {
					'GET /tasks/': 'habiticaTask.list',
				},
				mappingPolicy: 'restrict',
				bodyParsers: {
					json: true
				}
			},

			{
				path: '/mocks',
				aliases: {
					'GET /products': 'mocks.getProducts',
					'GET /product/:id': 'mocks.getProductById',
				},
				mappingPolicy: 'restrict',
				bodyParsers: {
					json: true
				},
				cors: {
					origin: ['http://localhost:3000'],
					methods: ['GET'],
					credentials: false
				},
			},

			...defaultRoutes

		]
	},

	methods: {}
}
