<script>
	import axios from 'axios';
	import { activeCaseStudy, getCaseStudyList, refreshData } from '../lib/stores/caseStudy';
	import { baseUrl } from '$lib/stores/baseUrl';
	import Swal from 'sweetalert2';
	const useSampleData = async () => {
		Swal.fire({
			title: 'Please Wait',
			allowOutsideClick: false,
			showConfirmButton: false,
			html: '<span class="loading loading-spinner loading-lg"></span>'
		});
		await axios.get($baseUrl + '/purge');
		await axios.get($baseUrl + '/sample');
		await getCaseStudyList();
		Swal.close();
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
		<p class="mt-2 text-lg">
			Isilah data alternatif, kriteria, dan scoring untuk mendapatkan hasil akhir
		</p>
	{:else}
		<h1 class="text-2xl font-bold">Prasyarat</h1>
		<p class="mt-2 text-lg">Buat studi kasus baru</p>
	{/if}

	<div class="mt-5 flex flex-col items-center gap-2 sm:flex-row sm:gap-3">
		<button
			class="btn w-fit btn-ghost bg-blue-500 text-white hover:bg-blue-600 btn-md"
			on:click|preventDefault={useSampleData}>Sample Data</button
		>
	</div>
</header>
