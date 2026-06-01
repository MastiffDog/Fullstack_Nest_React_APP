import axios, { AxiosResponse } from 'axios';
import { Product } from 'src/entities/product/productModel';
import { Params } from 'src/features/productList/types';

interface ApiResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export class ProductService {
  private static readonly API_URL = 'https://dummyjson.com';

  public static async getProducts(params: Params): Promise<{ data: Product[]; total: number }> {
    const response: AxiosResponse<ApiResponse> = await axios.get(
      `${this.API_URL}/products/search`,
      {
        params: {
          q: '', // Empty request to get all products
          ...params,
        },
      }
    );

    return {
      data: response.data.products,
      total: response.data.total,
    };
  }

  // Search for products by name
  public static async searchProducts(term: string, params: Params ): Promise<{ data: Product[]; total: number }> {
    const response: AxiosResponse<ApiResponse> = await axios.get(
      `${this.API_URL}/products/search`,
      {
        params: {
          q: term,
          ...params
        },
      }
    );

    return {
      data: response.data.products,
      total: response.data.total,
    };
  }
}