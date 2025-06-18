import { createDirectus, rest } from '@directus/sdk';

const directus = createDirectus('https://dataprojects.hongfoundation.org.tw').with(rest({
    onRequest: (options) => ({ ...options, cache: 'no-store' }),
}));

export default directus;
