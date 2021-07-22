const axios = require('axios')

/**
 * @typedef HabiticaTask
 *
 * @property { String } _id
 * @property { String } userId
 * @property { String } text
 * @property { String } [alias]
 * @property { String } type
 * @property { String } [notes]
 * @property { Number } [value]
 * @property { Number } [priority]
 * @property { Date } [date]
 * @property { String } [attribute]
 * @property { String } createdAt
 * @property { String } [updatedAt]
 * @property { Boolean } [completed]
 */

module.exports = {
	name: 'habiticaTask',

	mixins: [axios],

	/**
	 * Service settings.
	 */
	settings: {
		axios: {
			baseURL: 'https://habitica.com/api/v3/',
			timeout: 5000,
			headers: {
				'Content-Type': 'application/json',
				'x-api-user': `${process.env.HABITICA_USER}`,
				'x-api-key': `${process.env.HABITICA_TOKEN}`,
				'x-client': `${process.env.HABITICA_USER}-Testing`
			}
		}
	},

	/**
	 * Actions.
	 */
	actions: {
		create: {
			/**
			 * Creates a task
			 *
			 * @param { import('moleculer').Context } ctx - Moleculer context.
			 * @returns { HabiticaTask } Habitica created task.
			 */
			handler (ctx) {
				return this.createTask(ctx.params)
			}
		},

		update: {
			/**
			 * Updates a task
			 *
			 * @param { import('moleculer').Context } ctx - Moleculer context.
			 * @returns { HabiticaTask } Habitica updated task.
			 */
			handler (ctx) {
				return this.updateTask(ctx.params)
			}
		},

		list: {
			/**
			 * Lists all tasks
			 *
			 * @param { import('moleculer').Context } ctx - Moleculer context.
			 * @returns { HabiticaTask[] } Habitica tasks
			 */
			handler (ctx) {
				return this.listTasks()
			}
		},

		getTaskById: {
			params: {
				taskId: { type: 'string' }
			},

			/**
			 * Gets an Habitica task by its id
			 * 			 *
			 * @param { import('moleculer').Context } ctx - Moleculer context.
			 * @returns { HabiticaTask } Habitica  task.
			 */
			handler (ctx) {
				const response = this.getTaskById(ctx.params.taskId)
				return response
			}
		}
	},

	/**
	 * Methods.
	 */
	methods: {
		/**
		 * Gets user's tasks
		 * @returns { Promise.<HabiticaTask> } tasks
		 */
		async listTasks () {
			try {
				const {
					data: { data: tasks }
				} = await this.axios.get('/tasks/user')
				return tasks
			} catch (error) {
				console.log(error)
				return [{ error }]
			}
		},

		/**
		 * Updates a web Habitica task
		 *
		 * @param { HabiticaTask } taskData task
		 * @returns { Promise.<HabiticaTask> } updated web task
		 */
		async updateTask (taskData) {
			try {
				const {
					data: { data: task }
				} = await this.axios.put(`/tasks/${taskData.id}`, taskData)
				return task
			} catch (error) {
				console.log(error)
				return error
			}
		},

		/**
		 * Creates a task in Habiticas's website
		 *
		 * @param { HabiticaTask } taskData - Habitica task create params.
		 * @returns { Promise.<HabiticaTask> } created web task
		 */
		async createTask (taskData) {
			try {
				const {
					data: { data: task }
				} = await this.axios.post('/tasks/user', taskData)
				return task
			} catch (error) {
				console.log(error)
				return error
			}
		},

		/**
		 * Get an Habitica task by its id.
		 *
		 * @param { string } id - Task id.
		 * @returns { Promise.<HabiticaTask> } Related task found.
		 */
		async getTaskById (id) {
			try {
				const {
					data: { data: task }
				} = await this.axios.get(`/tasks/${id}`)
				return task
			} catch (error) {
				const { response } = error

				if (response && response.status === 404) {
					console.log(response.data.message)
					return null
				}

				console.log(error)
				throw new Error(`There's been a problem finding the Habitica task related to "${id}"`, error)
			}
		},

	},

	/**
	 * Service created lifecycle event handler.
	 */
	created () {
		this.axios = axios.create({
			baseURL: this.settings.axios.baseURL,
			timeout: this.settings.axios.timeout,
			headers: this.settings.axios.headers
		})
	},

	/**
	 * Service started lifecycle event handler.
	 */
	started () { },

	/**
	 * Service stopped lifecycle event handler.
	 */
	stopped () { }
}
