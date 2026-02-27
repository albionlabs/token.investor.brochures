import type { Component } from 'svelte';

export interface TemplateMeta {
	id: string;
	name: string;
	description: string;
	version: string;
	category: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface TemplateDefinition<TData = any> {
	meta: TemplateMeta;
	renderer: Component<{ data: TData }>;
	schema: Record<string, unknown>;
	sampleData: TData;
}
