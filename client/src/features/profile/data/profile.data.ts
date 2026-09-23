import { UserProfileData, ProfileOrderRecord } from '../types/profile.types';

export const USER_PROFILE_MOCK: UserProfileData = {
  id: 'OPERATOR // 091-VO',
  callsign: 'ALEXANDER VOID',
  email: 'operator@void.enterprises',
  phone: '+380 98 000 00 00',
  clearanceLevel: 'LEVEL 02 ARCHIVE OPERATOR',
  terminalBase: 'TERMINAL KYIV / BASE 01',
  loyaltyUnits: 840
};

export const ORDER_RECORDS_MOCK: ProfileOrderRecord[] = [
  {
    id: 'ORD-VOID-99214',
    date: '2026-09-18',
    status: 'IN TRANSIT',
    total: 400,
    carrier: 'NOVA POSHTA EXPRESS',
    tracking: 'NP-2045091823901',
    items: [
      { title: 'HEAVYWEIGHT BOXY HOODIE', sku: '091-HD', size: 'L', quantity: 1, price: 180 },
      { title: 'TACTICAL CARGO TROUSERS', sku: '044-TR', size: 'M', quantity: 1, price: 220 }
    ]
  },
  {
    id: 'ORD-VOID-88319',
    date: '2026-08-04',
    status: 'DELIVERED',
    total: 85,
    carrier: 'NOVA POSHTA EXPRESS',
    tracking: 'NP-2045080482910',
    items: [
      { title: 'RAW EDGE OVERSIZED TEE', sku: '019-TE', size: 'L', quantity: 1, price: 85 }
    ]
  },
  {
    id: 'ORD-VOID-77402',
    date: '2026-06-12',
    status: 'DELIVERED',
    total: 320,
    carrier: 'DHL EXPRESS GLOBAL',
    tracking: 'DHL-889312019',
    items: [
      { title: 'MONOLITH BOMBER JACKET', sku: '088-JK', size: 'L', quantity: 1, price: 320 }
    ]
  }
];
