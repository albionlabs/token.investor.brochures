<script lang="ts">
	import type { InvestorPitch } from '$lib/types';

	interface Props {
		data: InvestorPitch['priceSensitivity'];
	}

	let { data }: Props = $props();

	const { chart, table, footnote } = $derived(data);

	// Chart dimensions
	const svgW = 460;
	const svgH = 220;
	const padLeft = 52;
	const padRight = 10;
	const padTop = 12;
	const padBottom = 30;
	const plotW = svgW - padLeft - padRight;
	const plotH = svgH - padTop - padBottom;

	function scaleX(val: number): number {
		return padLeft + ((val - chart.xRange[0]) / (chart.xRange[1] - chart.xRange[0])) * plotW;
	}

	function scaleY(val: number): number {
		return padTop + plotH - ((val - chart.yRange[0]) / (chart.yRange[1] - chart.yRange[0])) * plotH;
	}

	const linePath = $derived(
		chart.dataPoints
			.map((p, i) => `${i === 0 ? 'M' : 'L'} ${scaleX(p.x)} ${scaleY(p.y)}`)
			.join(' ')
	);

	const xTicks = $derived(() => {
		const ticks: number[] = [];
		for (let v = chart.xRange[0]; v <= chart.xRange[1]; v += chart.xStep) {
			ticks.push(v);
		}
		return ticks;
	});

	const yTicks = $derived(() => {
		const ticks: number[] = [];
		for (let v = chart.yRange[0]; v <= chart.yRange[1]; v += chart.yStep) {
			ticks.push(v);
		}
		return ticks;
	});
</script>

<section class="card">
	<h2 class="section-title">{data.title}</h2>

	<!-- Line Chart -->
	<svg viewBox="0 0 {svgW} {svgH}" class="line-chart" xmlns="http://www.w3.org/2000/svg">
		<!-- Y grid lines and labels -->
		{#each yTicks() as val}
			<line
				x1={padLeft}
				y1={scaleY(val)}
				x2={svgW - padRight}
				y2={scaleY(val)}
				stroke="#e2e8f0"
				stroke-width="0.5"
			/>
			<text
				x={padLeft - 6}
				y={scaleY(val) + 3}
				text-anchor="end"
				font-size="9"
				fill="#94a3b8">${val}m</text
			>
		{/each}

		<!-- X labels -->
		{#each xTicks() as val}
			<text
				x={scaleX(val)}
				y={svgH - 6}
				text-anchor="middle"
				font-size="9"
				fill="#94a3b8">${val}</text
			>
		{/each}

		<!-- Base case dashed line -->
		<line
			x1={scaleX(chart.baseCaseX)}
			y1={padTop}
			x2={scaleX(chart.baseCaseX)}
			y2={padTop + plotH}
			stroke="#94a3b8"
			stroke-width="0.8"
			stroke-dasharray="4,3"
		/>
		<text
			x={scaleX(chart.baseCaseX)}
			y={scaleY(chart.dataPoints.find((p) => p.x === chart.baseCaseX)?.y ?? 44) + 14}
			text-anchor="middle"
			font-size="8.5"
			fill="#64748b"
			font-weight="500">{chart.baseCaseLabel}</text
		>

		<!-- Area fill under line -->
		<path
			d="{linePath} L {scaleX(chart.dataPoints[chart.dataPoints.length - 1].x)} {padTop + plotH} L {scaleX(chart.dataPoints[0].x)} {padTop + plotH} Z"
			fill="#0d9488"
			fill-opacity="0.06"
		/>

		<!-- Line -->
		<path d={linePath} fill="none" stroke="#0d9488" stroke-width="2" />

		<!-- Data points -->
		{#each chart.dataPoints as point}
			<circle
				cx={scaleX(point.x)}
				cy={scaleY(point.y)}
				r="3"
				fill="#fff"
				stroke="#0d9488"
				stroke-width="1.5"
			/>
		{/each}
	</svg>

	<!-- Data Table -->
	<table class="data-table">
		<thead>
			<tr>
				{#each table.columns as col}
					<th>{col.label}</th>
				{/each}
			</tr>
		</thead>
		<tbody>
			{#each table.rows as row, rowIdx}
				<tr class:highlight-row={rowIdx === table.highlightRowIndex}>
					{#each table.columns as col}
						<td
							style={col.highlightColor ? `color: ${col.highlightColor}; font-weight: 600` : ''}
						>
							{row[col.key]}
						</td>
					{/each}
				</tr>
			{/each}
		</tbody>
	</table>

	{#if footnote}
		<p class="footnote">{footnote}</p>
	{/if}
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

	.line-chart {
		width: 100%;
		height: auto;
	}

	.data-table {
		width: 100%;
		border-collapse: collapse;
		font-size: 12px;
		margin-top: 12px;
	}

	.data-table th {
		text-align: left;
		font-weight: 600;
		color: #374151;
		padding: 6px 8px;
		border-bottom: 1.5px solid #cbd5e1;
		font-size: 11px;
	}

	.data-table td {
		padding: 5px 8px;
		color: #374151;
		border-bottom: 1px solid #f1f5f9;
	}

	.highlight-row td {
		font-weight: 700;
		color: #0f172a;
	}

	.footnote {
		font-size: 10.5px;
		color: #94a3b8;
		margin: 8px 0 0;
		font-style: italic;
	}
</style>
