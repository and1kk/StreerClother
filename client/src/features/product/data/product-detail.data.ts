import { ProductDetailData } from '../types/product-detail.types';

export const HOODIE_PRODUCT_DATA: ProductDetailData = {
  id: 'prod-001',
  sku: '091-HD',
  title: 'HEAVYWEIGHT BOXY HOODIE',
  category: 'HOODIES',
  price: 180,
  currency: 'USD',
  badges: ['NEW DISPATCH // ARCHIVE FW25', 'HEAVY-SPEC'],
  edition: 'FW25-BATCH.04',
  specVerification: 'ACTIVE',
  lowInventoryText: 'LOW INVENTORY // 3 UNITS REMAINING',
  description:
    'Architectural volume garment engineered from bespoke 450 GSM diagonal-loop French terry. Designed with drastic drop-shoulders, wide chest dimensions, clean drawstring-less structured hood, and tightened cropped rib hem.',
  slides: [
    {
      id: 'slide-01',
      frameNumber: '01',
      title: 'FRONT ELEVATION',
      imageUrl:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuB1Ay2rj0m4mI-SgXIrdZ_nTbZNfdyOGSGKGTwN7172yhL6sNiWp6js9kmaeYjH6nCDhGz6A4tyE3otv6KltzbNU_ZXQft0KMeZA76uSUHkfARoHqSTsSRUTqw3qe_3PI8DaQhqh9C89MH437mhWjkppWm5TmLFcM3EXQBtUQZEffa2o1Y-Ocr049MZyjpwjVirsjeD8oEzRDLqovfbkrziLWo-dYZ0_YlXwoQK856ecUmpl8O_Eo3T',
      alt: 'Editorial brutalist streetwear lookbook photo of a tall male model standing in an architectural concrete space, wearing an oversized heavyweight boxy hoodie in washed vintage black.'
    },
    {
      id: 'slide-02',
      frameNumber: '02',
      title: '450 GSM TERRY COMPACT',
      imageUrl:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBK7rzxsoVNn9-EaW6jVv8r6Tn5lcAmGaupreB6D_00_r_e-qifBP8G7o5_A9V1XaHrovRRPCLdHG1SGMZfAmB3nOPLDJVn88q2kPwygAKLriTkrSZKUWR9O9iF4LVfHDHlqZK70U_llnLgaV0tzBNQu0HtxOOVCsGfDZhPWOy504ZlDn-HjNSYpGL86JBljtx3wFfzRIQVJndhAKAtQ8PltSNmuYHVyw_FsYR3bo2J6EaWREx93J1U',
      alt: 'Extreme macro extreme close-up of 450 GSM French terry heavyweight washed black cotton fabric.'
    },
    {
      id: 'slide-03',
      frameNumber: '03',
      title: 'POSTERIOR GEOMETRY',
      imageUrl:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBjxkvYow4hGINpuh4uyYFh9OpPfnuL13tpaiFbK0pstcdBbhpo7qFCetbp6BOlATI2QLLOc8015c3ZYO8kvUBpsdYXKftWZwTUK7ZV3Srv19Mryu5ypC0SAUu63DBboUd3RJPzleLQoJqEca7sjcVnWmyV0eccO0Q0lSHhljihVeWIHXe_SvDHsrx20lzu5E9q1VFwSCiiiIhQZwdyLwg11qI__B7ZF9emPK9GYEqCCEoAKBhHHbnI',
      alt: 'Rear studio photograph of oversized boxy hoodie showing extreme dropped shoulder yoke and wide horizontal torso drape.'
    },
    {
      id: 'slide-04',
      frameNumber: '04',
      title: 'RUNTIME URBAN DISPLACEMENT',
      imageUrl:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuAr6PfIjc6ECFR8gePlDbVutrEnSvTborgBr-euChIEtMamc_1kmdnAKLeaUr7LfYOrydz3xUWv5mVoJpyxdcyYmeC_qW2uZrnXLYFu57wgPOKil3O7edT51vklAEtSAD5_S1MJ97DaIyvmIXzhyf8UtshZ3_XgaKfHZ1jO8tQcAcfZ0DuJIPTWPkthkTmuQ4HWNlUT9a9-isR1Ri34xeV9Mlxj9tMMzWUn9dHYt_WUNpnqgHkVTeOS',
      alt: 'Low-angle editorial street style photograph of a model in motion wearing the heavy boxy hoodie paired with utilitarian cargo pants.'
    }
  ],
  colorways: [
    {
      id: 'color-01',
      name: 'WASHED BLACK',
      code: '01-WB',
      hex: '#1a1a1a',
      innerHex: '#1b1b1b'
    },
    {
      id: 'color-02',
      name: 'CHALK WHITE',
      code: '02-CW',
      hex: '#e2e2e2',
      innerHex: '#f2f2f2'
    },
    {
      id: 'color-03',
      name: 'HEATHER GREY',
      code: '03-HG',
      hex: '#636565',
      innerHex: '#757778'
    },
    {
      id: 'color-04',
      name: 'OLIVE DRAB',
      code: '04-OD',
      hex: '#343a2f',
      innerHex: '#3d4536'
    }
  ],
  sizes: [
    { id: 'size-s', label: 'S', inStock: true },
    { id: 'size-m', label: 'M', inStock: true },
    { id: 'size-l', label: 'L', inStock: true, isRecommended: true },
    { id: 'size-xl', label: 'XL', inStock: true },
    { id: 'size-xxl', label: 'XXL', inStock: false }
  ],
  modelNote: 'MODEL: 188 CM / 6\'2" WEARING SIZE L // BOXY OVERSIZED FIT',
  compatibleProducts: [
    {
      id: 'comp-01',
      sku: '044-TR',
      title: 'TACTICAL CARGO TROUSERS',
      categorySpec: 'BOTTOM SPEC // NYLON',
      price: 220,
      badgeText: 'WATERPROOF',
      imageUrl:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCrBMv8XoojhRCv5EO193GG68XLyZC03hiNzm0unW2OTKJ-xc41jLf6Lx7Jjrpws2eB5vKH7MLpyE8m5idBaGhZ8tPtxR0PdX0DpB7Q6r4UsiuHwdYnGU02Dkmt7JmBxSawMIYlEpZ9xeTDVnXVX7lYaK7IVDZ6LQWZBL8T4HOICuldLWHCD3VgDmH_UjsuCnaa9cm3eJhr9pbkyuaOKTdU1PfNV286fyR8l2paovRT-YZAjM66kqFG',
      alt: 'Dark brutalist tactical cargo trousers with accordion utility pockets'
    },
    {
      id: 'comp-02',
      sku: '019-TE',
      title: 'RAW EDGE OVERSIZED TEE',
      categorySpec: 'BASE LAYER // COTTON',
      price: 85,
      badgeText: '300 GSM',
      imageUrl:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuD9E3Z7HuvUM0tHbhGaMLzkBPF3cUmvy1hx6BjJkTSgOQPFGLEto9_rMLElGkhDW3QieuiIuALULHtcuJvMwjpTKCo9GB86nN-KUWREAG2_yK7o4bBpuUOlfigscYVv7_9fwgElKy-y4JhCrmWNbqX92WS9lKq4W4RmroHc6Qehi1HFc2sq1zEuug8pHRf5M0pqcAqG-lCAJEFoLr3ZyvGUyDsSV2GOtN251AivXTseghfQx0-t25Fw',
      alt: 'Raw edge oversized washed black heavyweight boxy t-shirt'
    },
    {
      id: 'comp-03',
      sku: '088-JK',
      title: 'MONOLITH BOMBER JACKET',
      categorySpec: 'OUTER ARMOR // TWILL',
      price: 320,
      badgeText: 'LIMITED',
      imageUrl:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBUx9C7Q2k6rG-gZhd6-vY0FsCM3FR6yP3dszMLRLBaZg1qJJr8O5kMJRYbfYYqwYT1AnAMdXPHiZYmRZUndqsrD46nEb5dH-bic6B3X09BE5xuGFnwbhvCGGFPUmKuqMR87V0FwVXzjH3nR_KhB8JX0sOp29jhQX05LfbJdE1XsEv98Vmno-z3z4WX-Uj5EqQuH-oBODdak4d71zKd5ge0j8Kat23AvUILf_ndZPnFhC6_fYyIDLj9',
      alt: 'High-concept brutalist oversized bomber jacket in matte tactical black'
    },
    {
      id: 'comp-04',
      sku: '012-AC',
      title: 'HEAVY CANVAS TOTE BAG',
      categorySpec: 'CARRY SPEC // 18 OZ CANVAS',
      price: 65,
      badgeText: 'UTILITY',
      imageUrl:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCQMJqVt0cTOUc2qrGCMUyeRzIVVZQgmQafeolPzssjCc9D6fME3P3doHPzOMJ0fecviQMkDLaam4j7p-_7ZUT7rQmnkpKMm3x1Wl60_GnYg6YX9ehAY7m2zkSWOWvSI1UJ8XHrRt8JjQpNDqGNxxlx-DbHxzJ7BI_LxlGMopBttogqvI_mXw323DqCGkb7TFRnnVmE-uK0c3HhmOxozJ_55JSJ3MEym_hG9R2U7Q15Rq5sqLTMHahq',
      alt: 'Heavy industrial duck canvas tote bag in washed black'
    }
  ],
  sizeGuide: [
    { size: 'S', chest: '64 CM', length: '66 CM', shoulder: '62 CM' },
    { size: 'M', chest: '67 CM', length: '68 CM', shoulder: '65 CM' },
    {
      size: 'L (RECOMMENDED)',
      chest: '70 CM',
      length: '70 CM',
      shoulder: '68 CM',
      isRecommended: true
    },
    { size: 'XL', chest: '73 CM', length: '72 CM', shoulder: '71 CM' }
  ]
};
