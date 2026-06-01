export interface Product {
  id: number;
  title: string;
  brand?: string;
  sku?: string;
  rating?: number;
  price: number;
  stock?: number;
}

export interface Work {
  id: number;
  work: string;
  dimension_type: string;
  dimension_value: number;
  executor: string;
  date: string;
}