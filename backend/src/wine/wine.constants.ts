export const WEIN_CC_API_URL = 'https://api.wein.cc/v1.0/search/serp';

export const WEIN_CC_WINE_URL = (country, productId, merchantId) => `https://www.wein.cc/en-${country}/clickcounter.php?produktid=${productId}&merchantid=${merchantId}`;

export const WEIN_CC_WINE_IMG_URL = (id) => `https://cdn.wein.cc/p/${id}.jpg`;
