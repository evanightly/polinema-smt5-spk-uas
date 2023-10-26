import { model, Schema, Types } from 'mongoose'
import ICriteria, { CriteriaType } from '../../lib/interfaces/ICriteria'

const CriteriaSchema = new Schema<ICriteria>({
	id: String,
	title: String,
	weight: Number,
	type: {
		type: String,
		enum: CriteriaType,
	},
	studyCase: { type: Types.ObjectId, ref: 'StudyCase' }
})

export default model('Criteria', CriteriaSchema)
