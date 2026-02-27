<script lang="ts">
	import type { AssetLabel, AssetStat } from '../types.js';

	interface Props {
		title: string;
		assetLabels: AssetLabel[];
		stats: AssetStat[];
	}

	let { title, assetLabels, stats }: Props = $props();
</script>

<section class="card">
	<h2 class="section-title">{title}</h2>
	<div class="location-grid">
		<div class="map-container">
			<svg viewBox="0 0 100 100" class="map-svg" xmlns="http://www.w3.org/2000/svg">
				<!-- Simplified UK outline -->
				<path
					d="M 30,85 C 28,80 26,76 27,72 C 28,68 30,65 29,60 C 28,56 27,52 28,48
					   C 29,44 30,40 31,36 C 32,32 31,28 32,24 C 33,20 34,16 36,14
					   C 38,12 40,10 42,9 C 44,8 46,7 48,8 C 50,9 51,11 52,10
					   C 53,9 54,7 56,8 C 58,9 57,12 56,14 C 55,16 54,18 55,20
					   C 56,22 58,23 57,26 C 56,29 54,30 53,32 C 52,34 53,36 52,38
					   C 51,40 50,41 49,43 C 48,45 49,48 48,50 C 47,52 45,53 44,55
					   C 43,57 44,60 43,62 C 42,64 40,65 39,67 C 38,69 39,72 38,74
					   C 37,76 35,78 34,80 C 33,82 32,84 30,85 Z"
					fill="#e2e8f0"
					stroke="#94a3b8"
					stroke-width="0.5"
				/>
				<!-- Scotland top -->
				<path
					d="M 36,14 C 34,12 33,10 35,8 C 37,6 39,5 41,6 C 43,7 42,9 42,9"
					fill="#e2e8f0"
					stroke="#94a3b8"
					stroke-width="0.5"
				/>
				<!-- UKCS dashed rectangle -->
				<rect
					x="48"
					y="12"
					width="35"
					height="42"
					fill="none"
					stroke="#94a3b8"
					stroke-width="0.6"
					stroke-dasharray="2,1.5"
					rx="1"
				/>
				<text x="52" y="17" font-size="4.5" fill="#64748b" font-weight="600">UKCS</text>

				<!-- Asset markers -->
				{#each assetLabels as asset}
					<circle cx={asset.x} cy={asset.y} r="2" fill="#0d9488" opacity="0.8" />
					<text
						x={asset.x + 3}
						y={asset.y + 1.5}
						font-size="4"
						fill="#374151"
						font-weight="500">{asset.name}</text
					>
				{/each}
			</svg>
		</div>
		<div class="stats-grid">
			{#each stats as stat}
				<div class="stat-item">
					<span class="stat-label">{stat.label}</span>
					<span class="stat-value">{stat.value}</span>
					<span class="stat-desc">{stat.description}</span>
				</div>
			{/each}
		</div>
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

	.location-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 16px;
		align-items: start;
	}

	.map-container {
		display: flex;
		justify-content: center;
	}

	.map-svg {
		width: 100%;
		max-width: 180px;
		height: auto;
	}

	.stats-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 16px;
	}

	.stat-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
	}

	.stat-label {
		font-size: 11px;
		color: #64748b;
		font-weight: 500;
	}

	.stat-value {
		font-size: 28px;
		font-weight: 700;
		color: #0f172a;
		line-height: 1.2;
	}

	.stat-desc {
		font-size: 11px;
		color: #64748b;
	}
</style>
