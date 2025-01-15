import { BaseMeta } from "apps/common/models/Base";
import { FACTORY_GATE_STAUS } from "./FactoryGateMisc";

interface IFactoryGate extends BaseMeta {
    id: number;
    name: string;
    description: string;
    status: FACTORY_GATE_STAUS;
}

interface ICreateFactoryGate extends BaseMeta {
    name: string;
    description: string;
    status: FACTORY_GATE_STAUS
}


export { IFactoryGate, ICreateFactoryGate };