<script lang="ts">
	import type { PortfolioAsset, DevProbability } from '../types.js';

	interface Props {
		title: string;
		assets: PortfolioAsset[];
		maxValue: number;
		gridLines: number[];
		developmentProbabilities: DevProbability[];
	}

	let { title, assets, maxValue, gridLines, developmentProbabilities }: Props = $props();

	const chartLeft = 110;
	const chartRight = 480;
	const chartTop = 10;
	const barHeight = 18;
	const barGap = 4;
	const groupGap = 16;
	const chartWidth = chartRight - chartLeft;

	function xPos(val: number): number {
		return chartLeft + (val / maxValue) * chartWidth;
	}

	function getBarGroups() {
		let y = chartTop;
		const groups: Array<{
			name: string;
			labelY: number;
			bars: Array<{ x: number; width: number; y: number; height: number; color: string }>;
		}> = [];

		for (const asset of assets) {
			const groupStart = y;
			const bars = asset.bars.map((bar) => {
				const barY = y;
				y += barHeight + barGap;
				return {
					x: chartLeft,
					width: (bar.value / maxValue) * chartWidth,
					y: barY,
					height: barHeight,
					color: bar.color
				};
			});
			const labelY = groupStart + ((y - barGap - groupStart) / 2);
			groups.push({ name: asset.name, labelY, bars });
			y += groupGap;
		}

		return { groups, totalHeight: y };
	}

	const { groups, totalHeight } = getBarGroups();
	const svgHeight = totalHeight + 30;
</script>

<section class="card">
	<h2 class="section-title">{title}</h2>
	<svg viewBox="0 0 500 {svgHeight}" class="chart-svg" xmlns="http://www.w3.org/2000/svg">
		<!-- Grid lines -->
		{#each gridLines as val}
			<line
				x1={xPos(val)}
				y1={chartTop - 4}
				x2={xPos(val)}
				y2={totalHeight}
				stroke="#e2e8f0"
				stroke-width="0.5"
			/>
			<text
				x={xPos(val)}
				y={totalHeight + 14}
				text-anchor="middle"
				font-size="9"
				fill="#94a3b8">${val}m</text
			>
		{/each}

		<!-- Bars -->
		{#each groups as group}
			<text
				x={chartLeft - 8}
				y={group.labelY + 5}
				text-anchor="end"
				font-size="10"
				fill="#374151">{group.name}</text
			>
			{#each group.bars as bar}
				<rect
					x={bar.x}
					y={bar.y}
					width={bar.width}
					height={bar.height}
					fill={bar.color}
					rx="2"
				/>
			{/each}
		{/each}
	</svg>
	<div class="probabilities">
		<span class="prob-label">Development Probabilities:</span>
		{#each developmentProbabilities as prob}
			<span class="prob-item" style="color: {prob.color}"
				>{prob.name}: {prob.percentage}%</span
			>
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
		margin: 0 0 10px;
	}

	.chart-svg {
		width: 100%;
		height: auto;
	}

	.probabilities {
		margin-top: 8px;
		font-size: 11px;
		display: flex;
		flex-wrap: wrap;
		gap: 4px 12px;
	}

	.prob-label {
		font-weight: 600;
		color: #0f172a;
	}

	.prob-item {
		font-weight: 600;
	}
</style>
