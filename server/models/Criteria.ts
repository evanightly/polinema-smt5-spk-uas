import { model, Schema } from 'mongoose'
import ICriteria from '../../lib/interfaces/ICriteria'

const CriteriaSchema = new Schema<ICriteria>({
	id: String,
	title: String,
	weight: Number,
	type: ['Benefit', 'Cost']
})

export default model('Criteria', CriteriaSchema)
