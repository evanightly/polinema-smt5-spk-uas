<script lang="ts">
	import { caseStudyList, getCaseStudyList, selectedCaseStudy } from '$lib/stores/caseStudy';
	import { darkMode } from '$lib/stores/darkMode';
	import jQuery from 'jquery';

	import { baseUrl } from '$lib/stores/baseUrl';
	import { Bars3, Minus, Moon, Plus, Sun } from '@inqling/svelte-icons/heroicon-24-outline';
	import axios from 'axios';
	import { afterUpdate, onMount } from 'svelte';

	let addCaseStudyModal: HTMLDialogElement;
	let caseStudyTitle: string;
	let caseStudyDescription: string;

	const toggleAddCaseStudyModal = () => {
		addCaseStudyModal.showModal();
	};

	const addCaseStudy = async () => {
		await axios.post(`${$baseUrl}/case-study`, {
			title: caseStudyTitle,
			description: caseStudyDescription
		});
		const res = await getCaseStudyList();
		$selectedCaseStudy = res[res.length - 1];
	};

	const removeCaseStudy = async () => {
		await axios.delete(`${$baseUrl}/case-study/${$selectedCaseStudy._id}`);
		await getCaseStudyList();
	};

	onMount(() => {
		if (
			localStorage.theme === 'dark' ||
			(!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
		) {
			darkMode.set(true);
		} else {
			darkMode.set(false);
		}
	});

	afterUpdate(() => {
		if ($darkMode) {
			jQuery('html').attr('data-theme', 'dark');
		} else {
			jQuery('html').attr('data-theme', 'light');
		}

		localStorage.setItem('theme', $darkMode ? 'dark' : 'light');
	});
</script>

<div class="navbar border-b border-b-base-300 px-2 md:px-8 lg:px-10">
	<div class="flex flex-1 justify-between">
		<div class="flex-none sm:hidden">
			<label for="dashboard-sidebar" class="drawer-button btn btn-square btn-ghost">
				<Bars3 class="w-5 h-5" />
			</label>
		</div>
		<div class="flex items-center">
			<label for="study_case_input" class="flex-1">Studi Kasus</label>
			<div class="flex ml-4">
				<select
					name="study_case"
					id="study_case_input"
					class="select select-bordered select-sm"
					bind:value={$selectedCaseStudy}
				>
					{#if $caseStudyList}
						{#each $caseStudyList as caseStudy}
							<option value={caseStudy}>{caseStudy.title}</option>
						{/each}
					{/if}
				</select>
			</div>

			<button class="btn btn-circle btn-ghost btn-sm" on:click={toggleAddCaseStudyModal}
				><Plus class="w-4 h-4" /></button
			>
			<button class="btn btn-circle btn-ghost btn-sm" on:click={removeCaseStudy}
				><Minus class="w-4 h-4" /></button
			>
		</div>
		<label class="swap swap-rotate">
			<input type="checkbox" bind:checked={$darkMode} />
			<Sun class="w-5 h-5 swap-on" />
			<Moon class="w-5 h-5 swap-off" />
		</label>
	</div>
</div>

<dialog bind:this={addCaseStudyModal} id="my_modal_2" class="modal">
	<div class="modal-box">
		<form
			method="post"
			class="form flex flex-col gap-3 mt-3"
			on:submit|preventDefault={addCaseStudy}
		>
			<div class="flex justify-between">
				<h3 class="font-bold text-lg">Tambah Studi Kasus</h3>
				<button type="submit" class="btn btn-sm btn-primary">Submit</button>
			</div>
			<div class="form-control">
				<label for="caseStudyTitle">
					<span class="label-text">Title</span>
				</label>
				<input
					id="caseStudyTitle"
					type="text"
					class="input input-bordered"
					required
					bind:value={caseStudyTitle}
				/>
			</div>
			<div class="form-control">
				<label for="caseStudyDescription">
					<span class="label-text">Description</span>
				</label>
				<textarea
					id="caseStudyDescription"
					class="textarea textarea-bordered"
					placeholder="Description"
					bind:value={caseStudyDescription}
				/>
			</div>
		</form>
	</div>
	<form method="dialog" class="modal-backdrop">
		<button>close</button>
	</form>
</dialog>
