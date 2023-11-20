<script lang="ts">
	import pivot from '$lib/functions/pivot';
	import type IFinalResult from '$lib/interface/IFinalResult';
	import { activeCaseStudy } from '$lib/stores/caseStudyStore';
	import type IScore from '../../../../lib/interfaces/IScore';

	let finalResult: IFinalResult[];
	let finalResultScoreName: string;
	let showDetails: boolean = false;

	const criteriaArray = $activeCaseStudy.criteria;
	const alternativeArray = $activeCaseStudy.alternative;

	const initialize = () => {
		const initData: IScore[][] = [];
		criteriaArray.forEach((criteria, criteriaIndex) => {
			const helper: IScore[] = [];
			alternativeArray.forEach((alternative, alternativeIndex) => {
				helper.push(alternative.score[criteriaIndex]);
			});
			initData.push(helper);
		});
		return initData;
	};

	const calculateNormalized = (initData: IScore[][]) => {
		const result: number[][] = [];
		const scores = initData.map((segment) => segment.map((score) => score.score));
		scores.forEach((segment, i) => {
			const helper: number[] = [];
			segment.forEach((score, j) => {
				let value;
				if (initData[i][j].criteria.type === 'Benefit') {
					value = score / Math.max(...segment);
				} else {
					value = Math.min(...segment) / score;
				}
				helper.push(value);
			});
			result.push(helper);
		});

		return result;
	};

	const calculateTotalNormalized = (calculatedNormalized: number[][]) => {
		return calculatedNormalized.map((n) => n.reduce((prev, current) => prev + current));
	};

	const calculateMean = (calculatedTotalNormalized: number[]) => {
		const totalAlternatives = alternativeArray.length;
		return calculatedTotalNormalized.map((n) => (1 / totalAlternatives) * n);
	};
	

	const calculatePreferenceVariation = (calculatedNormalized: number[][], calculatedMean: number[]) => {
		return calculatedNormalized.map((segment, i) => {
			// console.log('--------');
			return segment.map((n) => {
				// console.log(rated[i]);
				// console.log(n);
				return Math.pow(n - calculatedMean[i], 2);
			});
		});
	};

	const calculateTotalPreferenceVariation = (calculatedPreferenceVariation: number[][]) => {
		return calculatedPreferenceVariation.map((preference) => {
			return preference.reduce((prev, current) => prev + current);
		});
	};

	const calculateDeviation = (calculatedTotalPreferenceVariation: number[]) => calculatedTotalPreferenceVariation.map((n) => 1 - n);

	const calculateTotalDeviation = (calculatedDeviation: number[]) =>
		calculatedDeviation.reduce((prev, current) => prev + current);

	const calculateWeightCriteria = (calculatedDeviation: number[], calculatedTotalDeviation: number) =>
		calculatedDeviation.map((n) => n / calculatedTotalDeviation);

	const calculatePsiScore = (calculatedNormalized: number[][], calculatedWeightCriteria: number[]) => {
		const psiScores = calculatedNormalized.map((segment, i) => segment.map((n) => n * calculatedWeightCriteria[i]));
		const pivotedPsiScores = pivot(psiScores);
		const result: { title: string; psi: number[]; sum: number }[] = pivotedPsiScores.map(
			(segment: number[], i: number) => ({
				title: alternativeArray[i].title,
				psi: segment,
				sum: segment.reduce((prev, current) => prev + current)
			})
		);

		return result;
	};

	const calculateRank = (calculatedPsiScore: { title: string; psi: number[]; sum: number }[]) => {
		return calculatedPsiScore.sort((a, b) => {
			if (a.sum < b.sum) {
				return 1;
			} else if (a.sum > b.sum) {
				return -1;
			}
			return 0; // (If Equal then dont sort)
		});
	};

	const applyingFinalResult = (calculatedRank: any[]) => {
		// Mapping
		const scoreName = 'Total PSI';
		console.log(calculatedRank);
		finalResult = calculatedRank.map((result, rank) => ({
			altName: result.title,
			score: result.sum,
			rank: rank + 1
		}));

		finalResultScoreName = scoreName;
	};

	const calculatedNormalized = calculateNormalized(initialize());
	const calculatedTotalNormalized = calculateTotalNormalized(calculatedNormalized);
	const calculatedMean = calculateMean(calculatedTotalNormalized);
	const calculatedPreferenceVariation = calculatePreferenceVariation(calculatedNormalized, calculatedMean);
	const calculatedTotalPreferenceVariation = calculateTotalPreferenceVariation(calculatedPreferenceVariation);
	const calculatedDeviation = calculateDeviation(calculatedTotalPreferenceVariation);
	const calculatedTotalDeviation = calculateTotalDeviation(calculatedDeviation);
	const calculatedWeightCriteria = calculateWeightCriteria(calculatedDeviation, calculatedTotalDeviation);
	const calculatedPsiScore = calculatePsiScore(calculatedNormalized, calculatedWeightCriteria);
	const calculatedRank = calculateRank(calculatedPsiScore);

	const pivotedNormalized = pivot(calculatedNormalized);
	const pivotedPreferences = pivot(calculatedPreferenceVariation);

	applyingFinalResult(calculatedRank);
</script>

<svelte:head>
	<title>DSS Result - PSI</title>
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
								{#each pivotedNormalized[i] as normal}
									<td>{normal.toFixed(3)}</td>
								{/each}
							</tr>
						{/each}
						<tr>
							<td class="font-bold">Total</td>
							{#each calculatedTotalNormalized as total}
								<td>{total.toFixed(3)}</td>
							{/each}
						</tr>
					</tbody>
				</table>

				<p class="text-lg font-bold my-5 ml-4">Rata Rata Kinerja</p>
				<table class="table">
					<thead>
						<tr>
							<td />
							{#each criteriaArray as criteria}
								<th>{criteria.title}</th>
							{/each}
						</tr>
					</thead>
					<tbody>
						<tr>
							<td />
							{#each calculatedMean as rate}
								<td>{rate.toFixed(3)}</td>
							{/each}
						</tr>
					</tbody>
				</table>

				<p class="text-lg font-bold my-5 ml-4">Variasi Preferensi</p>
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
								{#each pivotedPreferences[i] as pref}
									<td>{pref.toFixed(3)}</td>
								{/each}
							</tr>
						{/each}
						<tr>
							<td class="font-bold">Total</td>
							{#each calculatedTotalPreferenceVariation as total}
								<td>{total.toFixed(3)}</td>
							{/each}
						</tr>
					</tbody>
				</table>

				<p class="text-lg font-bold my-5 ml-4">Deviasi Nilai Preferensi</p>
				<table class="table">
					<thead>
						<tr>
							<td />
							{#each criteriaArray as criteria}
								<th>{criteria.title}</th>
							{/each}
							<td>Total</td>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td />
							{#each calculatedDeviation as dev}
								<td>{dev.toFixed(3)}</td>
							{/each}
							<td>{calculatedTotalDeviation.toFixed(3)}</td>
						</tr>
					</tbody>
				</table>

				<p class="text-lg font-bold my-5 ml-4">Bobot Kriteria</p>
				<table class="table">
					<thead>
						<tr>
							<td />
							{#each criteriaArray as criteria}
								<th>{criteria.title}</th>
							{/each}
						</tr>
					</thead>
					<tbody>
						<tr>
							<td />
							{#each calculatedWeightCriteria as criteria}
								<td>{criteria.toFixed(3)}</td>
							{/each}
						</tr>
					</tbody>
				</table>

				<p class="text-lg font-bold my-5 ml-4">Skor PSI</p>
				<table class="table">
					<thead>
						<tr>
							<th>Alternatif</th>
							{#each criteriaArray as criteria}
								<th>{criteria.title}</th>
							{/each}
							<td>PSI Sum</td>
							<td>Rank</td>
						</tr>
					</thead>
					<tbody>
						{#each calculatedRank as rank, i}
							<tr>
								<td>{rank.title}</td>
								{#each rank.psi as psi}
									<td>{psi.toFixed(3)}</td>
								{/each}
								<td>{rank.sum.toFixed(3)}</td>
								<td>{i + 1}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</div>
	{/if}
</div>
