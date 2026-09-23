export type OrderStatus = 'IN TRANSIT' | 'DELIVERED' | 'ALLOCATED' | 'PROCESSING';

export interface ProfileOrderItem {
  title: string;
  sku: string;
  size: string;
  quantity: number;
  price: number;
}

export interface ProfileOrderRecord {
  id: string;
  date: string;
  status: OrderStatus;
  total: number;
  carrier: string;
  tracking: string;
  items: ProfileOrderItem[];
}

export interface UserProfileData {
  id: string;
  callsign: string;
  email: string;
  phone: string;
  clearanceLevel: string;
  terminalBase: string;
  loyaltyUnits: number;
}
