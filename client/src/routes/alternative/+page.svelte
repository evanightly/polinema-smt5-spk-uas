<script>
	import { activeCaseStudy } from '../../lib/components/stores/caseStudy';
</script>

<svelte:head>
	<title>DSS Alternative</title>
</svelte:head>

<h1 class="text-2xl font-bold text-gray-800 sm:text-3xl dark:text-white">Data Alternatif</h1>
<div class="flex flex-col gap-2 mt-5" />

<div class="flex flex-col">
	<div class="-m-1.5 overflow-x-auto">
		<div class="p-1.5 min-w-full inline-block align-middle">
			<div class="overflow-hidden">
				<table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
					<thead>
						<tr>
							<th
								scope="col"
								class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">#</th
							>
							<th
								scope="col"
								class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th
							>
						</tr>
					</thead>
					<tbody class="divide-y divide-gray-200 dark:divide-gray-700">
						{#if $activeCaseStudy && $activeCaseStudy.alternative.length}
							{#each $activeCaseStudy.alternative as alternative, i}
								<tr>
									<td
										class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200"
										>{i + 1}</td
									>
									<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200"
										>{alternative.title}</td
									>
								</tr>
							{/each}
						{/if}
					</tbody>
				</table>
			</div>
		</div>
	</div>
</div>
