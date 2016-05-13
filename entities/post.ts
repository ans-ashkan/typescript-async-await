namespace Entities {
    export class Post {
        private _id: number;
        public get id(): number {
            return this._id;
        }
        public set id(v: number) {
            this._id = v;
        }

        private _title: string;
        public get title(): string {
            return this._title;
        }
        public set title(v: string) {
            this._title = v;
        }


        private _author_id: number;
        public get author_id(): number {
            return this._author_id;
        }
        public set author_id(v: number) {
            this._author_id = v;
        }
    };
}