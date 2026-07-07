import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  docs: [
    'index',
    'quickstart',
    {
      type:  'category',
      label: 'Tools',
      link:  {type: 'doc', id: 'tools/index'},
      items: [],
    },
    'authentication',
    'google-workspace',
    'governance',
    'pricing',
    'changelog',
  ],
};

export default sidebars;
