import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';

const config: Config = {
  title:   'AdsWire Documentation',
  tagline: 'AI executes. You drive the strategy.',
  url:     'https://docs.adswire.io',
  baseUrl: '/',

  organizationName: 'AdsWireIO',
  projectName:      'docs',

  onBrokenLinks:        'throw',
  onBrokenMarkdownLinks: 'warn',

  favicon: 'favicon.ico',
  headTags: [
    { tagName: 'link', attributes: { rel: 'alternate icon', href: '/favicon.ico' } },
    { tagName: 'link', attributes: { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' } },
    { tagName: 'link', attributes: { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' } },
    { tagName: 'link', attributes: { rel: 'icon', type: 'image/png', sizes: '96x96', href: '/favicon-96x96.png' } },
    { tagName: 'link', attributes: { rel: 'apple-touch-icon', sizes: '57x57', href: '/apple-icon-57x57.png' } },
    { tagName: 'link', attributes: { rel: 'apple-touch-icon', sizes: '60x60', href: '/apple-icon-60x60.png' } },
    { tagName: 'link', attributes: { rel: 'apple-touch-icon', sizes: '72x72', href: '/apple-icon-72x72.png' } },
    { tagName: 'link', attributes: { rel: 'apple-touch-icon', sizes: '76x76', href: '/apple-icon-76x76.png' } },
    { tagName: 'link', attributes: { rel: 'apple-touch-icon', sizes: '114x114', href: '/apple-icon-114x114.png' } },
    { tagName: 'link', attributes: { rel: 'apple-touch-icon', sizes: '120x120', href: '/apple-icon-120x120.png' } },
    { tagName: 'link', attributes: { rel: 'apple-touch-icon', sizes: '144x144', href: '/apple-icon-144x144.png' } },
    { tagName: 'link', attributes: { rel: 'apple-touch-icon', sizes: '152x152', href: '/apple-icon-152x152.png' } },
    { tagName: 'link', attributes: { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-icon-180x180.png' } },
    { tagName: 'link', attributes: { rel: 'icon', type: 'image/png', sizes: '192x192', href: '/android-icon-192x192.png' } },
    { tagName: 'link', attributes: { rel: 'manifest', href: '/manifest.json' } },
    { tagName: 'meta', attributes: { name: 'msapplication-TileColor', content: '#ffffff' } },
    { tagName: 'meta', attributes: { name: 'msapplication-TileImage', content: '/ms-icon-144x144.png' } },
    { tagName: 'meta', attributes: { name: 'theme-color', content: '#ffffff' } },
  ],

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
    // es, fr, pt — add when content is ready
  },

  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: '/',   // docs at root, not /docs/
          sidebarPath:   './sidebars.ts',
          editUrl: 'https://github.com/AdsWireIO/docs/tree/main/',
          showLastUpdateTime: true,
        },
        blog:  false,   // no blog
        theme: {
          customCss: './src/css/custom.css',
        },
      },
    ],
  ],

  themeConfig: {
    navbar: {
      title: 'AdsWire',
      logo: {
        alt: 'AdsWire logo',
        src: 'img/logo.svg',
      },
      items: [
        {to: '/',            label: 'Docs',      position: 'left'},
        {to: '/tools',       label: 'Tools',     position: 'left'},
        {to: '/quickstart',  label: 'Quickstart', position: 'left'},
        {
          href: 'https://app.adswire.io/register',
          label: 'Start free trial',
          position: 'right',
        },
        {
          href: 'https://github.com/AdsWireIO/docs',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },

    footer: {
      style: 'dark',
      links: [
        {
          title: 'Product',
          items: [
            {label: 'Start free trial', href: 'https://app.adswire.io/register'},
            {label: 'Sign in',          href: 'https://app.adswire.io/login'},
            {label: 'Pricing',          to:   '/pricing'},
          ],
        },
        {
          title: 'Documentation',
          items: [
            {label: 'Quickstart',     to: '/quickstart'},
            {label: 'Tools',          to: '/tools'},
            {label: 'Authentication', to: '/authentication'},
            {label: 'Governance',     to: '/governance'},
          ],
        },
        {
          title: 'Company',
          items: [
            {label: 'adswire.io',   href: 'https://www.adswire.io'},
            {label: 'Contact',      href: 'mailto:hello@adswire.io'},
            {label: 'Privacy',      href: 'https://www.adswire.io/privacy'},
            {label: 'Terms',        href: 'https://www.adswire.io/terms'},
          ],
        },
      ],
      copyright: `© ${new Date().getFullYear()} AdsWire. Toronto, Ontario, Canada.`,
    },

    prism: {
      theme:     prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash', 'json', 'python', 'php'],
    },

    // algolia: {
    //   // Add Algolia DocSearch when live — free for open-source docs
    //   // Apply at: docsearch.algolia.com
    //   // appId:     'YOUR_APP_ID',
    //   // apiKey:    'YOUR_SEARCH_API_KEY',
    //   // indexName: 'adswire',
    // },
  },
};

export default config;
