import { QueryInterface } from 'sequelize';

export const up = async (queryInterface: QueryInterface) => {
  await queryInterface.bulkInsert('products', [
    {
      name: 'Product 1',
      slug: 'product-1',
      description: 'Description for Product 1',
      price: '19.99',
      stock: '100',
      type: 'Type A',
      total_ratings: 10,
      ratings: 4.5,
      discount: '10%',
      sold: '20',
      active: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Product 2',
      slug: 'product-2',
      description: 'Description for Product 2',
      price: '29.99',
      stock: '50',
      type: 'Type B',
      total_ratings: 5,
      ratings: 4.0,
      discount: '15%',
      sold: '15',
      active: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    // Add more products as needed
  ]);
};

export const down = async (queryInterface: QueryInterface) => {
  await queryInterface.bulkDelete('products', {}, {});
};
