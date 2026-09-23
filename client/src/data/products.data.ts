import { Product } from '../types/catalog.types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-001',
    sku: 'SKU // 091-HD',
    title: 'HEAVYWEIGHT BOXY HOODIE',
    category: 'Hoodies',
    price: 180,
    colorName: 'WASHED BLACK',
    fit: 'Boxy / Oversized',
    availableSizes: ['S', 'M', 'L', 'XL'],
    primaryImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAL7s390OaoZtmYWM-K-RLaij7W2tb768JKrRbcS-2C9d55ADLnvK6vSI56KKfIigikyrc-M1X8jtfLuPIG7XwOrzz8bjwBbnuAijbmu-GexF8icRN0dLO9eJ2KZwlqBc_-kpWPnveRw3hfWAup1A02z-UeO_-5t9oS2dfaOakrSrKpXXmKllE3Jj1cMTPG_A5dSYNgwqIiT6xKcusFsgYfl09Pn-HI6osJ_09F7s2Xs_fzefyIjh_C',
    secondaryImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAnbEjhI00WGzL1eY8F8VZHvyeSrXBzEI0twR1WLN1Ct9CwKYAl3BRLDlt-iznHv1vtALnQPEYjVvEDtjEm6cgcIueIbLIBPYL98LK2VhCMohNSQrHefNJGGGKqCfW62F-tDnRYYbwvT-rs1TM6TGDkqprgXE29QVx2e4ODiYXl95bnPGBGMJt5rScKOFvj4Vyfr5a-E-iPR2DpOP9HiJtO-T6sbhrmdQIptv-TzEsCbJRMrbL1CXEI',
    alt: 'High contrast editorial streetwear lookbook shot of a heavy boxy jet-black hoodie',
    badge: { type: 'NEW', label: 'NEW' }
  },
  {
    id: 'prod-002',
    sku: 'SKU // 014-TS',
    title: 'RAW EDGE OVERSIZED TEE',
    category: 'T-Shirts',
    price: 85,
    originalPrice: 110,
    colorName: 'VINTAGE CHALK',
    fit: 'Boxy / Oversized',
    availableSizes: ['S', 'M', 'L', 'XL'],
    primaryImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAzIQHI8dXV4VXBd7LMs0qT4T9skUPKAWGM5-9LteDRRPAGUzH9O1md5veSJ0SuDEuh88fzP0Zz1T5mqCwxpEYQ0P2NZLFcysyLPUV0UQFYMz_sArZsjVHstDd2QpgcpgnzEOt9meVNcg5AVX3dOyaODhbHa03NsjoZW7R3pdMgkX1JU-j9iNVt55jg7PuqBks0lixo9Vcvvw8WrhcmFxX390PmoyaYWY8LaS8StdN7THDK8Xfb3-WG',
    secondaryImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBcKfRKtXVPq4_n7RLuCbMKuLN-NHyn2gyQyMcz4PFX3rYLq0QznN-utqxNN_oYkX2lfxLYbQUjeQlcRWIxEnI20y3EP0KlwKgSCvHm3fRzZFhscjRHI3qlP7NU_mNNoTcZZ0L0xx8ogU6yIXqBYW2V-lMi5O-bxgMqshVliCdqWCyPm5p5vKZnDPmfdqpICL6AYaziRBkjeTFTcg9pXFjFhxqgFfn933MOpmgEQ7b09aSr7WOHh4Ur',
    alt: 'Chalk white raw edge oversized graphic t-shirt on a statuesque model',
    badge: { type: 'SALE', label: 'SALE -25%' }
  },
  {
    id: 'prod-003',
    sku: 'SKU // 442-PT',
    title: 'TACTICAL CARGO TROUSERS',
    category: 'Bottoms',
    price: 220,
    colorName: 'OLIVE DRAB',
    fit: 'Standard Utilitarian',
    availableSizes: ['S', 'M', 'L', 'XL'],
    primaryImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB3kSE8gWeldVIQvPRfKMGBj2Zta1fl0G4oedymFPNA0GkRc7TYkJGeCQb80ifeIfhDgBhXJ1yfB0T1vPRf8QZK9ZQOV3NPMihnza54pXui4f0S6vIkNlX3VpEEgjhWqo7aVSQ9TEAfnL2oFgrllJRrp1kxczC4a4NomxoX1_ux6dDTcskwfCl2mK8ZyF1lEJtE-nii58egbpFY721bvUi_jCOLWX2b4unxDNjYKf42ByWoU04v8m3p',
    secondaryImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD62y6y3eflv7jKvl-aOycQEA3_StbUqz1CVburdYKSmbPEy0MdMemI9L0o0o_IIzyvMv7ud2njqoY7l2cy5FdBwmP0kpJRDFHx9iXV8lmL0vZPOfj2BBZAaWriT0PH6GvrNVCOK7lycZoEjTVXfWCxIIc2fb9vgQoVrNLOrU3TauZ3pa2xNASx6ZfzXhZSOKClzQS4WTCuxvjNxP0AWFqE5l51OsV1Ku_o0--CUK-F5YE_BkYkDT-J',
    alt: 'Olive drab heavy tactical cargo trousers with strap webbing',
    badge: { type: 'NEW', label: 'NEW' }
  },
  {
    id: 'prod-004',
    sku: 'SKU // 088-CR',
    title: 'ACID WASH CREWNECK',
    category: 'Hoodies',
    price: 160,
    colorName: 'HEATHER GREY',
    fit: 'Boxy / Oversized',
    availableSizes: ['S', 'M', 'L', 'XL'],
    primaryImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAFxCtszjQrSs6nYfuSHF98JHiQQF74cZrKCg0GubmDDu7ndBfPuXoboh3LCeaYCQHLXM03369vJlP3YTB5mgmMY18Pti_ryvpwjdEQH39_bLGJX_pST2s80HbXg88myOtODWLZyvGTjB3qYqiW6AbXqqyA9YhboPU9UIeOz7ZIo8kNdiYdkluzrzpNjMwfj1MgAgjbflSP9UqTzVcESOfAyRDbd3iwI5Y1ZSlM8udV0POuFdilU4or',
    secondaryImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCFRH_b1KZIE2uknG5ngA_kezY4t8j5yv8iAgZbM3Bo-q7xNwgUAdqKwCr3PXqibFhBcKACs_KNJIKwbrI7fRgS9ufCqLf3qEGgcIoLMb2FIx4Q5saJB1x6cSIEr87bi2-y91oN5Bmbie4kACE2QUE1uJLFHV8PW4z6U0W4sDpHwDCo6we-u71OtdmUzSZQxs-MrVLYeogla-yX05zBejQkvwnXnUBiClpl9SYSt8NU6M7jrmdfQJMG',
    alt: 'Distressed acid wash heather grey crewneck sweatshirt'
  },
  {
    id: 'prod-005',
    sku: 'SKU // 903-JK',
    title: 'MONOLITH BOMBER JACKET',
    category: 'Outerwear',
    price: 320,
    colorName: 'OBSIDIAN BLACK',
    fit: 'Boxy / Oversized',
    availableSizes: ['S', 'M', 'L', 'XL'],
    primaryImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDJJ0hDhn0_Goh-a0P0FwEQNh6awgGFj0uECIopghxt7fDJYF7oewXBYJ3cgOTHDnUSlhWsKt6GOPGTlm9jxMDPmC7IfmTWw-pbpY-JfYRgS0VMopy7wDaVf-lXPz8cxWYiASRAYEwcvJCHi3jr3OjoanUdTjHNLVeNahRnoMGKL6u4vLOK3r0-deJEpcw6fL-bxDhUrAyLM3f23kQ-I9anTCkThEMzg5KZyPmvGZQ3XDl7NcOlYTrh',
    secondaryImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC4oqV-eiGcvIHsUbfM_mO4HFGUdRjHIE53M_zg01roSpCEGp65f5REIy-sNTADgtwHHrDXXZfj_kkv3-Rpn98Iw_NWkCQbJhaOL7BtULI4QbCBLGV3WdlTzTrkjW4sv2ORJK6geXAP4OTgbSpXC6qdfM25qIkoX-wykBc2so3GsGnvC1Nv2sgyd3RFd9LCuVJm_4-GlvD0OKyGfnfM9SDeKMoZKV-OebYa_xbkUJJo8VKN8ChlHovu',
    alt: 'Monolithic obsidian black flight bomber jacket with metallic industrial dual-zippers',
    badge: { type: 'LIMITED', label: 'LIMITED' }
  },
  {
    id: 'prod-006',
    sku: 'SKU // 311-PT',
    title: 'WIDE LEG DOUBLE KNEE',
    category: 'Bottoms',
    price: 195,
    colorName: 'WASHED GRAPHITE',
    fit: 'Standard Utilitarian',
    availableSizes: ['S', 'M', 'L', 'XL'],
    primaryImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCBBcKAdq-SsBFjSzFmnNXiLPJsr-KbiadwVQsRiB7jH36xfV1nj0cpnS7-rY8Yji78YFRZeJUdFPZihg0tRAEfbP7ETnY9NVWj_9M31f86jqQbzQKWP5vyHzxAYDiwjABKyGWqXcEvFrczCNGKWeV0Z8NlEmoND-o0goQaMPq6Hqh5CL6-WB30rZMU9f4fvh0haPss636To0a_Ou5L0Di5TAhp9UV9vrNYazJJsZM7wpW9K5I09yDV',
    secondaryImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBdM0llkFaICLzGRiMd93w4me6do_5m97cCgdhwWwMBZGMBedihB7uEPzwnX4eGyqOt1LXFlhoaoOP_1DZLwpGlOG8twYYnC7uRA0mVvFYzDyLOzUYEikvTeBU7jP6WaCOHdTMSsJbGpaG040By6YLf1F6cVTAv4Ukh6tVzrT2YiKj-4tGfbrvh0-MJmFNwy5s4hoIjPsGLNhY307l7EJAO_e7YKpJX8C9is0qxw9O6BiGN_kt-d4C2',
    alt: 'Wide leg double knee carpenter pants in washed graphite heavy cotton canvas'
  },
  {
    id: 'prod-007',
    sku: 'SKU // 128-LS',
    title: 'THERMAL WAFFLE LS',
    category: 'T-Shirts',
    price: 95,
    colorName: 'OFF-WHITE',
    fit: 'Slim Architectural',
    availableSizes: ['S', 'M', 'L', 'XL'],
    primaryImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDDpQUA085DkxyKQxwJeiGWGDbxcgdrTYvtXvuRpe0JKFVP03vGFZcdFMa717SKwLlLYD3tDirx3QxPJXl8VnotmRuEw8qdNi3RZxvxdlSNPfbxOEnX7Ceapn1EWNqP65RDkwX4nSpomWG4hhm6JnYKKTm3jlrOukwk_JPMI4qgKN6oR3FUqZcqLd41JOJcZIA5sXKAzndJ03dzsFENjtDrK-n0JXvlRFlZo1o1czquFxcJ8t8WDVPH',
    secondaryImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDaGNKsVkcKAptmul24iz3MYj7ti7gkQ4QA5niAIagS5PjuwTTLsSztGkWuGp9vxuuSn6XebFDD3vZTLI2zT1mlZLN2dipGoYv-PS1avqoYO-2JOKOjKfV7f-MuL1m71H691NXhSw6jWFaUsps5OdIqzNN1tw4eDL8bKp4sdbhKYHEpfAtykUSKwvuXuMOABFZuTiJd2AIqqoO5pr_tPAZX1ecLGEYOi0lYIQuPbchZEJZ1hEwfSRuA',
    alt: 'Off-white heavy waffle knit thermal long sleeve top'
  },
  {
    id: 'prod-008',
    sku: 'SKU // 002-AC',
    title: 'HEAVY CANVAS TOTE BAG',
    category: 'Accessories',
    price: 65,
    colorName: 'PURE BLACK',
    fit: 'Standard Utilitarian',
    availableSizes: ['OS'],
    primaryImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB6vqa_v2hjcrbbv70TA8rngJA6E77X5WNDwzeuNOu_sLsQEFOpPhqNVn3DmGN6q24fo987vFJK2UrRuy0QU-ooeR0PWaLt_xSJ5kP-kQ9w05qA3ALPHf-9JkoPRuBvhY33DPiIRddYm1YbkqlE0eATgf6ZZuLD12ww5KLC5tjr2exMYXry5_xYoTdrPNSfkc2yFY_Det_xodIWMYaOQDg8l6TLUQZ19TEQlmsIXoilzkALLVZDZGWQ',
    secondaryImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCyal1NkXdmoe99H3FqCpK7KvWAQFa59bjGa3FdEKDuTRc7x1YvqKwjO5ctEpOs1HddPg-uE3R2z0oX2Zu3tFAeAfghJxVLjGlxZUJPK54aG0vsr2Nz1j6fwYkG_EMFwcJhEHLgm5ProQcNmw-9QFLX6SLX0tiN5yG7zvzda48Eu_iKqwXYIz9PtKJph_4HRmxiCuHmv7jjvUvz5dkCOcmS2S9OD6EF23wNbFo6Ad0zlM3LqNxs5WF8',
    alt: 'Heavyweight industrial 24oz duck canvas tote bag in pitch black'
  }
];

export const CATEGORIES_LIST = [
  { name: 'Hoodies', count: 42 },
  { name: 'T-Shirts', count: 56 },
  { name: 'Bottoms', count: 24 },
  { name: 'Outerwear', count: 12 },
  { name: 'Accessories', count: 8 }
];

export const SIZES_LIST = ['S', 'M', 'L', 'XL', 'XXL', 'OS'];

export const COLORS_LIST = [
  { name: 'Black', hex: '#0e0e0e' },
  { name: 'White', hex: '#ffffff' },
  { name: 'Heather Grey', hex: '#71717a' },
  { name: 'Olive Drab', hex: '#454738' },
  { name: 'Navy / Obsidian', hex: '#1c2430' }
];

export const FITS_LIST = [
  'Boxy / Oversized',
  'Slim Architectural',
  'Standard Utilitarian',
  'Cropped Mod'
];
