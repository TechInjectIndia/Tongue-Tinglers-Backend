import { NextFunction, Response } from "express";
import { TLeadPayload } from '../../../../types'

interface IController<T> {
    create(payload: TLeadPayload): Promise<T>;
    getLeadByAttr(whereName: any, whereVal: any): Promise<T>;
}

export default IController;
