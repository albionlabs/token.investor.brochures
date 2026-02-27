<script lang="ts">
	import type { TimelineMilestone } from '../types.js';

	interface Props {
		title: string;
		milestones: TimelineMilestone[];
	}

	let { title, milestones }: Props = $props();
</script>

<section class="card">
	<h2 class="section-title">{title}</h2>
	<div class="timeline">
		<div class="timeline-track"></div>
		{#each milestones as milestone, i}
			<div class="milestone" style="left: {(i / (milestones.length - 1)) * 100}%">
				<div class="dot" style="background: {milestone.color}"></div>
				<div class="milestone-year">{milestone.year}</div>
				<div class="milestone-label">{milestone.label}</div>
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
		margin: 0 0 20px;
	}

	.timeline {
		position: relative;
		height: 80px;
		margin: 0 20px;
	}

	.timeline-track {
		position: absolute;
		top: 8px;
		left: 0;
		right: 0;
		height: 2px;
		background: #e2e8f0;
	}

	.milestone {
		position: absolute;
		transform: translateX(-50%);
		display: flex;
		flex-direction: column;
		align-items: center;
		width: max-content;
	}

	.dot {
		width: 16px;
		height: 16px;
		border-radius: 50%;
		flex-shrink: 0;
	}

	.milestone-year {
		font-size: 14px;
		font-weight: 700;
		color: #0f172a;
		margin-top: 8px;
	}

	.milestone-label {
		font-size: 10.5px;
		color: #64748b;
		text-align: center;
		line-height: 1.3;
		white-space: pre-line;
	}
</style>
