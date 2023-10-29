import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify"
import Criteria from "../models/Criteria"

module.exports = function (fastify: FastifyInstance, opts: any, done: any) {
    fastify.patch('/:_id', async (req: FastifyRequest, reply: FastifyReply) => {
        const _id = req.params as { _id: string }
        const { score } = req.body as { score: string }
        return await Criteria.findByIdAndUpdate(_id, { score })
    })

    done()
}
