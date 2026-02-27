import type { TemplateDefinition } from './types.js';
import type { InvestorPitch } from './templates/investor-pitch/types.js';
import { InvestorPitchRenderer, investorPitchMeta, investorPitchSchema, investorPitchSampleData } from './templates/investor-pitch/index.js';

const investorPitchTemplate: TemplateDefinition<InvestorPitch> = {
	meta: investorPitchMeta,
	renderer: InvestorPitchRenderer,
	schema: investorPitchSchema as unknown as Record<string, unknown>,
	sampleData: investorPitchSampleData as unknown as InvestorPitch
};

export const templateRegistry = new Map<string, TemplateDefinition>([
	['investor-pitch', investorPitchTemplate]
]);

export function getTemplate(id: string): TemplateDefinition | undefined {
	return templateRegistry.get(id);
}

export function listTemplates(): TemplateDefinition[] {
	return Array.from(templateRegistry.values());
}
