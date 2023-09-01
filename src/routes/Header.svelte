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
		UnstyledButton
	} from '@svelteuidev/core';
	import Color from '../colors';
	import { gameStore } from '../store/Game';
	import { Position, type IPlayer, type IGame } from '../types';
	import { Settings, closeSettings, openSettings } from '../store/Settings';

	let playerN = '';
	let playerE = '';
	let playerS = '';
	let playerW = '';
	let amountPerF = 1;
	let amountPerD = 1;

	let confirmModalOpened = false;

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
			players: null,
			results: []
		});
		onCloseConfirmation();
	}
</script>

<header>
	<div class="corner">
		<!-- <img src={mahjong} alt="mahjong" /> -->
	</div>

	<nav>
		<svg viewBox="0 0 2 3" aria-hidden="true">
			<path d="M0,0 L1,2 C1.5,3 1.5,3 2,3 L2,0 Z" />
		</svg>
		<ul>
			<li aria-current={$page.url.pathname === '/' ? 'page' : undefined}>
				<a href="/">計番</a>
			</li>
			<li aria-current={$page.url.pathname === '/scores' ? 'page' : undefined}>
				<a href="/scores">計分</a>
			</li>
		</ul>
		<svg viewBox="0 0 2 3" aria-hidden="true">
			<path d="M0,0 L0,3 C0.5,3 0.5,3 1,2 L2,0 Z" />
		</svg>
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
	<NumberInput label={'幾多錢一番'} bind:value={amountPerF} />
	<Space h={5} />
	<NumberInput label={'幾多錢一底'} bind:value={amountPerD} />
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
		<Text>你確認要重置所有資料?</Text>
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
		display: flex;
		justify-content: center;
		--background: rgba(255, 255, 255, 0.7);
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
		height: 3em;
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
