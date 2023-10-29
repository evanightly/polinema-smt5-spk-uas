<script lang="ts">
	import { activeCaseStudy } from '$lib/stores/caseStudy';
	let addModal: HTMLDialogElement;
	const showModal = () => addModal.showModal();
</script>

<svelte:head>
	<title>DSS Alternative</title>
</svelte:head>

<div class="flex items-center gap-5">
	<h1 class="text-2xl font-bold sm:text-3xl">Data Alternatif</h1>
	<button class="btn btn-md" on:click={showModal}>Tambah Alternatif</button>

	<!-- Open the modal using ID.showModal() method -->
	<dialog id="my_modal_2" class="modal" bind:this={addModal}>
		<div class="modal-box">
			<form action="" class="flex flex-col gap-5 items-start">
				<div class="flex justify-between w-full">
					<h3 class="font-bold text-lg">Tambah Alternatif</h3>
					<button type="submit" class="btn btn-primary btn-sm">Submit</button>
				</div>
				<input
					id="alternative_title"
					name="alternative_title"
					type="text"
					class="input input-bordered w-full"
				/>
			</form>
		</div>
		<form method="dialog" class="modal-backdrop">
			<button>close</button>
		</form>
	</dialog>
</div>
<div class="flex flex-col mt-5">
	<div class="overflow-x-auto">
		<table class="table">
			<thead>
				<tr>
					<th>#</th>
					<th>Title</th>
				</tr>
			</thead>
			<tbody>
				{#if $activeCaseStudy && $activeCaseStudy.alternative.length}
					{#each $activeCaseStudy.alternative as alternative, i}
						<tr>
							<td>{i + 1}</td>
							<td>{alternative.title}</td>
						</tr>
					{/each}
				{/if}
			</tbody>
		</table>
	</div>
</div>
