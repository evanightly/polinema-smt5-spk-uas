const fastify = require('fastify')

const server = fastify()

server.register(require('@fastify/cors'))

server.get('/', async (request: any, reply: any) => {
	return 'Ok'
})

server.get('/test', async (request: any, reply: any) => {
	return 'Test'
})

const SERVER_PORT: number = Number(process.env.PORT ?? 2121)

server.listen({ port: SERVER_PORT }, (err: any, address: any) => {
	if (err) {
		console.error(err)
		process.exit(1)
	}
	console.log(`Server listening at ${address}`)
})
