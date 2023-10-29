import { writable, type Writable } from "svelte/store";

export let darkMode: Writable<boolean> = writable();