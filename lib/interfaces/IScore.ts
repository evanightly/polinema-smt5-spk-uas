import IAlternative from "./IAlternative"
import ICriteria from "./ICriteria"

export default interface IScore {
	id: string
	alternative: IAlternative
	criteria: ICriteria
	score: number
}
