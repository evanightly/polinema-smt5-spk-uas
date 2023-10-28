<script>
	import { caseStudyList, selectedCaseStudy } from '$lib/components/stores/caseStudy';

	import { Bars3, Moon, Sun } from '@inqling/svelte-icons/heroicon-24-outline';
</script>

<div class="navbar bg-base-100 border-b border-b-gray-600 pl-2 md:pl-8 lg:pl-10">
	<div class="flex flex-1 justify-between">
		<div class="flex-none sm:hidden">
			<label for="dashboard-sidebar" class="drawer-button btn btn-square btn-ghost">
				<Bars3 class="w-5 h-5" />
			</label>
		</div>
		<div class="flex items-center dark:text-gray-400">
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
			<input type="checkbox" />
			<Sun class="w-5 h-5 swap-on" />
			<Moon class="w-5 h-5 swap-off" />
		</label>
	</div>
</div>
