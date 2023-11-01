import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify"
import Alternative from "../models/Alternative"
import { File } from "buffer"

module.exports = function (fastify: FastifyInstance, opts: any, done: any) {
    fastify.post('/import', async (req: FastifyRequest, reply: FastifyReply) => {
        const { file } = req.body as { file: File }
        console.log(req)
        // return await Alternative.create({ studyCase: caseStudy_id, title })
    })


    done()
}
