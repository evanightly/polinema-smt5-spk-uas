<script>
	import DashboardNavbar from '$lib/components/dashboard-navbar.svelte';
	import DashboardSidebar from '$lib/components/dashboard-sidebar.svelte';
	import { onMount } from 'svelte';
	import '../app.css';
	import { getCaseStudyList } from '../lib/stores/caseStudy';
	onMount(async () => {
		await getCaseStudyList();
	});
</script>

<body>
	<div class="drawer lg:drawer-open">
		<input id="dashboard-sidebar" type="checkbox" class="drawer-toggle" />
		<div class="drawer-content flex flex-col">
			<DashboardNavbar />
			<div class="w-full pt-4 lg:pt-8 px-4 sm:px-8 md:px-8 lg:pl-10 min-h-full">
				<slot />
			</div>
		</div>
		<DashboardSidebar />
	</div>
</body>