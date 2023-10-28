import { model, Schema, Types } from 'mongoose'
import ICaseStudy from '../../../lib/interfaces/ICaseStudy'

const CaseStudySchema = new Schema<ICaseStudy>({
	id: String,
	title: String,
	description: String,
	alternative: [{ type: Types.ObjectId, ref: 'Alternative' }],
	criteria: [{ type: Types.ObjectId, ref: 'Criteria' }],
})

export default model('StudyCase', CaseStudySchema)
