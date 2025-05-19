import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import fs from 'fs/promises';
import svgr from '@svgr/rollup';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), svgr()],
    resolve: {
        alias: {
            src: resolve(__dirname, 'src'),
        },
    },
    build: {
        chunkSizeWarningLimit: 1000, // Aumenta il limite di warning per i chunk size
        rollupOptions: {
            output: {
                manualChunks: {
                    // Separa le librerie di terze parti in chunks diversi
                    'vendor-react': ['react', 'react-dom', 'react-router-dom'],
                    'vendor-ui': ['flowbite-react', '@iconify/react'],
                    'vendor-utils': ['date-fns', 'zustand', 'formik', 'yup'],
                    'vendor-charts': ['apexcharts', 'react-apexcharts'],
                    'vendor-pdf': ['jspdf', 'html2canvas'],
                },
            },
        },
    },
    esbuild: {
        loader: 'tsx',
        include: /src\/.*\.tsx?$/,
        exclude: [],
    },
    optimizeDeps: {
        esbuildOptions: {
            plugins: [
                {
                    name: 'load-js-files-as-tsx',
                    setup(build) {
                        build.onLoad(
                            { filter: /src\\.*\.js$/ },
                            async (args) => ({
                                loader: 'tsx',
                                contents: await fs.readFile(args.path, 'utf8'),
                            })
                        );
                    },
                },
            ],
        },
    },
});