import { writable, type Writable } from 'svelte/store';
import type ICaseStudy from '../../../../lib/interfaces/ICaseStudy';

export const caseStudyList: Writable<ICaseStudy[]> = writable();
export const selectedCaseStudy: Writable<ICaseStudy> = writable();
export const activeCaseStudy: Writable<ICaseStudy> = writable();

selectedCaseStudy.subscribe(async (caseStudy) => {
	console.log('changed', caseStudy)
	if (caseStudy && caseStudy._id) {
		const response = await getCaseStudy(caseStudy._id)
		activeCaseStudy.set(response)
	}
})

export const getCaseStudyList = async () => {
	const response = await fetch(`http://localhost:1212/case-study/`).then(res => res.json()).catch(err => console.log(err))
	caseStudyList.set(response)
	console.log('get')
};

export const getCaseStudy = async (_id: string) => {
	const response = await fetch(`http://localhost:1212/case-study/${_id}`).then(res => res.json()).catch(err => console.log(err))
	return response
}