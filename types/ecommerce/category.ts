
// ProductCategory type Starts

import { OrderItem } from "../../database/schema/ecommerce/order_item.model";

export interface TProductCategoryFilters {
  offset: number;
  limit: number;
  search?: string;
  sorting?: typeof OrderItem;
  trashOnly?: string;
};

export interface TAddProductCategory {
  name: string;
  slug: string;
  description: string;
  active: boolean;
};

export interface TProductCategory extends TAddProductCategory {
  id: number;
  createdAt: Date;
  updatedAt: Date;
};
