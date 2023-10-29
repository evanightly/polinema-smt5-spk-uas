import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify"
import Score from "../models/Score"

module.exports = function (fastify: FastifyInstance, opts: any, done: any) {
    fastify.patch('/:_id', async (req: FastifyRequest, reply: FastifyReply) => {
        const _id = req.params as { _id: string }
        const { score } = req.body as { score: string }
        console.log('updating', score)
        return await Score.findByIdAndUpdate(_id, { score })
    })

    done()
}
