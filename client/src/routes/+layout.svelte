<script>
	import DashboardNavbar from '$lib/components/dashboard-navbar.svelte';
	import DashboardSidebar from '$lib/components/dashboard-sidebar.svelte';
	import { onMount } from 'svelte';
	import '../app.css';
	import { getCaseStudyList } from '../lib/components/stores/caseStudy';

	onMount(async () => {
		await getCaseStudyList();
	});
</script>

<body class="bg-gray-50 dark:bg-slate-900">
	<div class="drawer lg:drawer-open">
		<input id="dashboard-sidebar" type="checkbox" class="drawer-toggle" />
		<div class="drawer-content flex flex-col">
			<DashboardNavbar />
			<div class="w-full pt-4 lg:pt-8 px-4 sm:px-8 md:px-8 lg:pl-10">
				<slot />
			</div>
		</div>
		<DashboardSidebar />
	</div>
</body>
