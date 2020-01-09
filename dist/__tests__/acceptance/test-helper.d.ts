import { TzPocTRefMmsV4Application } from '../..';
import { Client } from '@loopback/testlab';
export declare function setupApplication(): Promise<AppWithClient>;
export interface AppWithClient {
    app: TzPocTRefMmsV4Application;
    client: Client;
}
