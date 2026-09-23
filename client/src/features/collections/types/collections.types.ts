export interface CollectionGarment {
  title: string;
  sku: string;
  price: number;
  category: string;
}

export interface CollectionLook {
  id: string;
  lookNumber: string;
  title: string;
  season: string;
  imageUrl: string;
  notes: string;
  garments: CollectionGarment[];
}
