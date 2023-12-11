<script lang="ts">
	import pivot from '$lib/functions/pivot';
	import type IFinalResult from '$lib/interface/IFinalResult';
	import { activeCaseStudy } from '$lib/stores/caseStudyStore';

	let finalResult: IFinalResult[];
	let finalResultScoreName: string;
	let showDetails: boolean = false;

	const criteriaArray = $activeCaseStudy.criteria;
	const alternativeArray = $activeCaseStudy.alternative;
	const calculateDivider = () => {
		let divider = [];

		for (let i = 0; i < criteriaArray.length; i++) {
			const segment = [];

			for (const alt of alternativeArray) {
				segment.push(alt.score[i]);
			}

			divider.push(segment);
		}

		// 1.A Defining Divider
		return (divider = divider.map((v) =>
			Math.sqrt(v.reduce((acc, current) => acc + Math.pow(current.score, 2), 0))
		));
	};

	const calculateNormalized = (calculatedDivider: number[]) => {
		let normalize = [];
		for (let i = 0; i < criteriaArray.length; i++) {
			const segment = [];

			for (const alt of alternativeArray) {
				segment.push(alt.score[i].score / calculatedDivider[i]);
			}

			normalize.push(segment);
		}

		// 1.B Normalizing Segments
		return normalize;
	};

	const calculateWeightedNormalization = (calculatedNormalized: number[][]) => {
		let weighted: number[][] = [];
		criteriaArray.forEach((c, i) => {
			const segment: number[] = [];
			calculatedNormalized[i].forEach((n) => {
				segment.push(n * c.weight);
			});
			weighted.push(segment);
		});

		// 2. Weighting
		return weighted;
	};

	const calculateIdealSolution = (calculatedWeightedNormalization: number[][]) => {
		// 3.A Defining Maximum Ideal Solution
		const max = calculatedWeightedNormalization.map((segment, i) => {
			if (criteriaArray[i].type === 'Benefit') {
				return Math.max(...segment);
			} else {
				return Math.min(...segment);
			}
		});

		// 3.B Defining Minimum Ideal Solution
		const min = calculatedWeightedNormalization.map((segment, i) => {
			if (criteriaArray[i].type === 'Benefit') {
				return Math.min(...segment);
			} else {
				return Math.max(...segment);
			}
		});

		return { max, min };
	};

	const calculateDistance = (
		calculatedWeightedNormalization: number[][],
		calculatedIdealSolution: { max: number[]; min: number[] }
	) => {
		const pivotedWeight: number[][] = pivot(calculatedWeightedNormalization);
		// 4.A Calculating Max Distance
		const distanceMax = pivotedWeight.map((segment, index) => {
			return Math.sqrt(
				segment
					.map((weight, i) => {
						return Math.pow(weight - calculatedIdealSolution.max[i], 2);
					})
					.reduce((prev, current) => prev + current)
			);
		});

		// 4.B Calculating Min Distance
		const distanceMin = pivotedWeight.map((segment) => {
			return Math.sqrt(
				segment
					.map((weight, i) => {
						return Math.pow(weight - calculatedIdealSolution.min[i], 2);
					})
					.reduce((prev, current) => prev + current)
			);
		});

		return { distanceMax, distanceMin };
	};

	const calculatePreference = (calculatedDistance: {
		distanceMax: number[];
		distanceMin: number[];
	}) => {
		// 5.A Calculate Preference
		return alternativeArray.map((alt, i) => {
			return {
				...alt,
				preference:
					calculatedDistance.distanceMin[i] /
					(calculatedDistance.distanceMin[i] + calculatedDistance.distanceMax[i])
			};
		});
	};

	const calculateRank = (calculatedPreference: any[]) => {
		// 5.B Ranking
		return calculatedPreference.sort((a, b) => {
			if (a.preference < b.preference) {
				return 1;
			} else if (a.preference > b.preference) {
				return -1;
			}
			return 0; // (If Equal then dont sort)
		});
	};

	const applyingFinalResult = (calculatedRank: any[]) => {
		// Mapping
		const scoreName = 'Preference (V)';
		finalResult = calculatedRank.map((result, rank) => ({
			altName: result.title,
			score: result.preference,
			rank: rank + 1
		}));

		finalResultScoreName = scoreName;
	};

	const calculatedDivider = calculateDivider();
	const calculatedNormalized = calculateNormalized(calculatedDivider);
	const calculatedWeightedNormalization = calculateWeightedNormalization(calculatedNormalized);
	const calculatedIdealSolution = calculateIdealSolution(calculatedWeightedNormalization);
	const calculatedDistance = calculateDistance(
		calculatedWeightedNormalization,
		calculatedIdealSolution
	);
	const calculatedPreference = calculatePreference(calculatedDistance);
	const calculatedRank = calculateRank(calculatedPreference);

	applyingFinalResult(calculatedRank);
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

		<div class="collapse bg-base-200 overflow-x-auto">
			<input type="checkbox" name="my-accordion-1" bind:checked={showDetails} />
			<div class="collapse-title text-xl font-medium text-center">Detail Perhitungan</div>
			<div class="collapse-content">
				<p class="text-lg font-bold my-5 ml-4">Pembagi</p>
				<table class="table">
					<thead>
						<tr>
							{#each criteriaArray as criteria}
								<th>{criteria.title}</th>
							{/each}
						</tr>
					</thead>
					<tbody>
						<tr>
							{#each calculatedDivider as div}
								<td>{div}</td>
							{/each}
						</tr>
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
								{#each pivot(calculatedWeightedNormalization)[i] as weight}
									<td>{weight}</td>
								{/each}
							</tr>
						{/each}
					</tbody>
				</table>

				<p class="text-lg font-bold my-5 ml-4">Solusi Ideal</p>
				<table class="table">
					<thead>
						<tr>
							<th>Jarak</th>
							{#each criteriaArray as criteria}
								<th>{criteria.title}</th>
							{/each}
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>A+</td>
							{#each calculatedIdealSolution.max as max}
								<td>{max}</td>
							{/each}
						</tr>
						<tr>
							<td>A-</td>
							{#each calculatedIdealSolution.min as min}
								<td>{min}</td>
							{/each}
						</tr>
					</tbody>
				</table>

				<p class="text-lg font-bold my-5 ml-4">Jarak</p>
				<div class="flex">
					<table class="table">
						<thead>
							<tr>
								<th>D+</th>
							</tr>
						</thead>
						<tbody>
							{#each calculatedDistance.distanceMax as max}
								<tr>
									<td>{max}</td>
								</tr>
							{/each}
						</tbody>
					</table>

					<table class="table">
						<thead>
							<tr>
								<th>D-</th>
							</tr>
						</thead>
						<tbody>
							{#each calculatedDistance.distanceMin as min}
								<tr>
									<td>{min}</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>

				<p class="text-lg font-bold my-5 ml-4">Preference (V)</p>
				<table class="table">
					<thead>
						<tr>
							<th>Alternatif</th>
							<th>Preference (V)</th>
							<th>Rank</th>
						</tr>
					</thead>
					<tbody>
						{#each calculatedPreference as preference, i}
							<tr>
								<td>{preference.title}</td>
								<td>{preference.preference}</td>
								<td>{i + 1}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</div>
	{/if}
</div>
