import fastify from 'fastify'

const server = fastify()

server.get('/', async (request, reply) => {
	return 'Ok'
})

server.get('/test', async (request, reply) => {
	return 'Test'
})

const SERVER_PORT: number = Number(process.env.PORT || 3000)

server.listen({ port: SERVER_PORT }, (err, address) => {
	console.log(SERVER_PORT)
	if (err) {
		console.error(err)
		process.exit(1)
	}
	console.log(`Server listening at ${address}`)
})
