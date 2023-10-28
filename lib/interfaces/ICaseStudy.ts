import IAlternative from './IAlternative'
import ICriteria from './ICriteria'

export default interface ICaseStudy {
	id: string
	title: string
	description: string
	alternative: [IAlternative]
	criteria: [ICriteria]
	createdAt: Date
}
