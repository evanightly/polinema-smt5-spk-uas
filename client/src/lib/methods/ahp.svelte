<script lang="ts">
	import pivot from '$lib/functions/pivot';
	import type IFinalResult from '$lib/interface/IFinalResult';
	import { activeCaseStudy } from '$lib/stores/caseStudyStore';

	let finalResult: IFinalResult[];
	let finalResultScoreName: string;
	let showDetails: boolean = false;

	const criteriaArray = $activeCaseStudy.criteria;
	const alternativeArray = $activeCaseStudy.alternative;

	// Example: Pairwise comparison matrix for criteria (should be user input, here we use equal weights)
	const pairwiseMatrix: number[][] = Array(criteriaArray.length)
		.fill(0)
		.map((_, i) => Array(criteriaArray.length).fill(1));

	// Normalize pairwise matrix
	const normalizeMatrix = (matrix: number[][]) => {
		const colSum = matrix[0].map((_, j) => matrix.reduce((sum, row) => sum + row[j], 0));
		return matrix.map(row => row.map((val, j) => val / colSum[j]));
	};

	// Calculate priority vector (eigenvector)
	const calculatePriorityVector = (normMatrix: number[][]) => {
		return normMatrix.map(row => row.reduce((sum, val) => sum + val, 0) / row.length);
	};

	// Calculate consistency ratio (optional, not shown in UI)
	const calculateConsistency = (matrix: number[][], priorityVector: number[]) => {
		const n = matrix.length;
		const weightedSum = matrix.map((row, i) => row.reduce((sum, val, j) => sum + val * priorityVector[j], 0));
		const lambdaMax = weightedSum.reduce((sum, val, i) => sum + val / priorityVector[i], 0) / n;
		const ci = (lambdaMax - n) / (n - 1);
		const ri = [0, 0, 0.58, 0.9, 1.12, 1.24, 1.32, 1.41, 1.45, 1.49][n - 1] || 1.49;
		const cr = ci / ri;
		return { ci, cr };
	};

	// Calculate alternative scores
	const calculateAlternativeScores = (priorityVector: number[]) => {
		// Ensure all scores are numbers and fallback to 0 if missing
		const scores: number[][] = pivot(
			alternativeArray.map(a =>
				a.score && Array.isArray(a.score)
					? a.score.map(s => (typeof s.score === 'number' ? s.score : Number(s.score) || 0))
					: Array(criteriaArray.length).fill(0)
			)
		);
		const weightedScores = scores.map((segment, i) => segment.map(score => score * priorityVector[i]));
		const finalScores = pivot(weightedScores).map(segment => segment.reduce((sum, val) => sum + val, 0));
		return finalScores;
	};

	const normMatrix = normalizeMatrix(pairwiseMatrix);
	const priorityVector = calculatePriorityVector(normMatrix);
	const { ci, cr } = calculateConsistency(pairwiseMatrix, priorityVector);
	const altScores = calculateAlternativeScores(priorityVector);

	const applyingFinalResult = (scores: number[]) => {
		finalResult = alternativeArray.map((alt, i) => ({
			altName: alt.title,
			score: scores[i],
			rank: 0
		}));
		finalResult.sort((a, b) => b.score - a.score);
		finalResult.forEach((r, i) => (r.rank = i + 1));
		finalResultScoreName = 'AHP Score';
	};

	applyingFinalResult(altScores);
</script>

<svelte:head>
	<title>DSS Result - AHP</title>
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
				<p class="text-lg font-bold my-5 ml-4">Matriks Perbandingan Berpasangan (Pairwise)</p>
				<table class="table">
					<thead>
						<tr>
							<th></th>
							{#each criteriaArray as criteria}
								<th>{criteria.title}</th>
							{/each}
						</tr>
					</thead>
					<tbody>
						{#each pairwiseMatrix as row, i}
							<tr>
								<td>{criteriaArray[i].title}</td>
								{#each row as val}
									<td>{val}</td>
								{/each}
							</tr>
						{/each}
					</tbody>
				</table>

				<p class="text-lg font-bold my-5 ml-4">Matriks Normalisasi</p>
				<table class="table">
					<thead>
						<tr>
							<th></th>
							{#each criteriaArray as criteria}
								<th>{criteria.title}</th>
							{/each}
						</tr>
					</thead>
					<tbody>
						{#each normMatrix as row, i}
							<tr>
								<td>{criteriaArray[i].title}</td>
								{#each row as val}
									<td>{val.toFixed(3)}</td>
								{/each}
							</tr>
						{/each}
					</tbody>
				</table>

				<p class="text-lg font-bold my-5 ml-4">Priority Vector</p>
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
							{#each priorityVector as val}
								<td>{val.toFixed(3)}</td>
							{/each}
						</tr>
					</tbody>
				</table>

				<p class="text-lg font-bold my-5 ml-4">Consistency Ratio</p>
				<p class="ml-4">CI: {ci.toFixed(3)}, CR: {cr.toFixed(3)} (CR &lt; 0.1 is acceptable)</p>

				<p class="text-lg font-bold my-5 ml-4">AHP Score</p>
				<table class="table">
					<thead>
						<tr>
							<th>Alternative</th>
							<th>Score</th>
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
