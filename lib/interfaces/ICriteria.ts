import ICaseStudy from './ICaseStudy'

export enum CriteriaType {
	Benefit = 'Benefit',
	Cost = 'Cost'
}

export default interface ICriteria {
	id: string
	title: string
	weight: number
	studyCase: ICaseStudy
	type: CriteriaType
}
