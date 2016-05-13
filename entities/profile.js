var Entities;
(function (Entities) {
    class Profile {
        get id() {
            return this._id;
        }
        set id(v) {
            this._id = v;
        }
        get name() {
            return this._name;
        }
        set name(v) {
            this._name = v;
        }
    }
    Entities.Profile = Profile;
    ;
})(Entities || (Entities = {}));
