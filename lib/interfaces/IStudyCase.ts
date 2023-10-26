import IAlternative from './IAlternative'
import ICriteria from './ICriteria'

export default interface IStudyCase {
	id: string
	title: string
	description: string
	alternative: [IAlternative]
	criteria: [ICriteria]
	createdAt: Date
}
