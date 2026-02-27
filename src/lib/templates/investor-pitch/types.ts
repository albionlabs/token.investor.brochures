export interface KeyMetric {
	label: string;
	value: string;
	highlight?: boolean;
}

export interface ValueProposition {
	text: string;
}

export interface AssetStat {
	label: string;
	value: string;
	description: string;
}

export interface AssetLabel {
	name: string;
	x: number;
	y: number;
}

export interface BarSegment {
	value: number;
	color: string;
	label: string;
}

export interface PortfolioAsset {
	name: string;
	bars: BarSegment[];
}

export interface DevProbability {
	name: string;
	percentage: number;
	color: string;
}

export interface ChartDataPoint {
	x: number;
	y: number;
}

export interface SensitivityColumn {
	key: string;
	label: string;
	highlightColor?: string;
}

export interface TimelineMilestone {
	year: string;
	label: string;
	color: string;
}

export interface Partner {
	name: string;
	description: string;
}

export interface FooterItem {
	label: string;
	value: string;
}

export interface InvestorPitch {
	company: {
		name: string;
		subtitle: string;
	};
	keyMetrics: KeyMetric[];
	investmentThesis: {
		title: string;
		content: string;
	};
	valuePropositions: {
		title: string;
		items: ValueProposition[];
	};
	assetLocation: {
		title: string;
		mapDescription: string;
		assetLabels: AssetLabel[];
		stats: AssetStat[];
	};
	portfolioValue: {
		title: string;
		assets: PortfolioAsset[];
		maxValue: number;
		gridLines: number[];
		developmentProbabilities: DevProbability[];
	};
	priceSensitivity: {
		title: string;
		chart: {
			xAxisLabel: string;
			yAxisLabel: string;
			xRange: [number, number];
			yRange: [number, number];
			xStep: number;
			yStep: number;
			dataPoints: ChartDataPoint[];
			baseCaseX: number;
			baseCaseLabel: string;
		};
		table: {
			columns: SensitivityColumn[];
			rows: Record<string, string>[];
			highlightRowIndex: number;
		};
		footnote: string;
	};
	developmentTimeline: {
		title: string;
		milestones: TimelineMilestone[];
	};
	keyPartners: {
		title: string;
		partners: Partner[];
	};
	keyRisks: {
		title: string;
		risks: string[];
	};
	footer: {
		items: FooterItem[];
		disclaimer: string;
	};
}
