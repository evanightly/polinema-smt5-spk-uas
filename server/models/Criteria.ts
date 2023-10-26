import { model, Schema, Types } from 'mongoose'
import ICriteria from '../../lib/interfaces/ICriteria'

const CriteriaSchema = new Schema<ICriteria>({
	id: String,
	title: String,
	weight: Number,
	type: ['Benefit', 'Cost'],
	studyCase: {type: Types.ObjectId, ref: 'StudyCase'}
})

export default model('Criteria', CriteriaSchema)
