// Registry
export { templateRegistry, getTemplate, listTemplates } from './registry.js';

// Shared types
export type { TemplateMeta, TemplateDefinition } from './types.js';

// Investor Pitch template
export {
	InvestorPitchRenderer,
	investorPitchMeta,
	investorPitchSchema,
	investorPitchSampleData
} from './templates/investor-pitch/index.js';

export type { InvestorPitch } from './templates/investor-pitch/types.js';
