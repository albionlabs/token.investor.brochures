<script lang="ts">
	interface Props {
		title: string;
		content: string;
	}

	let { title, content }: Props = $props();
</script>

<section class="card">
	<h2 class="section-title">{title}</h2>
	<p class="thesis-content">{@html content}</p>
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

	.thesis-content {
		font-size: 14px;
		line-height: 1.6;
		color: #374151;
		margin: 0;
	}

	.thesis-content :global(strong) {
		color: #0f172a;
		font-weight: 700;
	}
</style>
