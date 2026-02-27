<script lang="ts">
	import type { ValueProposition } from '$lib/types';

	interface Props {
		title: string;
		items: ValueProposition[];
	}

	let { title, items }: Props = $props();
</script>

<section class="card">
	<h2 class="section-title">{title}</h2>
	<ul class="prop-list">
		{#each items as item}
			<li class="prop-item">
				<span class="check">&#10003;</span>
				<span class="prop-text">{@html item.text}</span>
			</li>
		{/each}
	</ul>
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

	.prop-list {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	.prop-item {
		display: flex;
		align-items: flex-start;
		gap: 10px;
		font-size: 13.5px;
		line-height: 1.5;
		color: #374151;
	}

	.check {
		color: #10b981;
		font-weight: 700;
		font-size: 15px;
		flex-shrink: 0;
		margin-top: 1px;
	}

	.prop-text :global(strong) {
		color: #0f172a;
		font-weight: 600;
	}
</style>
