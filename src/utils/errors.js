const { Errors } = require('moleculer')

class CustomError extends Errors.MoleculerError {
	constructor(msg, error) {
		super(
			`${msg}: ${error.message}`,
			error.status,
			'CUSTOM_ERROR',
			error.value
		)
	}
}

module.exports = { CustomError }
