<script lang="ts">
	import { activeCaseStudy } from '$lib/stores/caseStudy';
	let addModal: HTMLDialogElement;
	const showModal = () => addModal.showModal();
</script>

<svelte:head>
	<title>DSS Criteria</title>
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
