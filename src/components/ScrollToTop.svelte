<script>
	import { fly } from 'svelte/transition';
	import { Affix, Button, createStyles } from '@svelteuidev/core';
	import Icon from '@iconify/svelte';
	import { scrollTop } from 'svelte-scrolling';
	import Color from '../colors';

	const useStyles = createStyles(() => ({
		button: {
			opacity: 0.8
		}
	}));

	let scrollY = 0;

	$: ({ classes } = useStyles());
</script>

<svelte:window on:scroll={() => (scrollY = window.scrollY)} />

<Affix position={{ bottom: 0, right: 20 }}>
	{#if scrollY > 0}
		<div transition:fly={{ y: 20, duration: 250 }}>
			<Button color="white" on:click={() => scrollTop()} class={classes.button}>
				<Icon icon="formkit:arrowup" width="30" height="30" color={Color.orange} />
			</Button>
		</div>
	{/if}
</Affix>

<style>
</style>
