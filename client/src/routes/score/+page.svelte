<script lang="ts">
	import { baseUrl } from '$lib/stores/baseUrl';
	import { activeCaseStudy, refreshData } from '$lib/stores/caseStudy';
	import axios from 'axios';
	import Swal from 'sweetalert2';

	const maxCriteria = $activeCaseStudy.criteria.length;
	let parsedInput = 0;
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
			position: 'bottom-right',
			timer: 3000
		});
	};

	const assignNewScore = async (e: any) => {};
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
					{#each $activeCaseStudy.alternative as alternative}
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
							{#each alternative.score as score, i}
								<td class="p-0"
									><input
										type="number"
										data-id={score._id}
										value={score.score}
										class="h-full w-full p-3"
										on:change={changeScore}
									/></td
								>

								{parsedInput++}
							{/each}

							{#if parsedInput < $activeCaseStudy.criteria.length}
								{#each Array($activeCaseStudy.criteria.length) as _, ci}
									<td class="p-0"
										><input
											type="number"
											class="h-full w-full p-3"
											on:change={assignNewScore}
										/></td
									>
								{/each}
							{/if}
						</tr>
					{/each}
				{/if}
			</tbody>
		</table>
	</div>
</div>
