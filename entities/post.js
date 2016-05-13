var Entities;
(function (Entities) {
    class Post {
        get id() {
            return this._id;
        }
        set id(v) {
            this._id = v;
        }
        get title() {
            return this._title;
        }
        set title(v) {
            this._title = v;
        }
        get author_id() {
            return this._author_id;
        }
        set author_id(v) {
            this._author_id = v;
        }
    }
    Entities.Post = Post;
    ;
})(Entities || (Entities = {}));
