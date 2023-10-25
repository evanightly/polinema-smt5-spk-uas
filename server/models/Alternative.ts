import { model, Schema, Types } from 'mongoose'
import IAlternative from '../../lib/interfaces/IAlternative'

const AlternativeSchema = new Schema<IAlternative>({
	id: String,
	title: String,
	score: [{ type: Types.ObjectId, ref: 'Criteria' }]
})

export default model('Alternative', AlternativeSchema)
