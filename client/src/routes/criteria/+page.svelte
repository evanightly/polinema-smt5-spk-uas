<script lang="ts">
	import { baseUrl } from '$lib/stores/baseUrl';
	import { activeCaseStudy, refreshData } from '$lib/stores/caseStudy';
	import axios from 'axios';
	import type { CriteriaType } from '../../../../lib/interfaces/ICriteria';
	let addModal: HTMLDialogElement;

	let criteriaTitle: String;
	let criteriaWeight: Number;
	let criteriaType: CriteriaType;

	const showModal = () => addModal.showModal();
	const addCriteria = async () => {
		await axios.post(`${$baseUrl}/criteria`, {
			caseStudy_id: $activeCaseStudy._id,
			title: criteriaTitle,
			weight: criteriaWeight,
			type: criteriaType
		});

		await refreshData();
	};
</script>

<svelte:head>
	<title>DSS Criteria</title>
</svelte:head>

<div class="flex items-center gap-5">
	<h1 class="text-2xl font-bold sm:text-3xl">Data Kriteria</h1>
	<button class="btn btn-md" on:click={showModal}>Tambah Kriteria</button>

	<dialog id="my_modal_2" class="modal" bind:this={addModal}>
		<div class="modal-box">
			<form class="flex flex-col gap-2 items-start" on:submit|preventDefault={addCriteria}>
				<div class="flex justify-between w-full">
					<h3 class="font-bold text-lg">Tambah Kriteria</h3>
					<button type="submit" class="btn btn-primary btn-sm">Submit</button>
				</div>
				<div class="form-control w-full">
					<label for="criteria_title">
						<span class="label-text">Nama</span>
					</label>
					<input
						id="criteria_title"
						bind:value={criteriaTitle}
						type="text"
						class="input input-bordered w-full"
						required
					/>
				</div>

				<div class="flex w-full gap-5">
					<div class="form-control w-full">
						<label for="criteria_weight">
							<span class="label-text">Bobot</span>
						</label>
						<input
							id="criteria_weight"
							bind:value={criteriaWeight}
							type="text"
							class="input input-bordered w-full"
							required
						/>
					</div>

					<div class="form-control w-full">
						<label for="criteria_type">
							<span class="label-text">Tipe</span>
						</label>
						<select
							name="criteria_type"
							id="criteria_type"
							bind:value={criteriaType}
							class="select select-bordered"
							required
						>
							<option value="Benefit">Benefit</option>
							<option value="Cost">Cost</option>
						</select>
					</div>
				</div>
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
					<th>Nama</th>
					<th>Bobot</th>
					<th>Tipe</th>
				</tr>
			</thead>
			<tbody>
				{#if $activeCaseStudy && $activeCaseStudy.criteria.length}
					{#each $activeCaseStudy.criteria as criteria, i}
						<tr>
							<td>{i + 1}</td>
							<td>{criteria.title}</td>
							<td>{criteria.weight}</td>
							<td>{criteria.type}</td>
						</tr>
					{/each}
				{/if}
			</tbody>
		</table>
	</div>
</div>
