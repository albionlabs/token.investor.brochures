<script lang="ts">
	import type { Partner } from '$lib/types';

	interface Props {
		title: string;
		partners: Partner[];
	}

	let { title, partners }: Props = $props();
</script>

<section class="card">
	<h2 class="section-title">{title}</h2>
	<div class="partners-grid">
		{#each partners as partner}
			<div class="partner-cell">
				<span class="partner-name">{partner.name}</span>
				<span class="partner-desc">{partner.description}</span>
			</div>
		{/each}
	</div>
</section>

<style>
	.card {
		background: #fff;
		border: 1px solid #e2e8f0;
		border-radius: 8px;
		padding: 20px 24px;
	}

	.section-title {
		font-size: 14px;
		font-weight: 700;
		color: #0f172a;
		letter-spacing: 0.5px;
		text-transform: uppercase;
		margin: 0 0 14px;
	}

	.partners-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1px;
		background: #e2e8f0;
		border: 1px solid #e2e8f0;
		border-radius: 6px;
		overflow: hidden;
	}

	.partner-cell {
		background: #fff;
		padding: 12px 14px;
		display: flex;
		flex-direction: column;
		gap: 2px;
	}

	.partner-name {
		font-size: 13px;
		font-weight: 600;
		color: #0f172a;
	}

	.partner-desc {
		font-size: 11.5px;
		color: #64748b;
	}
</style>
