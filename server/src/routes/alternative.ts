import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify"
import Alternative from "../models/Alternative"

module.exports = function (fastify: FastifyInstance, opts: any, done: any) {
    fastify.patch('/:_id', async (req: FastifyRequest, reply: FastifyReply) => {
        const _id = req.params as { _id: string }
        const { title } = req.body as { title: string }
        console.log('updating', title)
        return await Alternative.findByIdAndUpdate(_id, { title })
    })

    done()
}
