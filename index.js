"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const DatabaseSdk = require('./sdks/databasesdk');
function handleError(reason) {
    console.log("errorxx");
    console.log(arguments.callee.caller.toString() + ": ", reason);
}
(function doJob() {
    return __awaiter(this, void 0, void 0, function* () {
        let db = new DatabaseSdk.Client("http://localhost:3000/");
        try {
            let posts = yield db.PostManager.GetAllAsync();
            console.log(`retrived ${posts.length} posts`);
            console.log(JSON.stringify(posts));
            posts.forEach((post) => __awaiter(this, void 0, void 0, function* () {
                let profile = yield db.ProfileManager.GetByIdAsync(post.author_id);
                console.log(profile.name);
            }));
        }
        catch (error) {
            console.log("catched ", error.message);
        }
    });
})();
