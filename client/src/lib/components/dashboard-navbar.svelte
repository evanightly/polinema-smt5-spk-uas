<script>
	import { caseStudyList, selectedCaseStudy } from '$lib/stores/caseStudy';
	import { darkMode } from '$lib/stores/darkMode';
	import jQuery from 'jquery';

	import { Bars3, Moon, Sun } from '@inqling/svelte-icons/heroicon-24-outline';
	import { afterUpdate, onMount } from 'svelte';

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
		</div>
		<label class="swap swap-rotate">
			<input type="checkbox" bind:checked={$darkMode} />
			<Sun class="w-5 h-5 swap-on" />
			<Moon class="w-5 h-5 swap-off" />
		</label>
	</div>
</div>
