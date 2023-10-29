<script lang="ts">
	import { activeCaseStudy } from '$lib/stores/caseStudy';

	function pivot(data: any) {
		var iter = function (pivoted: any, record: any) {
			for (var key in record) {
				if (!pivoted[key]) pivoted[key] = [];
				pivoted[key].push(record[key]);
			}
			return pivoted;
		};
		return data.reduce(iter, []);
	}

	const criteriaArray = $activeCaseStudy.criteria;
	const alternativeArray = $activeCaseStudy.alternative;
	const setDivider = () => {
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

	const normalize = (divider: number[]) => {
		let normalize = [];
		for (let i = 0; i < criteriaArray.length; i++) {
			const segment = [];

			for (const alt of alternativeArray) {
				segment.push(alt.score[i].score / divider[i]);
			}

			normalize.push(segment);
		}

		// 1.B Normalizing Segments
		return normalize;
	};

	const weighting = (normalized: number[][]) => {
		let weighted: number[][] = [];
		criteriaArray.forEach((c, i) => {
			const segment: number[] = [];
			console.log('--------');
			normalized[i].forEach((n) => {
				segment.push(n * c.weight);
			});
			weighted.push(segment);
		});

		// 2. Weighting
		return weighted;
	};

	const definingIdealSolution = (weighted: number[][]) => {
		// 3.A Defining Maximum Ideal Solution
		const max = weighted.map((segment, i) => {
			if (criteriaArray[i].type === 'Benefit') {
				return Math.max(...segment);
			} else {
				return Math.min(...segment);
			}
		});

		// 3.B Defining Minimum Ideal Solution
		const min = weighted.map((segment, i) => {
			if (criteriaArray[i].type === 'Benefit') {
				return Math.min(...segment);
			} else {
				return Math.max(...segment);
			}
		});

		return { max, min };
	};

	const distancing = (
		weightPivoted: number[][],
		idealSolution: { max: number[]; min: number[] }
	) => {
		const distanceMax = weightPivoted.map((weight, i) => {
			// Math.pow(idealSolution.max[i] - wright[i], 2)
			console.log(idealSolution.max[i], weight[i]);
		});
		console.log(distanceMax);
	};

	const divider = setDivider();
	const normalized = normalize(divider);
	const weighted = weighting(normalized);
	const idealSolution = definingIdealSolution(weighted);
	const wp = pivot(weighted);
	console.log(wp);
	const distance = distancing(wp, idealSolution);
</script>

<svelte:head>
	<title>DSS Result</title>
</svelte:head>

<div class="flex items-center gap-5">
	<h1 class="text-2xl font-bold sm:text-3xl">Data Skor</h1>
</div>

<div class="flex flex-col mt-5">
	<div class="overflow-x-auto">
		<table class="table">
			<thead>
				<tr>
					<th>Alternatif</th>
					{#if $activeCaseStudy && $activeCaseStudy.criteria.length}
						{#each $activeCaseStudy.criteria as criteria}
							<th contenteditable="true">{criteria.title}</th>
						{/each}
					{/if}
				</tr>
			</thead>
			<tbody>
				{#if $activeCaseStudy && $activeCaseStudy.alternative.length}
					{#each $activeCaseStudy.alternative as alternative, i}
						<tr>
							<td>{alternative.title}</td>
							{#each alternative.score as score}
								<td>{score.score}</td>
							{/each}
						</tr>
					{/each}
				{/if}
			</tbody>
		</table>
	</div>
</div>
