export class Book {
    constructor(
        public _id: string,
        public title: string,
        public description: string,
        public authors: string,
        public favorite: string,
        public fileCover: string,
        public fileName: string
    ) {}
}
