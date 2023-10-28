<script>
	import { Bars3, ChevronRight } from '@inqling/svelte-icons/heroicon-24-outline';
</script>

<div
	class="sticky top-0 inset-x-0 z-20 bg-white border-y px-4 sm:px-6 md:px-8 lg:hidden dark:bg-gray-800 dark:border-gray-700"
>
	<div class="flex items-center py-4">
		<!-- Navigation Toggle -->
		<button
			type="button"
			class="text-gray-500 hover:text-gray-600 flex items-center"
			data-hs-overlay="#application-sidebar"
			aria-controls="application-sidebar"
			aria-label="Toggle navigation"
		>
			<span class="sr-only">Toggle Navigation</span>
			<Bars3 class="w-5 h-5" />
		</button>
		<!-- End Navigation Toggle -->

		<!-- Breadcrumb -->
		<ol class="ml-3 flex items-center whitespace-nowrap min-w-0" aria-label="Breadcrumb">
			<li class="flex items-center text-sm text-gray-800 dark:text-gray-400">
				Application Layout
				<ChevronRight
					class="flex-shrink-0 mx-3 overflow-visible h-4 w-4 text-gray-400 dark:text-gray-600"
				/>
			</li>
			<li
				class="text-sm font-semibold text-gray-800 truncate dark:text-gray-400"
				aria-current="page"
			>
				Dashboard
			</li>
		</ol>
		<!-- End Breadcrumb -->
	</div>
</div>
