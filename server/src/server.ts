import fastify from 'fastify'

const server = fastify()

server.register(require('@fastify/cors'))

server.get('/', async (request, reply) => {
	return 'Ok'
})

server.get('/test', async (request, reply) => {
	return 'Test'
})

const SERVER_PORT: number = Number(process.env.PORT) ?? 2121

server.listen({ port: SERVER_PORT }, (err, address) => {
	if (err) {
		console.error(err)
		process.exit(1)
	}
	console.log(`Server listening at ${address}`)
})
