import { OrderItemModel } from "../../../database/schema/order-items/orderItemsModel";
import { BaseOrderItem, OrderItem, UpdateCouponDiscount, UpdatePointsDiscount, UpdateQuantity, UpdateStudentDiscount } from "../../../interfaces/order_items";
import { IOrderItemRepo } from "./IOrderItemRepo";

export class OrderItemRepo implements IOrderItemRepo {

  async createOrderItem(orderItem: BaseOrderItem): Promise<OrderItem> {
    try {
      const orderItemCreated = await OrderItemModel.create(orderItem)
      return orderItemCreated.toJSON();
    } catch (error) {
      console.log(error);
      return null;  
    }
  }

  async createBulkOrderItem(orderItems: BaseOrderItem[]): Promise<OrderItem[]> {
    try {
      const orderItemsCreated = await OrderItemModel.bulkCreate(orderItems)
      return orderItemsCreated.map((orderItem) => orderItem.toJSON());
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  
  async getOrderItemsById(id: number): Promise<OrderItem> {
    try{
      const orderItem = await OrderItemModel.findByPk(id);
      if(!orderItem){
        throw new Error(`Order-Item with ID ${id} not found`);
      }
      return orderItem.toJSON();
    }catch(error){
      console.log(error);
      return null;
    }
  }

  async updateOrderItem(orderItem: OrderItem): Promise<OrderItem> {
    try {
      const existingOrderItem = await OrderItemModel.findByPk(orderItem.id);
      if(!existingOrderItem){
        throw new Error(`Order-Item with ID ${orderItem.id} not found`);
      }
      await existingOrderItem.update(orderItem);
      return existingOrderItem.toJSON();
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async deleteOrderItem(id: number): Promise<OrderItem> {
    try {
      const orderItem = await OrderItemModel.findByPk(id);
      if(!orderItem){
        throw new Error(`Order-Item with ID ${id} not found`);
      }
      await orderItem.destroy();
      return orderItem.toJSON();
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async updateQuantity(update_quantity: UpdateQuantity): Promise<OrderItem> {
    try {
      const {id, quantity} = update_quantity;
      const existingOrderItem = await OrderItemModel.findByPk(id);
      if(!existingOrderItem){
        throw new Error(`Order-Item with ID ${id} not found`);
      }
      await existingOrderItem.update({quantity});
      return existingOrderItem.toJSON();
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async updateCouponDiscount(update_coupon_discount: UpdateCouponDiscount): Promise<OrderItem> {
    try {
      const {id, coupon_discount} = update_coupon_discount;
      const existingOrderItem = await OrderItemModel.findByPk(id);
      if(!existingOrderItem){
        throw new Error(`Order-Item with ID ${id} not found`);
      }
      await existingOrderItem.update({coupon_discount});
      return existingOrderItem.toJSON();
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async updatePointsDiscount(update_points_discount: UpdatePointsDiscount): Promise<OrderItem> {
    try {
      const {id, points_discount} = update_points_discount;
      const existingOrderItem = await OrderItemModel.findByPk(id);
      if(!existingOrderItem){
        throw new Error(`Order-Item with ID ${id} not found`);
      }
      await existingOrderItem.update({points_discount});
      return existingOrderItem.toJSON();
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async updateStudentDiscount(update_student_discount: UpdateStudentDiscount): Promise<OrderItem> {
    try {
      const {id, student_discount} = update_student_discount;
      const existingOrderItem = await OrderItemModel.findByPk(id);
      if(!existingOrderItem){
        throw new Error(`Order-Item with ID ${id} not found`);
      }
      await existingOrderItem.update({student_discount});
      return existingOrderItem.toJSON();
    } catch (error) {
      
    }
  }

}