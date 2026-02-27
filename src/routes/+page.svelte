<script lang="ts">
	import type { InvestorPitch } from '$lib/types';
	import sampleData from '$lib/data/sample.json';
	import Header from '$lib/components/Header.svelte';
	import InvestmentThesis from '$lib/components/InvestmentThesis.svelte';
	import ValuePropositions from '$lib/components/ValuePropositions.svelte';
	import AssetLocation from '$lib/components/AssetLocation.svelte';
	import PortfolioValueChart from '$lib/components/PortfolioValueChart.svelte';
	import SensitivitySection from '$lib/components/SensitivitySection.svelte';
	import DevelopmentTimeline from '$lib/components/DevelopmentTimeline.svelte';
	import KeyPartners from '$lib/components/KeyPartners.svelte';
	import KeyRisks from '$lib/components/KeyRisks.svelte';
	import Footer from '$lib/components/Footer.svelte';

	const pitch: InvestorPitch = sampleData;
</script>

<svelte:head>
	<title>{pitch.company.name} — Investor Summary</title>
</svelte:head>

<div class="page-wrapper">
	<div class="page">
		<Header
			companyName={pitch.company.name}
			subtitle={pitch.company.subtitle}
			metrics={pitch.keyMetrics}
		/>

		<div class="content-grid">
			<!-- Left Column -->
			<div class="col-left">
				<InvestmentThesis
					title={pitch.investmentThesis.title}
					content={pitch.investmentThesis.content}
				/>
				<ValuePropositions
					title={pitch.valuePropositions.title}
					items={pitch.valuePropositions.items}
				/>
				<AssetLocation
					title={pitch.assetLocation.title}
					assetLabels={pitch.assetLocation.assetLabels}
					stats={pitch.assetLocation.stats}
				/>
				<PortfolioValueChart
					title={pitch.portfolioValue.title}
					assets={pitch.portfolioValue.assets}
					maxValue={pitch.portfolioValue.maxValue}
					gridLines={pitch.portfolioValue.gridLines}
					developmentProbabilities={pitch.portfolioValue.developmentProbabilities}
				/>
			</div>

			<!-- Right Column -->
			<div class="col-right">
				<SensitivitySection data={pitch.priceSensitivity} />
				<DevelopmentTimeline
					title={pitch.developmentTimeline.title}
					milestones={pitch.developmentTimeline.milestones}
				/>
				<KeyPartners
					title={pitch.keyPartners.title}
					partners={pitch.keyPartners.partners}
				/>
				<KeyRisks title={pitch.keyRisks.title} risks={pitch.keyRisks.risks} />
			</div>
		</div>

		<Footer items={pitch.footer.items} disclaimer={pitch.footer.disclaimer} />
	</div>
</div>

<style>
	.page-wrapper {
		display: flex;
		justify-content: center;
		padding: 24px;
		min-height: 100vh;
	}

	.page {
		width: 100%;
		max-width: 1060px;
		background: #fff;
		border-radius: 8px;
		overflow: hidden;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06), 0 4px 16px rgba(0, 0, 0, 0.04);
	}

	.content-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 16px;
		padding: 16px 24px;
	}

	.col-left,
	.col-right {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}
</style>
