<script>
	import { Bars3, Home, Key, Scale, TableCells } from '@inqling/svelte-icons/heroicon-24-outline';
</script>

<div class="drawer-side">
	<label for="dashboard-sidebar" aria-label="close sidebar" class="drawer-overlay" />
	<ul
		class="menu p-4 w-80 min-h-full bg-white dark:bg-base-100 text-base-content border-r border-r-gray-600"
	>
		<div class="flex justify-between items-center">
			<span class="text-xl font-bold text-gray-800 dark:text-white ml-4 my-3">DSS</span>
			<label for="dashboard-sidebar" class="drawer-button btn btn-square btn-ghost sm:hidden">
				<Bars3 class="w-5 h-5" />
			</label>
		</div>
		<li><a href="/"><Home class="w-4 h-4" /> Dashboard</a></li>
		<li>
			<details>
				<summary><Key class="w-4 h-4" /> Alternatif</summary>
				<ul>
					<li><a href="/alternative">Data Alternatif</a></li>
				</ul>
			</details>
		</li>
		<li>
			<details>
				<summary> <Scale class="w-4 h-4" /> Kriteria</summary>
				<ul>
					<li><a href="/criteria">Data Kriteria</a></li>
					<li><a href="/criteria/weighting">Pembobotan Kriteria</a></li>
				</ul>
			</details>
		</li>
		<li>
			<details>
				<summary><TableCells class="w-4 h-4" /> Scoring</summary>
				<ul>
					<li><a href="/scoring">Data Skor</a></li>
					<li><a href="/scoring/result">Hasil Akhir</a></li>
				</ul>
			</details>
		</li>
	</ul>
</div>
