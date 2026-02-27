<script lang="ts">
	interface Props {
		title: string;
		risks: string[];
	}

	let { title, risks }: Props = $props();
</script>

<section class="card">
	<h2 class="section-title">{title}</h2>
	<p class="risks-text">
		{#each risks as risk, i}
			{#if i > 0}
				<span class="bullet"> &middot; </span>
			{/if}{risk}{/each}
	</p>
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
		margin: 0 0 12px;
	}

	.risks-text {
		font-size: 13px;
		line-height: 1.6;
		color: #374151;
		margin: 0;
	}

	.bullet {
		color: #94a3b8;
		margin: 0 2px;
	}
</style>
