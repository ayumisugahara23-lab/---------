import { svelte } from '@sveltejs/vite-plugin-svelte'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
plugins: [
svelte(),
VitePWA({
registerType: 'autoUpdate',
includeAssets: ['favicon.svg', 'icons.svg'],
manifest: {
name: 'Minamo',
short_name: 'Minamo',
description: 'のんびり楽しむ不思議な生き物の育成ゲーム',
theme_color: '#b9e8f5',
background_color: '#eafaff',
display: 'standalone',
orientation: 'portrait',
start_url: '/',
scope: '/',
icons: [
{
src: '/icons.svg',
sizes: 'any',
type: 'image/svg+xml',
purpose: 'any'
}
]
}
})
]
})
