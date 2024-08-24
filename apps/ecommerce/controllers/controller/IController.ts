import { NextFunction } from "express";

/**
 * IController interface defines a set of common methods that should be implemented
 * by all controllers in the application. These methods handle the basic CRUD
 * operations for a resource.
 *
 * When creating a new controller, you should define an interface specific to that
 * controller and extend it with the IController interface to inherit these common
 * methods. This allows you to define the methods once and reuse them across multiple
 * controllers.
 * This also allows you to define custom methods specific to a controller
 * if needed in their specific child interfaces.
 */
interface IController {
    create(req: Request, res: Response, next: NextFunction): Promise<Response>;
    list(req: Request, res: Response, next: NextFunction): Promise<Response>;
    update(req: Request, res: Response, next: NextFunction): Promise<Response>;
    get(req: Request, res: Response, next: NextFunction): Promise<Response>;
    delete(req: Request, res: Response, next: NextFunction): Promise<Response>;
}

export default IController;
