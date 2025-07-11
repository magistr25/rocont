import { defineConfig } from 'vite';

export default defineConfig({
    base: '/rocont/',
    root: 'src',
    build: {
        outDir: '../dist',
        emptyOutDir: true,
    },
    server: {
        open: true,
    },
});
