<script lang="ts">
	import { browser } from '$app/environment';
	import showAlert from '$lib/functions/showAlert';
	import { baseUrl } from '$lib/stores/baseUrl';
	import { DocumentArrowDown } from '@inqling/svelte-icons/heroicon-24-outline';
	import axios from 'axios';
	import Swal from 'sweetalert2';
	import { activeCaseStudy, getCaseStudyList, refreshData } from '../lib/stores/caseStudy';
	let importDataModal: HTMLDialogElement;
	let file: FileList;

	const useSampleData = async () => {
		Swal.fire({
			title: 'Please Wait',
			allowOutsideClick: false,
			showConfirmButton: false,
			html: '<span class="loading loading-spinner loading-lg"></span>'
		});
		await axios.get($baseUrl + '/sample');
		await getCaseStudyList();
		if (browser) {
			location.reload();
		}
	};

	const showImportDataModal = () => {
		importDataModal.showModal();
	};

	const importData = async () => {
		if ($activeCaseStudy && $activeCaseStudy._id) {
			const { data: response } = await axios.post(
				$baseUrl + '/file/import',
				{ file },
				{
					params: {
						caseStudyId: $activeCaseStudy._id
					},
					headers: {
						'Content-Type': 'multipart/form-data'
					}
				}
			);

			await refreshData();

			importDataModal.close();

			showAlert(
				response.status ? 'Success' : 'Oops',
				response.msg,
				response.status === 'Success' ? 'success' : 'error'
			);
		}
	};
</script>

<svelte:head>
	<title>DSS Dashboard</title>
</svelte:head>

<header>
	<p class="mb-2 text-sm font-semibold text-blue-600">Decision Support System</p>
	{#if $activeCaseStudy && $activeCaseStudy.title}
		<h1 class="text-2xl font-bold">
			{$activeCaseStudy.title}
		</h1>
		{#if $activeCaseStudy.description}
			<p class="mt-2 text-lg">
				{$activeCaseStudy.description}
			</p>
		{/if}
		<p class="mt-2 text-lg">
			Isilah data alternatif, kriteria, dan scoring untuk mendapatkan hasil akhir
		</p>
	{:else}
		<h1 class="text-2xl font-bold">Prasyarat</h1>
		<p class="mt-2 text-lg">Buat studi kasus baru</p>
	{/if}

	<div class="mt-5 flex flex-col items-center gap-2 sm:flex-row sm:gap-3">
		<button
			class="btn btn-ghost bg-blue-500 text-white hover:bg-blue-600"
			on:click|preventDefault={useSampleData}
		>
			Sample Data
		</button>
		{#if $activeCaseStudy}
			<button
				class="btn btn-ghost bg-green-500 text-white hover:bg-green-600"
				on:click={showImportDataModal}
			>
				Import Data
			</button>
		{/if}
	</div>
</header>

{#if $activeCaseStudy}
	<dialog bind:this={importDataModal} class="modal">
		<div class="modal-box">
			<form
				method="post"
				class="form flex flex-col gap-3 mt-3"
				on:submit|preventDefault={importData}
			>
				<div class="flex justify-between">
					<h3 class="font-bold text-lg">Import Data</h3>
					<button type="submit" class="btn btn-sm btn-primary">Import</button>
				</div>
				<div class="flex flex-col gap-5">
					<div class="form-control gap-2">
						<p>Studi kasus: {$activeCaseStudy.title}</p>
						<a
							href={$baseUrl + '/file/template'}
							download="TemplateImportData.xlsx"
							class="btn btn-block btn-green"
						>
							<p>Template Excel</p>
							<DocumentArrowDown class="h-5 w-5" />
						</a>
					</div>
					<div class="form-control gap-2">
						<label for="file"> Unggah file excel </label>
						<input
							id="file"
							type="file"
							class="file-input file-input-bordered"
							required
							bind:files={file}
						/>
					</div>
				</div>
			</form>
		</div>
		<form method="dialog" class="modal-backdrop">
			<button>close</button>
		</form>
	</dialog>
{/if}
