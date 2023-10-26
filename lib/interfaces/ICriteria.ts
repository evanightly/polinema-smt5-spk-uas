import IStudyCase from './IStudyCase'

export enum CriteriaType {
	Benefit = 'Benefit',
	Cost = 'Cost'
}

export default interface ICriteria {
	id: string
	title: string
	weight: number
	studyCase: IStudyCase
	type: CriteriaType
}
