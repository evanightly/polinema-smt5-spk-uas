import { model, Schema } from 'mongoose'
import IStudyCase from '../../lib/interfaces/IStudyCase'

const StudyCaseSchema = new Schema<IStudyCase>({
	id: String,
	title: String
})

export default model('StudyCase', StudyCaseSchema)
