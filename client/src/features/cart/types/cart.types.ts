export interface CartItem {
  id: string;
  productId: string;
  sku: string;
  title: string;
  price: number;
  color: string;
  size: string;
  quantity: number;
  imageUrl: string;
}

export interface CartSummary {
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  freeShippingQualified: boolean;
  amountNeededForFreeShipping: number;
}
