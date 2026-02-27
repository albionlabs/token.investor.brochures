<script lang="ts">
	import { getTemplate } from '$lib/index.js';
	import type { InvestorPitch } from '$lib/templates/investor-pitch/types.js';

	const template = getTemplate('investor-pitch')!;
	const data = template.sampleData as InvestorPitch;
	const Renderer = template.renderer;
</script>

<svelte:head>
	<title>{data.company.name} — Investor Summary</title>
</svelte:head>

<div class="page-wrapper">
	<Renderer {data} />
</div>

<style>
	.page-wrapper {
		display: flex;
		justify-content: center;
		padding: 24px;
		min-height: 100vh;
	}
</style>
