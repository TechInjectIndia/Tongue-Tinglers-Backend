import { OrderItemsModel } from "../models/OrderItemsTable";
import { BaseOrderItem, OrderItem, OrderItemPayload, ParsedOrderItem, UpdateCouponDiscount, UpdatePointsDiscount, UpdateQuantity, UpdateStudentDiscount } from "../interface/orderItem";
import { IOrderItemRepo } from "./IOrderItemRepo";
import { Transaction } from "sequelize";
import { ProductModel } from "apps/product/model/productTable";
import { ProductVariationsModel } from "apps/product-options/models/ProductVariationTable";
import { UserModel } from "apps/user/models/UserTable";
import { parseOrderItem } from "../parser/parseOrderItem";
import { DTO, getHandledErrorDTO, getSuccessDTO } from "apps/common/models/DTO";

export class OrderItemRepo implements IOrderItemRepo {
  async createOrderItem(orderItem: OrderItemPayload, transaction?: Transaction): Promise<DTO<ParsedOrderItem>> {
    try {
      const options: any = {
        returning: true
      };
      if (transaction) {
        options.transaction = transaction;
      }
      const orderItemCreated = await OrderItemsModel.create(orderItem, options);
      if (orderItemCreated) {
        return await this.getOrderItemsById(orderItemCreated.id, transaction);
      } else {
        return getHandledErrorDTO("Error while creating order item");
      }
    } catch (error) {
      console.log(error);
      return getHandledErrorDTO(error.message, error);
    }
  }

  async createBulkOrderItem(orderItem: OrderItemPayload[], transaction?: Transaction): Promise<DTO<ParsedOrderItem[]>> {
    try {
      const options: any = {
        returning: true
      };
      if (transaction) {
        options.transaction = transaction
      }
      const orderItemsCreated = await OrderItemsModel.bulkCreate(orderItem, options);
      if (!orderItemsCreated || orderItemsCreated.length === 0) {
        return getHandledErrorDTO("Error while creating order items: No items created.");
      }

      // Retrieve and unwrap created order items
      const orderItems = await Promise.all(
        orderItemsCreated.map(async (orderItem) => {
          const result = await this.getOrderItemsById(orderItem.id, transaction);
          if (result.success) {
            return result.data;
          }
          throw new Error(result.message || "Failed to retrieve order item details.");
        })
      );

      return getSuccessDTO(orderItems);
    } catch (error) {
      console.log(error);
      return getHandledErrorDTO(error.message, error);
    }
  }

  async getOrderItemsById(id: number, transaction?: Transaction): Promise<DTO<ParsedOrderItem>> {
    try {
      const orderItemData = await OrderItemsModel.findOne({
        where: {
          id
        },
        include: [
          {
            model: ProductModel,
            as: 'productData',
          },
          {
            model: ProductVariationsModel,
            as: 'variationData',
          },
          {
            model: UserModel,
            as: 'createdByUser'
          },
          {
            model: UserModel,
            as: 'updatedByUser'
          },
          {
            model: UserModel,
            as: 'deletedByUser'
          }
        ]
      })
      return orderItemData ? getSuccessDTO(parseOrderItem(orderItemData.toJSON())) : getHandledErrorDTO("Not Found")
    } catch (error) {
      console.log(error);
      return getHandledErrorDTO(error.message, error)
    }
  }

  async updateOrderItem(id: number, orderItem: OrderItemPayload, transaction?: Transaction): Promise<DTO<ParsedOrderItem>> {
    try {
      const options: any = {
        returning: true
      };
      if (transaction) {
        options.transaction = transaction;
      }
      let orderItemData = await OrderItemsModel.findByPk(id, { transaction });
      if (!orderItemData) {
        return getHandledErrorDTO("Order Item not found");
      }
      orderItemData.set(orderItem);
      await orderItemData.save(options);
      return await this.getOrderItemsById(id, transaction);
    } catch (error) {
      console.log(error);
      return getHandledErrorDTO(error.message, error)
    }
  }

  async deleteOrderItem(id: number, transaction?: Transaction): Promise<DTO<ParsedOrderItem>> {
    try {
      const options: any = {
        returning: true
      };
      if (transaction) {
        options.transaction = transaction;
      }
      const orderItem = await OrderItemsModel.findByPk(id, options);
      if (!orderItem) {
        return getHandledErrorDTO(`Order item with ID ${id} not found.`);
      }
      const parsedOrderItemData = await this.getOrderItemsById(id, transaction)
      await orderItem.destroy(options);
      return getSuccessDTO(parsedOrderItemData.data);
    } catch (error) {
      console.log(error);
      return getHandledErrorDTO(error.message, error)
    }
  }

  async updateQuantity(quantity: UpdateQuantity, transaction?: Transaction): Promise<DTO<ParsedOrderItem>> {
    try{
      const options: any = {
        returning: true
      };
      if (transaction) {
        options.transaction = transaction;
      }
      const orderItem = await OrderItemsModel.findByPk(quantity.id, options);
      if (!orderItem) {
        return getHandledErrorDTO(`Order item with ID ${quantity.id} not found.`);
      }
      orderItem.quantity = quantity.quantity;
      await orderItem.save(options);

      const parsedOrderItemData = await this.getOrderItemsById(orderItem.id, transaction)
      return getSuccessDTO(parsedOrderItemData.data);
    }catch(error){
      console.log(error);
      return getHandledErrorDTO(error.message, error)
    }
  }

  async updateCouponDiscount(coupon_discount: UpdateCouponDiscount, transaction?: Transaction): Promise<DTO<ParsedOrderItem>> {
    try{
      const options: any = {
        returning: true
      };
      if (transaction) {
        options.transaction = transaction;
      }
      const orderItem = await OrderItemsModel.findByPk(coupon_discount.id, options);
      if (!orderItem) {
        return getHandledErrorDTO(`Order item with ID ${coupon_discount.id} not found.`);
      }
      orderItem.couponDiscount = coupon_discount.coupon_discount;
      await orderItem.save(options);

      const parsedOrderItemData = await this.getOrderItemsById(orderItem.id, transaction)
      return getSuccessDTO(parsedOrderItemData.data);
    }catch(error){
      console.log(error);
      return getHandledErrorDTO(error.message, error)
    }
  }

  updatePointsDiscount(points_discount: UpdatePointsDiscount, transaction?: Transaction): Promise<DTO<ParsedOrderItem>> {
    throw new Error("Method not implemented.");
  }
  
  updateStudentDiscount(student_discount: UpdateStudentDiscount, transaction?: Transaction): Promise<DTO<ParsedOrderItem>> {
    throw new Error("Method not implemented.");
  }

}