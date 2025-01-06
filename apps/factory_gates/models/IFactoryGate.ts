import { BaseModelIdNumber, DeletionMetaData, UpdatedMetaData } from "interfaces";
import { FACTORY_GATE_STAUS } from "./FactoryGateMisc";

interface IFactoryGate extends BaseModelIdNumber, UpdatedMetaData, DeletionMetaData {
    id: number;
    name: string;
    description: string;
    status: FACTORY_GATE_STAUS;
}

interface ICreateFactoryGate {
    name: string;
    description: string;
}


interface IUpdateFactoryGate {
    name: string;
    description: string;
    status: FACTORY_GATE_STAUS
}


export { IFactoryGate, ICreateFactoryGate, IUpdateFactoryGate };