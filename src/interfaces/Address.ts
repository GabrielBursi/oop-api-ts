import { Common } from './Common';

export interface Address extends Common {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
} 