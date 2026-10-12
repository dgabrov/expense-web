import type {Servr} from "./servr.ts";

export class ServerMock implements Servr {
    version(): string {
        return "1.0";
    }

}