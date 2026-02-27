<script lang="ts">
	import type { FooterItem } from '../types.js';

	interface Props {
		items: FooterItem[];
		disclaimer: string;
	}

	let { items, disclaimer }: Props = $props();
</script>

<footer class="footer">
	<p class="footer-meta">
		{#each items as item, i}{#if i > 0}<span class="sep">&nbsp;|&nbsp;</span>{/if}<strong>{item.label}:</strong>&nbsp;{item.value}{/each}
	</p>
	<p class="footer-disclaimer">{disclaimer}</p>
</footer>

<style>
	.footer {
		text-align: center;
		padding: 20px 24px 16px;
		border-top: 1px solid #e2e8f0;
	}

	.footer-meta {
		font-size: 12px;
		color: #374151;
		margin: 0;
	}

	.footer-meta strong {
		font-weight: 700;
	}

	.sep {
		color: #94a3b8;
	}

	.footer-disclaimer {
		font-size: 10.5px;
		color: #94a3b8;
		margin: 6px 0 0;
		font-style: italic;
	}
</style>
