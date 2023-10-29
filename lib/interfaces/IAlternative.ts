import ICaseStudy from './ICaseStudy'
import IScore from './IScore'

export default interface IAlternative {
	id: string
	title: string
	studyCase: ICaseStudy
	score: [IScore]
}
