import ICriteria from './ICriteria'
import IStudyCase from './IStudyCase'

export default interface IAlternative {
	id: string
	title: string
	studyCase: IStudyCase
	score: [ICriteria]
}
