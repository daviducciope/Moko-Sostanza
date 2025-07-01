export interface IProduct {
  id: number;
  name: string;
  category: string;
  description?: string;
  quantity: number;
  unit: string;
  minQuantity: number;
  price: number;
  supplier?: string;
  location?: string;
  notes?: string;
  lastOrder?: string;
}
