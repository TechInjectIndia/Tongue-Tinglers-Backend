import IController from "./IController";
import { NextFunction } from "express";

/**
 * @class Controller
 * @abstract
 * @implements {IController}
 * @description
 * This is an abstract class that implements the `IController` interface. It provides a base implementation
 * for the common CRUD methods (`create`, `list`, `update`, `get`, and `delete`). However, these methods
 * are not implemented and throw an error when called. The purpose of this class is to serve as a base
 * for other controllers to extend and override these methods with their specific implementation.
 *
 * the sole purpose of using a Common controller is that we don't rewrite the same logics for all controllers.
 *
 * try to figure out more way with which we can implement such generic uses of OOPs
 */
abstract class Controller implements IController {
    list(req: Request, res: Response, next: NextFunction): Promise<Response> {
        throw new Error("Method not implemented.");
    }
    update(req: Request, res: Response, next: NextFunction): Promise<Response> {
        throw new Error("Method not implemented.");
    }
    get(req: Request, res: Response, next: NextFunction): Promise<Response> {
        throw new Error("Method not implemented.");
    }
    delete(req: Request, res: Response, next: NextFunction): Promise<Response> {
        throw new Error("Method not implemented.");
    }
    create(req: Request, res: Response, next: NextFunction): Promise<Response> {
        throw new Error("Method not implemented.");
    }
}

/**
 * @interface IProductController
 * @extends {IController}
 * @description
 * This interface extends the `IController` interface and adds a new method `getByCategoryId`.
 * This method is specific to the product controller and is not part of the common CRUD operations.
 */
interface IProductController extends IController {
    /**
     * @method get
     * @deprecated
     */
    get(req: Request, res: Response, next: NextFunction): Promise<Response>;

    getByCategoryId(req: Request, res: Response, next: NextFunction): Promise<Response>;
}

/**
 * @class ProductController
 * @extends {Controller}
 * @implements {IProductController}
 * @description
 * This class extends the `Controller` class and implements the `IProductController` interface.
 * It overrides the `create` method to perform any product-specific logic before calling the parent `create` method.
 * The `getByCategoryId` method is also defined, but it throws an error as it is not implemented.
 */
class ProductController extends Controller implements IProductController {
    /**
     * @method create
     * @override
     * @param {Request} req - The incoming HTTP request object.
     * @param {Response} res - The HTTP response object to send the response.
     * @param {NextFunction} next - The next middleware function in the request-response cycle.
     * @returns {Promise<Response>} A Promise that resolves with the HTTP response object.
     * @description
     * This method performs any product-specific logic before calling the parent `create` method.
     */
    create(req: Request, res: Response, next: NextFunction): Promise<Response> {
        // Perform any product-specific logic here

        // Call the parent create function
        return super.create(req, res, next);
    }

    /**
     * @method getByCategoryId
     * @param {Request} req - The incoming HTTP request object.
     * @param {Response} res - The HTTP response object to send the response.
     * @param {NextFunction} next - The next middleware function in the request-response cycle.
     * @returns {Promise<Response>} A Promise that resolves with the HTTP response object.
     * @throws {Error} Method not implemented.
     */
    getByCategoryId(req: Request, res: Response, next: NextFunction): Promise<Response> {
        throw new Error("Method not implemented.");
    }
}

// USAGE:

const controller: IProductController = new ProductController();

/**
 * @description
 * CASE 1:
 * An API uses the `create` function from the `ProductController`.
 * The `create` function will first perform the product controller overridden function
 * and then internally will call the parent `create` function from the `Controller` class.
 */
const res = controller.create();

/**
 * @description
 * CASE 2:
 * An API uses the `get` function from the `ProductController`.
 * This function is marked as deprecated and is overridden with the method not being implemented.
 * So, anyone using this function will get an error.
 * In this way, the usage of this function is restricted, and it cannot be used in cases
 * where the common `get` function is not supposed to exist.
 */
const getResult = controller.get();
