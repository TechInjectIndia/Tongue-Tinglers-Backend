import { NextFunction, Response } from "express";
import { TAddLead } from '../../../../types'

interface IController<T> {
    create(payload: TAddLead): Promise<T>;
    getLeadByAttr(whereName: any, whereVal: any): Promise<T>;
}

export default IController;
