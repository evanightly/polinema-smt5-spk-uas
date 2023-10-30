<script lang="ts">
	import { baseUrl } from '$lib/stores/baseUrl';
	import { activeCaseStudy, refreshData } from '$lib/stores/caseStudy';
	import axios from 'axios';
	import Swal from 'sweetalert2';

	console.log($activeCaseStudy);
	const changeAlternative = async (e: any) => {
		const _id = e.target.getAttribute('data-id');
		const { value } = e.target;

		await axios.patch(`${$baseUrl}/alternative/${_id}`, {
			title: value
		});

		await refreshData();

		Swal.fire({
			title: 'Nama alternatif berhasil diubah',
			toast: true,
			position: 'bottom-right',
			timer: 3000
		});
	};

	const changeScore = async (e: any) => {
		const _id = e.target.getAttribute('data-id');
		const { value } = e.target;

		await axios.patch(`${$baseUrl}/score/${_id}`, {
			score: value
		});

		await refreshData();

		Swal.fire({
			title: 'Skor berhasil diubah',
			toast: true,
			showConfirmButton: false,
			position: 'bottom-right',
			timer: 3000
		});
	};

	const assignNewScore = async (e: any) => {
		const row = e.target.parentElement.parentElement.rowIndex - 1;
		const cell = e.target.parentElement.cellIndex - 1;
		const score = parseInt(e.target.value);

		const criteria = $activeCaseStudy.criteria[cell];
		const alternative = $activeCaseStudy.alternative[row];

		await axios.post($baseUrl + '/score', {
			score,
			alternativeId: alternative._id,
			criteriaId: criteria._id
		});
		await refreshData();

		Swal.fire({
			title: `Skor berhasil ditambah\nCriteria: ${criteria.title}\nAlternative: ${alternative.title}`,
			toast: true,
			showConfirmButton: false,
			position: 'bottom-right',
			timer: 3000
		});
	};
</script>

<svelte:head>
	<title>DSS Scoring</title>
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
					{#each $activeCaseStudy.alternative as alternative, alternativeIndex}
						<tr>
							<td class="p-0"
								><input
									type="text"
									value={alternative.title}
									data-id={alternative._id}
									class="h-full w-full p-3"
									on:change={changeAlternative}
								/></td
							>
							<!-- {console.log(alternative.score)} -->
							{#each $activeCaseStudy.criteria as criteria, criteriaIndex}
								<!-- {console.log(criteria._id)} -->
								<!-- {console.log('Current Alternative Index: ', alternativeIndex)} -->
								<!-- {console.log('Current Criteria Index: ', criteriaIndex)} -->
								{#if alternative.score[criteriaIndex] && alternative.score[criteriaIndex].criteria && alternative.score[criteriaIndex].criteria._id === criteria._id}
									<td class="p-0"
										><input
											type="number"
											data-id={alternative.score[criteriaIndex]._id}
											value={alternative.score[criteriaIndex].score}
											class="h-full w-full p-3"
											on:change={changeScore}
										/></td
									>
								{:else}
									<td class="p-0"
										><input
											type="number"
											class="h-full w-full p-3"
											on:change={assignNewScore}
										/></td
									>
								{/if}
							{/each}
						</tr>
					{/each}
				{/if}
			</tbody>
		</table>
	</div>
</div>
