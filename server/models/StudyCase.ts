import { model, Schema, Types } from 'mongoose'
import IStudyCase from '../../lib/interfaces/IStudyCase'

const StudyCaseSchema = new Schema<IStudyCase>({
	id: String,
	title: String,
	description: String,
	alternative: [{ type: Types.ObjectId, ref: 'Alternative' }],
	criteria: [{ type: Types.ObjectId, ref: 'Criteria' }],
	createdAt: Date.now()
})

export default model('StudyCase', StudyCaseSchema)
