import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify"
import CaseStudy from "../models/CaseStudy"

module.exports = function (fastify: FastifyInstance, opts: any, done: any) {
    fastify.get('/', async (req: FastifyRequest, reply: FastifyReply) => {
        return await CaseStudy.find({}, { title: 1 })
    })

    fastify.get('/:_id', async (req: FastifyRequest, reply: FastifyReply) => {
        const _id = req.params as { _id: string }
        console.log(_id)
        return await CaseStudy.findById(_id).populate([
            {
                path: 'alternative',
                model: 'Alternative',
                populate: {
                    path: 'score',
                    model: 'Score'
                },
            },
            {
                path: 'criteria',
                model: 'Criteria'
            },
        ])
    })

    done()
}
