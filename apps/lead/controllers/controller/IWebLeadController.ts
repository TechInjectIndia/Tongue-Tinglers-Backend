import { NextFunction, Response } from "express";
import { TAddLead } from '../../../../types'

interface IController<T> {
    create(payload: TAddLead): Promise<Response<T>>;
    getLeadByAttr(whereName: any, whereVal: any): Promise<Response<T>>;
}

export default IController;
