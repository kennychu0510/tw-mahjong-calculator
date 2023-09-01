<script lang="ts">
	import { page } from '$app/stores';
	import Icon from '@iconify/svelte';
	import {
		Button,
		Modal,
		NumberInput,
		Space,
		Text,
		TextInput,
		UnstyledButton,
		Switch,

		Checkbox

	} from '@svelteuidev/core';
	import Color from '../colors';
	import { gameStore } from '../store/Game';
	import { Position, type IPlayer, type IGame } from '../types';
	import { Settings, closeSettings, openSettings } from '../store/Settings';
	import { onMount } from 'svelte';
	import { fly, slide } from 'svelte/transition';

	let playerN = '';
	let playerE = '';
	let playerS = '';
	let playerW = '';
	let amountPerF = 1;
	let amountPerD = 1;
	let scrolling = false;

	let confirmModalOpened = false;
	let timeout: any;
	let scrollY: number;

	function closeModal() {
		closeSettings();
	}

	function openModal() {
		openSettings();
	}

	function onShowConfirmation() {
		closeSettings();
		confirmModalOpened = true;
	}

	function onCloseConfirmation() {
		openSettings();
		confirmModalOpened = false;
	}

	function onSave() {
		const players: IGame['players'] = {
			[Position.N]: {
				name: playerN,
				key: Position.N
			},
			[Position.E]: {
				name: playerE,
				key: Position.E
			},
			[Position.S]: {
				name: playerS,
				key: Position.S
			},
			[Position.W]: {
				name: playerW,
				key: Position.W
			}
		};
		gameStore.update((state) => ({
			...state,
			players: players
		}));
		closeModal();
	}

	function onConfirmReset() {
		gameStore.set({
			players: {
				N: {
					key: Position.N,
					name: ''
				},
				E: {
					key: Position.E,
					name: ''
				},
				S: {
					key: Position.S,
					name: ''
				},
				W: {
					key: Position.W,
					name: ''
				}
			},
			results: []
		});
		onCloseConfirmation();
	}

	function handleScroll() {
		if (scrollY < 100) {
			scrolling = false;
			return;
		}
		scrolling = true;

		// Your scrolling function here
		// ...
		clearTimeout(timeout);
		timeout = setTimeout(() => {
			scrolling = false;

			// Your function when scrolling stops here
			// ...
		}, 150); // Adjust the debounce timeout as needed
	}

	onMount(() => {
		window.addEventListener('scroll', handleScroll);
	});
</script>

<svelte:window bind:scrollY />

<header>
	<div class="corner">
		<!-- <img src={mahjong} alt="mahjong" /> -->
	</div>

	<nav style="--nav-opacity: {scrolling ? 0.5 : 1}">
		<ul>
			<li aria-current={$page.url.pathname === '/' ? 'page' : undefined}>
				<a href="/">計番</a>
			</li>
			<li aria-current={$page.url.pathname === '/scores' ? 'page' : undefined}>
				<a href="/scores">計分</a>
			</li>
		</ul>
	</nav>

	<div class="corner">
		<UnstyledButton on:click={openModal}>
			<Icon icon="tabler:settings" width="30" height="30" color={Color.orange} />
		</UnstyledButton>
	</div>
</header>
<Modal opened={$Settings.isOpened} on:close={closeModal}>
	<TextInput label={`玩家-東`} bind:value={playerE} />
	<Space h={5} />
	<TextInput label={`玩家-南`} bind:value={playerS} />
	<Space h={5} />
	<TextInput label={`玩家-西`} bind:value={playerW} />
	<Space h={5} />
	<TextInput label={`玩家-北`} bind:value={playerN} />
	<Space h={5} />
	<!-- <NumberInput label={'幾多錢一番'} bind:value={amountPerF} />
	<Space h={5} />
	<NumberInput label={'幾多錢一底'} bind:value={amountPerD} /> -->
	<div class="button-container">
		<Button color="red" on:click={onShowConfirmation}
			><Icon icon="tabler:trash" width="20" height="20" /></Button
		>
		<Button color="green" on:click={onSave}
			><Icon icon="charm:tick" width="20" height="20" /></Button
		>
	</div>
</Modal>
<Modal opened={confirmModalOpened} on:close={onCloseConfirmation} centered={true}>
	<div class="confirmation-content">
		<Text>你確認要重新開局?</Text>
		<Space h={10}/>
		<Checkbox label={'保留玩家名？'} />
		<div class="button-container">
			<Button on:click={onCloseConfirmation}
				><Icon icon="icon-park-outline:back" width="20" height="20" /></Button
			>
			<Button color="red" on:click={onConfirmReset}
				><Icon icon="tabler:trash" width="20" height="20" /></Button
			>
		</div>
	</div>
</Modal>

<style>
	header {
		display: flex;
		justify-content: space-between;
	}

	.corner {
		width: 3em;
		height: 3em;
		padding: 10px;
	}

	.corner img {
		width: 2em;
		height: 2em;
		object-fit: contain;
	}

	nav {
		position: fixed;
		top: 0;
		left: 50%;
		transform: translateX(-50%);
		display: flex;
		justify-content: center;
		background-color: white;
		border-radius: 0 0 10px 10px;
		height: 3em;
		padding: 0 10px;
		z-index: 200;
		opacity: var(--nav-opacity);
	}

	svg {
		width: 2em;
		height: 3em;
		display: block;
	}

	path {
		fill: var(--background);
	}

	ul {
		position: relative;
		padding: 0;
		margin: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		list-style: none;
		background: var(--background);
		background-size: contain;
	}

	li {
		position: relative;
		height: 100%;
	}

	li[aria-current='page']::before {
		--size: 6px;
		content: '';
		width: 0;
		height: 0;
		position: absolute;
		top: 0;
		left: calc(50% - var(--size));
		border: var(--size) solid transparent;
		border-top: var(--size) solid var(--color-theme-1);
	}

	nav a {
		display: flex;
		height: 100%;
		align-items: center;
		padding: 0 0.5rem;
		color: var(--color-text);
		font-weight: 700;
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		text-decoration: none;
		transition: color 0.2s linear;
	}

	a:hover {
		color: var(--color-theme-1);
	}

	.button-container {
		display: flex;
		justify-content: space-between;
		margin-top: 20px;
	}

	.confirmation-content {
		display: flex;
		flex-direction: column;
	}
</style>
