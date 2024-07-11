import { Document } from 'mongoose';

export interface IBook extends Document {
        title: string;
        description: string;
        authors?: string;
        favorite?: string;
        fileCover?: string;
        fileName?: string;
}
