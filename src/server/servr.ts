import {ServerMock} from "./server-mock.ts";

export interface Servr {
    version: () => string
}

export const getServr = () : Servr => {
    return new ServerMock();
}
