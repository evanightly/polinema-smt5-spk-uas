<script>
	import DashboardNavbar from '$lib/components/dashboard-navbar.svelte';
	import DashboardSidebar from '$lib/components/dashboard-sidebar.svelte';
	import DashboardSidebarToggle from '$lib/components/sub-components/dashboard-sidebar-toggle.svelte';
	import '../app.css';
</script>

<body class="bg-gray-50 dark:bg-slate-900">
	<!-- ========== END HEADER ========== -->
	<DashboardNavbar />
	<!-- ========== MAIN CONTENT ========== -->
	<!-- Sidebar Toggle -->
	<DashboardSidebarToggle />

	<!-- End Sidebar Toggle -->

	<!-- Sidebar -->
	<DashboardSidebar />
	<!-- End Sidebar -->

	<!-- Content -->
	<slot>Empty Content</slot>
	<!-- End Content -->
	<!-- ========== END MAIN CONTENT ========== -->
</body>
