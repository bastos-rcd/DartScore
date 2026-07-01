import PocketBase from 'pocketbase'

const POCKETBASE_URL = import.meta.env.VITE_PB_URL ?? 'http://localhost:8090'

export const db = new PocketBase(POCKETBASE_URL)
