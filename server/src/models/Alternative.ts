import { model, Schema, Types } from 'mongoose'
import IAlternative from '../../../lib/interfaces/IAlternative'

const AlternativeSchema = new Schema<IAlternative>({
	id: String,
	title: String,
	studyCase: {type: Types.ObjectId, ref: 'StudyCase'},
	score: [{ type: Types.ObjectId, ref: 'Score' }]
})

export default model('Alternative', AlternativeSchema)
