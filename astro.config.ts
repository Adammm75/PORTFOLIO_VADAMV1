import { defineConfig } from 'astro/config'

import mdx from '@astrojs/mdx'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import icon from 'astro-icon'

import { rehypeHeadingIds } from '@astrojs/markdown-remark'
import expressiveCode from 'astro-expressive-code'
import rehypeExternalLinks from 'rehype-external-links'
import rehypeKatex from 'rehype-katex'
import remarkEmoji from 'remark-emoji'
import remarkMath from 'remark-math'
import remarkSectionize from 'remark-sectionize'

import { pluginCollapsibleSections } from '@expressive-code/plugin-collapsible-sections'
import { pluginLineNumbers } from '@expressive-code/plugin-line-numbers'

import tailwindcss from '@tailwindcss/vite'

import { rehypeShiftHeadings } from './src/lib/rehype-shift-headings'
import { SITE_URL } from './src/site.config'

export default defineConfig({
  // Single source of truth lives in src/site.config.ts
  site: SITE_URL,

  // Fully static output: no server runtime, deployable as-is on Netlify,
  // Vercel, GitHub Pages or any static host.
  output: 'static',

  integrations: [
    expressiveCode({
      themes: ['vitesse-light', 'vitesse-dark'],
      plugins: [pluginCollapsibleSections(), pluginLineNumbers()],
      // The site toggles `.dark` on <html>, so code blocks must follow the
      // class rather than the OS-level media query.
      useDarkModeMediaQuery: false,
      themeCssSelector: (theme) =>
        theme.type === 'dark' ? '.dark' : ':root:not(.dark)',
      styleOverrides: {
        borderRadius: '0.75rem',
        borderColor: 'var(--border)',
        codeFontFamily: 'var(--font-mono)',
        uiFontFamily: 'var(--font-sans)',
      },
      defaultProps: {
        wrap: true,
        collapseStyle: 'collapsible-auto',
        overridesByLang: {
          'ansi,bat,bash,batch,cmd,console,powershell,ps,ps1,psd1,psm1,sh,shell,shellscript,shellsession,text,zsh':
            {
              showLineNumbers: true,
            },
        },
      },
    }),
    mdx(),
    react(),
    sitemap(),
    icon(),
  ],

  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      exclude: ['satori', 'satori-html'],
      include: [
        'react',
        'react-dom',
        'clsx',
        'framer-motion',
        'lucide-react',
        'react-icons/si',
      ],
    },
  },

  server: {
    port: 3000,
    host: true,
  },

  devToolbar: {
    enabled: false,
  },

  markdown: {
    syntaxHighlight: false,
    rehypePlugins: [
      // Runs first so heading ids and the table of contents see the final levels.
      rehypeShiftHeadings,
      [
        rehypeExternalLinks,
        {
          target: '_blank',
          rel: ['nofollow', 'noreferrer', 'noopener'],
        },
      ],
      rehypeHeadingIds,
      rehypeKatex,
    ],
    remarkPlugins: [remarkMath, remarkEmoji, remarkSectionize],
  },
})
