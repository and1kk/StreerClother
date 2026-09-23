export type CarrierType = 'NOVA_POSHTA' | 'DHL_EXPRESS';
export type PaymentMethod = 'CARD' | 'APPLE_PAY' | 'CRYPTO_USDT' | 'CASH_ON_DELIVERY';

export interface CheckoutFormData {
  fullName: string;
  email: string;
  phone: string;
  city: string;
  carrier: CarrierType;
  branchOrAddress: string;
  paymentMethod: PaymentMethod;
  notes?: string;
}

export interface OrderConfirmationData {
  orderId: string;
  timestamp: string;
  carrier: CarrierType;
  trackingNumber: string;
  totalAmount: number;
  itemsCount: number;
}
