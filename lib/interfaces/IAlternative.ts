import ICaseStudy from './ICaseStudy'
import ICriteria from './ICriteria'

export default interface IAlternative {
	id: string
	title: string
	studyCase: ICaseStudy
	score: [ICriteria]
}
