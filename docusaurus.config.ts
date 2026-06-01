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

  favicon: 'img/favicon.ico',

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
