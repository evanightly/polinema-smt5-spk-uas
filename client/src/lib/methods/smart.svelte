<script lang="ts">
	import pivot from '$lib/functions/pivot';
	import type IFinalResult from '$lib/interface/IFinalResult';
	import { activeCaseStudy } from '$lib/stores/caseStudyStore';
	import type IAlternative from '../../../../lib/interfaces/IAlternative';
	import type ICriteria from '../../../../lib/interfaces/ICriteria';
	import { CriteriaType } from '../../../../lib/interfaces/ICriteria';

	let finalResult: IFinalResult[];
	let finalResultScoreName: string;
	let showDetails: boolean = false;

	const criteriaArray = $activeCaseStudy.criteria;
	const alternativeArray = $activeCaseStudy.alternative;

	const calculateUtility = (criteriaArray: ICriteria[], alternativeArray: IAlternative[]) => {
		let utility: number[][] = [];

		criteriaArray.forEach((c, i) => {
			const segment: number[] = [];
			const max = Math.max(...alternativeArray.map((a) => a.score[i].score));
			const min = Math.min(...alternativeArray.map((a) => a.score[i].score));

			if (c.type === CriteriaType.Benefit) {
				alternativeArray.forEach((a) => {
					segment.push((a.score[i].score - min) / (max - min));
				});
			} else {
				alternativeArray.forEach((a) => {
					segment.push((max - a.score[i].score) / (max - min));
				});
			}

			utility.push(segment);
		});

		return utility;
	};

	const calculateFinalResult = (calculatedUtility: number[][], criteriaArray: ICriteria[]) => {
		let finalResult: IFinalResult[] = [];
		calculatedUtility = pivot(calculatedUtility);

		const result = calculatedUtility.map((u, i) =>
			u.map((v, j) => v * criteriaArray[j].weight).reduce((acc, current) => acc + current, 0)
		);

		finalResult = alternativeArray.map((a, i) => {
			return {
				altName: a.title,
				score: result[i],
				rank: 0
			};
		});

		finalResult.sort((a, b) => b.score - a.score);

		finalResult.forEach((r, i) => {
			r.rank = i + 1;
		});

		return finalResult;
	};

	const applyingFinalResult = (calculatedFinalResult: IFinalResult[]) => {
		finalResult = calculatedFinalResult;
		finalResultScoreName = 'Final Result';
	};

	const calculatedUtility = calculateUtility(criteriaArray, alternativeArray);
	const calculatedFinalResult = calculateFinalResult(calculatedUtility, criteriaArray);
	applyingFinalResult(calculatedFinalResult);
</script>

<svelte:head>
	<title>DSS Result - Smart</title>
</svelte:head>

<div class="flex flex-col gap-5 mt-5">
	{#if finalResult && finalResultScoreName}
		<table class="table">
			<thead>
				<tr>
					<th>Alternative</th>
					<th>{finalResultScoreName}</th>
					<th>Rank</th>
				</tr>
			</thead>

			<tbody>
				{#each finalResult as result}
					<tr>
						<td>{result.altName}</td>
						<td>{result.score}</td>
						<td>{result.rank}</td>
					</tr>
				{/each}
			</tbody>
		</table>

		<div class="collapse bg-base-200 overflow-x-auto">
			<input type="checkbox" name="my-accordion-1" bind:checked={showDetails} />
			<div class="collapse-title text-xl font-medium text-center">Detail Perhitungan</div>
			<div class="collapse-content">
				<p class="text-lg font-bold my-5 ml-4">Utility</p>
				<table class="table">
					<thead>
						<tr>
							<th>Alternatif</th>
							{#each criteriaArray as criteria}
								<th>{criteria.title}</th>
							{/each}
						</tr>
					</thead>
					<tbody>
						{#each calculatedUtility as utility, i}
							<tr>
								<td>{alternativeArray[i].title}</td>
								{#each utility as u}
									<td>{u}</td>
								{/each}
							</tr>
						{/each}
					</tbody>
				</table>

				<p class="text-lg font-bold my-5 ml-4">Final Result</p>
				<table class="table">
					<thead>
						<tr>
							<th>Alternatif</th>
							<th>Score</th>
							<th>Rank</th>
						</tr>
					</thead>
					<tbody>
						{#each calculatedFinalResult as result}
							<tr>
								<td>{result.altName}</td>
								<td>{result.score}</td>
								<td>{result.rank}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</div>
	{/if}
</div>
