import starlight from '@astrojs/starlight';
import { defineConfig } from 'astro/config';

const SITE = 'https://docs.gondi.xyz';

/** Legacy GitBook URLs that the app and external sites still link to. */
const redirects = {
  '/gondi-v3': '/',
  '/gondi-v3/introducing-gondi': '/',
  '/refinancing': '/gondi-v3/refinancing',
  '/wrapper': '/gondi-v3/vaults-and-stash',
  '/learn': '/learn/how-to-make-a-loan-offer',
  '/connect': '/connect/official-links',
  '/gondi-v1-and-v2': '/gondi-v1-and-v2/gondi-v2',
};

const v3 = (slug) => `gondi-v3/${slug}`;
const v2 = (slug) => `gondi-v1-and-v2/gondi-v2/${slug}`;
const v1 = (slug) => `gondi-v1-and-v2/gondi-v1/${slug}`;

export default defineConfig({
  site: SITE,
  redirects,
  integrations: [
    starlight({
      title: 'GONDI Docs',
      description:
        'Documentation for GONDI, the NFT liquidity protocol: trading, lending, contracts and guides.',
      logo: {
        light: './src/assets/logo-light.svg',
        dark: './src/assets/logo-dark.svg',
        replacesTitle: true,
      },
      favicon: '/favicon.svg',
      social: [
        { icon: 'x.com', label: 'X', href: 'https://x.com/gondixyz' },
        { icon: 'discord', label: 'Discord', href: 'https://discord.gg/gondi' },
        { icon: 'github', label: 'GitHub', href: 'https://github.com/gondixyz' },
      ],
      customCss: ['./src/styles/custom.css'],
      components: {
        ThemeSelect: './src/components/ThemeToggle.astro',
      },
      head: [
        { tag: 'meta', attrs: { property: 'og:image', content: `${SITE}/og.png` } },
        { tag: 'meta', attrs: { name: 'twitter:card', content: 'summary_large_image' } },
        { tag: 'meta', attrs: { name: 'twitter:site', content: '@gondixyz' } },
      ],
      pagination: true,
      credits: false,
      sidebar: [
        {
          label: 'GONDI V3.1',
          items: [
            { label: 'Introducing GONDI', link: '/' },
            v3('buy-and-sell-on-gondi'),
            v3('off-market-listings'),
            v3('trades'),
            v3('loan-basics'),
            v3('loan-offers'),
            v3('refinancing'),
            v3('renegotiations'),
            v3('sell-and-repay'),
            v3('purchase-bundler'),
            v3('liquidations-buyouts-and-auctions'),
            v3('vaults-and-stash'),
            v3('protocol-contracts'),
            v3('erc-721c-whitelisting'),
            v3('protocol-fees'),
            v3('whitelisted-collections'),
            v3('security-and-audits'),
            v3('glossary'),
            v3('protocol-disclosures'),
          ],
        },
        {
          label: 'Guides',
          items: [
            {
              label: 'How to Make a Loan Offer',
              items: [
                { label: 'Overview', slug: 'learn/how-to-make-a-loan-offer' },
                'learn/how-to-make-a-loan-offer/standard-loan-offers',
                'learn/how-to-make-a-loan-offer/collection-loan-offers',
              ],
            },
            {
              label: 'How to Refinance a Loan',
              items: [
                { label: 'Overview', slug: 'learn/how-to-refinance-a-loan' },
                'learn/how-to-refinance-a-loan/full-loan-refinancing',
                'learn/how-to-refinance-a-loan/partial-tranche-refinancing',
                'learn/how-to-refinance-a-loan/trim-the-top-refinancing',
              ],
            },
            'learn/how-to-renegotiate-a-loan',
            'faq',
          ],
        },
        {
          label: 'Connect',
          items: ['connect/official-links'],
        },
        {
          label: 'Previous Versions',
          items: [
            {
              label: 'GONDI V2',
              collapsed: true,
              items: [
                { label: 'Overview', slug: 'gondi-v1-and-v2/gondi-v2' },
                v2('introducing-gondi-v2'),
                v2('loan-basics'),
                v2('loan-offers'),
                v2('refinancing'),
                v2('partial-tranche-refinancing'),
                v2('repayment'),
                v2('renegotiations'),
                v2('defaults-and-auctions'),
                v2('protocol-contracts'),
                v2('protocol-fees'),
                v2('faq-v2'),
              ],
            },
            {
              label: 'GONDI V1',
              collapsed: true,
              items: [
                { label: 'Overview', slug: 'gondi-v1-and-v2/gondi-v1' },
                v1('gondi-v1-loans'),
                v1('instant-and-partial-refinancing'),
                v1('repayments-and-renegotiations'),
                v1('defaults-and-liquidations'),
                v1('loan-examples'),
                v1('faq-v1'),
              ],
            },
          ],
        },
      ],
    }),
  ],
});
