<script lang="ts">
	import type { KeyMetric } from '$lib/types';

	interface Props {
		companyName: string;
		subtitle: string;
		metrics: KeyMetric[];
	}

	let { companyName, subtitle, metrics }: Props = $props();
</script>

<header class="header">
	<h1 class="company-name">{companyName}</h1>
	<p class="subtitle">{subtitle}</p>
</header>

<div class="metrics-bar">
	{#each metrics as metric}
		<div class="metric">
			<span class="metric-label">{metric.label}</span>
			<span class="metric-value" class:highlight={metric.highlight}>{metric.value}</span>
		</div>
	{/each}
</div>

<style>
	.header {
		background: #1a2332;
		padding: 24px 32px 20px;
		text-align: center;
	}

	.company-name {
		color: #fff;
		font-size: 28px;
		font-weight: 800;
		letter-spacing: 1.5px;
		margin: 0;
	}

	.subtitle {
		color: #94a3b8;
		font-size: 13px;
		margin: 6px 0 0;
		letter-spacing: 0.3px;
	}

	.metrics-bar {
		display: grid;
		grid-template-columns: repeat(6, 1fr);
		gap: 0;
		padding: 16px 24px;
		background: #fff;
		border-bottom: 1px solid #e2e8f0;
	}

	.metric {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 8px 12px;
		border: 1px solid #e2e8f0;
		border-radius: 8px;
		margin: 0 4px;
	}

	.metric-label {
		font-size: 10px;
		font-weight: 500;
		color: #64748b;
		letter-spacing: 0.5px;
		text-transform: uppercase;
	}

	.metric-value {
		font-size: 22px;
		font-weight: 700;
		color: #0f172a;
		margin-top: 2px;
	}

	.metric-value.highlight {
		color: #10b981;
	}
</style>
