import dotenv from 'dotenv'
import mongoose from "mongoose"
import createSampleData from './functions/createSampleData'
import purge from './functions/purge'
dotenv.config()

const fastify = require('fastify')
const server = fastify()
server.register(require('@fastify/cors'))

server.get('/', async (_request, _reply) => {
	return 'Ok'
})

server.register(require('./routes/case-study'), { prefix: '/case-study' })
server.register(require('./routes/alternative'), { prefix: '/alternative' })
server.register(require('./routes/criteria'), { prefix: '/criteria' })
server.register(require('./routes/score'), { prefix: '/score' })

server.get('/sample', async (_request, _reply) => await createSampleData())

server.get('/purge', async (_request, _reply) => {
	await purge()
	return 'Resetted'
})

mongoose
	.connect(process.env.MONGODB_URI!)
	.then(() => console.log('Database Connected'))
	.catch((err: any) => console.log(err))

server.listen({ port: process.env.SERVER_PORT }, (err, address) => {
	if (err) {
		console.error(err)
		process.exit(1)
	}
	console.log(`Server listening at ${address}`)
})
