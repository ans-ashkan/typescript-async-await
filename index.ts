"use strict";

import request = require('request');
import * as DatabaseSdk from './sdks/databasesdk'


function handleError(reason) {
    console.log("errorxx");
    console.log(arguments.callee.caller.toString() + ": ", reason);
}

(async function doJob() {
    let db = new DatabaseSdk.Client("http://localhost:3000/");
    try {
        let posts = await db.PostManager.GetAllAsync();
        console.log(`retrived ${posts.length} posts`);
        console.log(JSON.stringify(posts));
        posts.forEach(async (post) => {
            let profile = await db.ProfileManager.GetByIdAsync(post.author_id);
            console.log(profile.name);
        });
    } catch (error) {
        console.log("catched ", error.message);
    }
})();