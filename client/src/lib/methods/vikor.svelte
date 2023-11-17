<script lang="ts">
	import pivot from '$lib/functions/pivot';
	import type IFinalResult from '$lib/interface/IFinalResult';
	import { activeCaseStudy } from '$lib/stores/caseStudy';
	import type IAlternative from '../../../../lib/interfaces/IAlternative';
	import type ICriteria from '../../../../lib/interfaces/ICriteria';
	let finalResult: IFinalResult[];
	let finalResultScoreName: string;
	let showDetails: boolean = false;
	let V = 0.5;

	const criteriaArray = $activeCaseStudy.criteria;
	const alternativeArray = $activeCaseStudy.alternative;

	const calculateFixedWeight = (criteriaArray: ICriteria[]) => {
		const criteria = criteriaArray.map((c) => c.weight);
		const total = criteria.reduce((acc, current) => acc + current);
		return criteria.map((c) => c / total);
	};

	const calculateNormalized = (alternativeArray: IAlternative[]) => {
		const scores: number[][] = pivot(alternativeArray.map((a) => a.score.map((s) => s.score)));
		const normalized: number[][] = [];

		// max each criteria
		const max = scores.map((s) => Math.max(...s));

		// min each criteria
		const min = scores.map((s) => Math.min(...s));

		scores.map((scores, i) => {
			const segment: number[] = [];
			scores.map((score, j) => {
				const value = (max[i] - score) / (max[i] - min[i]);
				segment.push(value);
			});
			normalized.push(segment);
		});

		return normalized;
	};

	const calculateWeightedNormalization = (
		calculatedNormalized: number[][],
		calculatedFixedWeight: number[]
	) => {
		const weightedScores: number[][] = [];

		calculatedNormalized.map((scores, i) => {
			const segment: number[] = [];
			scores.map((score, j) => {
				segment.push(score * calculatedFixedWeight[i]);
			});
			weightedScores.push(segment);
		});

		return weightedScores;
	};

	const calculateSScore = (calculatedWeightedScore: number[][]) =>
		pivot(calculatedWeightedScore).map((s: number[]) => s.reduce((acc, current) => acc + current));

	const calculateRScore = (calculatedWeightedScore: number[][]) =>
		pivot(calculatedWeightedScore).map((scores: number[]) => Math.max(...scores));

	const calculateQScore = (sScores: number[], rScores: number[]) => {
		const qScores: number[] = [];

		sScores.map((sScore, i) => {
			qScores.push(
				((sScore - Math.min(...sScores)) / (Math.max(...sScores) - Math.min(...sScores))) * V +
					((rScores[i] - Math.min(...rScores)) / (Math.max(...rScores) - Math.min(...rScores))) *
						(1 - V)
			);
		});

		return qScores;
	};

	const calculateRanks = (qScores: number[]) => {
		const ranks: {
			title: string;
			qScore: number;
			rank: number;
		}[] = [];

		const sorted = [...qScores].sort((a, b) => {
			if (a > b) {
				return 1;
			} else if (a < b) {
				return -1;
			}
			return 0; // (If Equal then dont sort)
		});

		qScores.map((qScore, i) => {
			ranks.push({
				title: alternativeArray[i].title,
				qScore: qScore,
				rank: sorted.indexOf(qScore) + 1
			});
		});

		return ranks;
	};

	const applyingFinalResult = (calculatedRanks: any[]) => {
		// Mapping
		const scoreName = 'Q Score';
		finalResult = calculatedRanks.map((result, rank) => ({
			altName: result.title,
			score: result.qScore,
			rank: result.rank
		}));

		finalResult.sort((a, b) => {
			if (a.rank > b.rank) {
				return 1;
			} else if (a.rank < b.rank) {
				return -1;
			}
			return 0; // (If Equal then dont sort)
		});

		finalResultScoreName = scoreName;
	};

	const calculatedFixedWeight = calculateFixedWeight(criteriaArray);
	const calculatedNormalized = calculateNormalized(alternativeArray);
	const calculatedWeightedNormalization = calculateWeightedNormalization(
		calculatedNormalized,
		calculatedFixedWeight
	);
	const sScores = calculateSScore(calculatedWeightedNormalization);
	const rScores = calculateRScore(calculatedWeightedNormalization);
	const qScores = calculateQScore(sScores, rScores);
	const calculatedRanks = calculateRanks(qScores);
	applyingFinalResult(calculatedRanks);
</script>

<svelte:head>
	<title>DSS Result - Topsis</title>
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

				<p class="text-lg font-bold my-5 ml-4">Normalisasi Terbobot</p>
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
								{#each pivot(calculatedWeightedNormalization)[i] as normal}
									<td>{normal}</td>
								{/each}
							</tr>
						{/each}
					</tbody>
				</table>

				<div class="flex flex-1">
					<div class="flex flex-1 flex-col">
						<p class="text-lg font-bold my-5 ml-4">Utility Measure (S)</p>
						<table class="table">
							<thead>
								<tr>
									<th>S</th>
									<th>Nilai S</th>
								</tr>
							</thead>
							<tbody>
								{#each alternativeArray as alternative, i}
									<tr>
										<td>S{i + 1}</td>
										<td>
											{sScores[i]}
										</td>
									</tr>
								{/each}
							</tbody>
						</table>
					</div>
					<div class="flex flex-1 flex-col">
						<p class="text-lg font-bold my-5 ml-4">Regret Measure (R)</p>
						<table class="table">
							<thead>
								<tr>
									<th>R</th>
									<th>Nilai R</th>
								</tr>
							</thead>
							<tbody>
								{#each alternativeArray as alternative, i}
									<tr>
										<td>R{i + 1}</td>
										<td>
											{rScores[i]}
										</td>
									</tr>
								{/each}
							</tbody>
						</table>
					</div>
				</div>

				<p class="text-lg font-bold mt-5 ml-4">Nilai Indeks VIKOR (Q)</p>
				<p class="text-lg font-semibold mb-5 ml-4">V = {V}</p>
				<table class="table">
					<thead>
						<tr>
							<th>Alternatif</th>
							<th>Q Score</th>
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
			</div>
		</div>
	{/if}
</div>
