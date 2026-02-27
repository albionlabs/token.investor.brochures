<script lang="ts">
	import type { InvestorPitch } from './types.js';
	import Header from './components/Header.svelte';
	import InvestmentThesis from './components/InvestmentThesis.svelte';
	import ValuePropositions from './components/ValuePropositions.svelte';
	import AssetLocation from './components/AssetLocation.svelte';
	import PortfolioValueChart from './components/PortfolioValueChart.svelte';
	import SensitivitySection from './components/SensitivitySection.svelte';
	import DevelopmentTimeline from './components/DevelopmentTimeline.svelte';
	import KeyPartners from './components/KeyPartners.svelte';
	import KeyRisks from './components/KeyRisks.svelte';
	import Footer from './components/Footer.svelte';

	interface Props {
		data: InvestorPitch;
	}

	let { data }: Props = $props();
</script>

<div class="pitch-page">
	<Header
		companyName={data.company.name}
		subtitle={data.company.subtitle}
		metrics={data.keyMetrics}
	/>

	<div class="content-grid">
		<!-- Left Column -->
		<div class="col-left">
			<InvestmentThesis
				title={data.investmentThesis.title}
				content={data.investmentThesis.content}
			/>
			<ValuePropositions
				title={data.valuePropositions.title}
				items={data.valuePropositions.items}
			/>
			<AssetLocation
				title={data.assetLocation.title}
				assetLabels={data.assetLocation.assetLabels}
				stats={data.assetLocation.stats}
			/>
			<PortfolioValueChart
				title={data.portfolioValue.title}
				assets={data.portfolioValue.assets}
				maxValue={data.portfolioValue.maxValue}
				gridLines={data.portfolioValue.gridLines}
				developmentProbabilities={data.portfolioValue.developmentProbabilities}
			/>
		</div>

		<!-- Right Column -->
		<div class="col-right">
			<SensitivitySection data={data.priceSensitivity} />
			<DevelopmentTimeline
				title={data.developmentTimeline.title}
				milestones={data.developmentTimeline.milestones}
			/>
			<KeyPartners
				title={data.keyPartners.title}
				partners={data.keyPartners.partners}
			/>
			<KeyRisks title={data.keyRisks.title} risks={data.keyRisks.risks} />
		</div>
	</div>

	<Footer items={data.footer.items} disclaimer={data.footer.disclaimer} />
</div>

<style>
	@import '../../shared/styles/print-base.css';
	@import '../investor-pitch/print.css';

	.pitch-page {
		width: 100%;
		max-width: 1060px;
		background: #fff;
		border-radius: 8px;
		overflow: hidden;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06), 0 4px 16px rgba(0, 0, 0, 0.04);
		font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
		color: #0f172a;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
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
