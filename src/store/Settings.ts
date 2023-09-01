import { writable } from "svelte/store";
import type { ISettings } from "../types";

export const Settings = writable<ISettings>(
  {
    isOpened: false
  }
)

export function openSettings() {
  Settings.set({
    isOpened: true
  })
}

export function closeSettings() {
  Settings.set({
    isOpened: false
  })
}