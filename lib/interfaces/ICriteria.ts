export default interface ICriteria {
	id: string
	title: string
	weight: number
	score?: number
	type: ['Benefit', 'Cost']
}
