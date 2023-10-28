<script>
	import {
		ChevronDown,
		ChevronUp,
		Home,
		Key,
		Scale,
		TableCells
	} from '@inqling/svelte-icons/heroicon-24-outline';
</script>

<div
	id="application-sidebar"
	class="hs-overlay hs-overlay-open:translate-x-0 -translate-x-full transition-all duration-300 transform hidden fixed top-0 left-0 bottom-0 z-[60] w-64 bg-white border-r border-gray-200 pt-7 pb-10 overflow-y-auto scrollbar-y lg:block lg:translate-x-0 lg:right-auto lg:bottom-0 dark:scrollbar-y dark:bg-gray-800 dark:border-gray-700"
>
	<div class="px-6">
		<a class="flex-none text-xl font-semibold dark:text-white" href="#test" aria-label="Brand">
			DSS
		</a>
	</div>

	<nav class="hs-accordion-group p-6 w-full flex flex-col flex-wrap" data-hs-accordion-always-open>
		<ul class="space-y-1.5">
			<li>
				<a
					class="flex items-center gap-x-3.5 py-2 px-2.5 bg-gray-100 text-sm text-slate-700 rounded-md hover:bg-gray-100 dark:bg-gray-900 dark:text-white"
					href="#ok"
				>
					<Home class="w-4 h-4" />
					Dashboard
				</a>
			</li>

			<li class="hs-accordion" id="users-accordion">
				<a
					class="hs-accordion-toggle flex items-center gap-x-3.5 py-2 px-2.5 hs-accordion-active:text-blue-600 hs-accordion-active:hover:bg-transparent text-sm text-slate-700 rounded-md hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-900 dark:text-slate-400 dark:hover:text-slate-300 dark:hs-accordion-active:text-white"
					href="#ok"
				>
					<Key class="w-4 h-4" />
					Alternatif

					<div
						class="hs-accordion-active:flex bg-red ml-auto hidden w-4 h-4 text-gray-600 group-hover:text-gray-500 dark:text-gray-400"
					>
						<ChevronUp />
					</div>

					<div
						class="hs-accordion-active:hidden ml-auto flex bg-red w-4 h-4 text-gray-600 group-hover:text-gray-500 dark:text-gray-400"
					>
						<ChevronDown />
					</div>
				</a>

				<div
					id="users-accordion-child"
					class="hs-accordion-content w-full overflow-hidden transition-[height] duration-300 hidden"
				>
					<ul class="pt-2 pl-2">
						<li>
							<a
								class="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700 rounded-md hover:bg-gray-100 dark:bg-gray-800 dark:text-slate-400 dark:hover:text-slate-300"
								href="#ok"
							>
								Data Alternatif
							</a>
						</li>
					</ul>
				</div>
			</li>

			<li class="hs-accordion" id="account-accordion">
				<a
					class="hs-accordion-toggle flex items-center gap-x-3.5 py-2 px-2.5 hs-accordion-active:text-blue-600 hs-accordion-active:hover:bg-transparent text-sm text-slate-700 rounded-md hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-900 dark:text-slate-400 dark:hover:text-slate-300 dark:hs-accordion-active:text-white"
					href="#ok"
				>
					<Scale class="w-4 h-4" />
					Kriteria

					<div
						class="hs-accordion-active:flex bg-red ml-auto hidden w-4 h-4 text-gray-600 group-hover:text-gray-500 dark:text-gray-400"
					>
						<ChevronUp />
					</div>

					<div
						class="hs-accordion-active:hidden ml-auto flex bg-red w-4 h-4 text-gray-600 group-hover:text-gray-500 dark:text-gray-400"
					>
						<ChevronDown />
					</div>
				</a>

				<div
					id="account-accordion-child"
					class="hs-accordion-content w-full overflow-hidden transition-[height] duration-300 hidden"
				>
					<ul class="pt-2 pl-2">
						<li>
							<a
								class="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700 rounded-md hover:bg-gray-100 dark:bg-gray-800 dark:text-slate-400 dark:hover:text-slate-300"
								href="#ok"
							>
								Data Kriteria
							</a>
						</li>
						<li>
							<a
								class="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700 rounded-md hover:bg-gray-100 dark:bg-gray-800 dark:text-slate-400 dark:hover:text-slate-300"
								href="#ok"
							>
								Pembobotan
							</a>
						</li>
					</ul>
				</div>
			</li>

			<li class="hs-accordion" id="projects-accordion">
				<a
					class="hs-accordion-toggle flex items-center gap-x-3.5 py-2 px-2.5 hs-accordion-active:text-blue-600 hs-accordion-active:hover:bg-transparent text-sm text-slate-700 rounded-md hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-900 dark:text-slate-400 dark:hover:text-slate-300 dark:hs-accordion-active:text-white"
					href="#ok"
				>
					<TableCells class="w-4 h-4" />
					Scoring

					<div
						class="hs-accordion-active:flex bg-red ml-auto hidden w-4 h-4 text-gray-600 group-hover:text-gray-500 dark:text-gray-400"
					>
						<ChevronUp />
					</div>

					<div
						class="hs-accordion-active:hidden ml-auto flex bg-red w-4 h-4 text-gray-600 group-hover:text-gray-500 dark:text-gray-400"
					>
						<ChevronDown />
					</div>
				</a>

				<div
					id="projects-accordion-child"
					class="hs-accordion-content w-full overflow-hidden transition-[height] duration-300 hidden"
				>
					<ul class="pt-2 pl-2">
						<li>
							<a
								class="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700 rounded-md hover:bg-gray-100 dark:bg-gray-800 dark:text-slate-400 dark:hover:text-slate-300"
								href="#ok"
							>
								Pengisian Data
							</a>
						</li>
						<li>
							<a
								class="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700 rounded-md hover:bg-gray-100 dark:bg-gray-800 dark:text-slate-400 dark:hover:text-slate-300"
								href="#ok"
							>
								Hasil Akhir
							</a>
						</li>
					</ul>
				</div>
			</li>
		</ul>
	</nav>
</div>
