import ICriteria from "./ICriteria"

export default interface IAlternative {
	id: string
	title: string
	score: [ICriteria]
}
