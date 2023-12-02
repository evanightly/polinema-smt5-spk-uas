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

	const calculateNormalized = (alternativeArray: IAlternative[], criteriaArray: ICriteria[]) => {
		const scores: number[][] = pivot(alternativeArray.map((a) => a.score.map((s) => s.score)));

		const normalized = criteriaArray.map((criteria, i) => {
			const segment: number[] = [];
			scores[i].map((score, j) => {
				if (criteria.type === CriteriaType.Benefit) {
					const value = score / Math.max(...scores[i]);
					segment.push(value);
				} else {
					const value = Math.min(...scores[i]) / score;
					segment.push(value);
				}
			});
			return segment;
		});

		return normalized;
	};

	const calculateQ1A = (normalized: number[][], criteriaArray: ICriteria[]) => {
		const q1aMatrix = normalized.map((segment, i) => {
			return segment.map((score, j) => {
				const value = score * criteriaArray[i].weight;
				return value;
			});
		});

		const q1aTotal = q1aMatrix.reduce((prev, current) => {
			return prev.map((score, i) => score + current[i]);
		});

		const q1aMultiplied = q1aTotal.map((score, i) => score * 0.5);

		return q1aMultiplied;
	};

	const calculateQ1B = (normalized: number[][], criteriaArray: ICriteria[]) => {
		const q1bMatrix = normalized.map((segment, i) => {
			return segment.map((score, j) => {
				const value = score ** criteriaArray[i].weight;
				return value;
			});
		});

		const q1bProduct = q1bMatrix.reduce((prev, current) => {
			return prev.map((score, i) => score * current[i]);
		});

		const q1bMultiplied = q1bProduct.map((score, i) => score * 0.5);

		return q1bMultiplied;
	};

	const calculateQi = (
		calculatedQ1A: number[],
		calculatedQ1B: number[],
		alternativeArray: IAlternative[]
	) => {
		const score = calculatedQ1A.map((score, i) => score + calculatedQ1B[i]);

		return alternativeArray.map((alt, i) => {
			return {
				altName: alt.title,
				score: score[i],
				rank: 0
			};
		});
	};

	const applyingFinalResult = (calculatedQi: IFinalResult[]) => {
		// Mapping
		const scoreName = 'Qi Score';
		finalResult = calculatedQi.map((result) => ({
			altName: result.altName,
			score: result.score,
			rank: result.rank
		}));

		finalResult.sort((a, b) => {
			if (a.score > b.score) {
				return 1;
			} else if (a.score < b.score) {
				return -1;
			}
			return 0; // (If Equal then dont sort)
		});

		// Reverse, then append the rank based on sorted score
		finalResult.reverse().map((result, i) => (result.rank = i + 1));

		console.log(finalResult);
		finalResultScoreName = scoreName;
	};

	const calculatedNormalized = calculateNormalized(alternativeArray, criteriaArray);
	const calculatedQ1A = calculateQ1A(calculatedNormalized, criteriaArray);
	const calculatedQ1B = calculateQ1B(calculatedNormalized, criteriaArray);
	const calculatedQi = calculateQi(calculatedQ1A, calculatedQ1B, alternativeArray);
	applyingFinalResult(calculatedQi);
</script>

<svelte:head>
	<title>DSS Result - Moora</title>
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

		<div class="collapse bg-base-200">
			<input type="checkbox" name="my-accordion-1" bind:checked={showDetails} />
			<div class="collapse-title text-xl font-medium text-center">Detail Perhitungan</div>
			<div class="collapse-content">
				<p class="text-lg font-bold my-5 ml-4">Normalisasi</p>
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
						{#each alternativeArray as alternative, i}
							<tr>
								<td>{alternative.title}</td>
								{#each pivot(calculatedNormalized)[i] as normal}
									<td>{normal}</td>
								{/each}
							</tr>
						{/each}
					</tbody>
				</table>

				<p class="text-lg font-bold my-5 ml-4">Normalisasi</p>
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
						{#each alternativeArray as alternative, i}
							<tr>
								<td>{alternative.title}</td>
								{#each calculatedNormalized[i] as normal}
									<td>{normal}</td>
								{/each}
							</tr>
						{/each}
					</tbody>
				</table>

				<p class="text-lg font-bold my-5 ml-4">Q1A</p>
				<table class="table">
					<thead>
						<tr>
							<th>Alternatif</th>
							<th>Q1A</th>
						</tr>
					</thead>
					<tbody>
						{#each alternativeArray as alternative, i}
							<tr>
								<td>{alternative.title}</td>
								<td>{calculatedQ1A[i]}</td>
							</tr>
						{/each}
					</tbody>
				</table>

				<p class="text-lg font-bold my-5 ml-4">Q1A</p>
				<table class="table">
					<thead>
						<tr>
							<th>Alternatif</th>
							<th>Q1B</th>
						</tr>
					</thead>
					<tbody>
						{#each alternativeArray as alternative, i}
							<tr>
								<td>{alternative.title}</td>
								<td>{calculatedQ1B[i]}</td>
							</tr>
						{/each}
					</tbody>
				</table>

				<p class="text-lg font-bold my-5 ml-4">Qi Score</p>
				<table class="table">
					<thead>
						<tr>
							<th>Alternatif</th>
							<th>Qi</th>
							<th>Rank</th>
						</tr>
					</thead>
					<tbody>
						{#each finalResult as rank}
							<tr>
								<td>{rank.altName}</td>
								<td>{rank.score}</td>
								<td>{rank.rank}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</div>
	{/if}
</div>
