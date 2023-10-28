import { writable, type Writable } from 'svelte/store';
import type ICaseStudy from '../../../lib/interfaces/ICaseStudy';

export const caseStudyList: Writable<ICaseStudy[]> = writable();
export const activeCaseStudy: Writable<ICaseStudy> = writable();

export const get = async () => {
	const response = await fetch('http://localhost:1212/case-study/').then(res => res.json()).catch(err => console.log(err))
	caseStudyList.set(response)
};
