"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const request = require('request');
class ApiError extends Error {
    constructor(url, method, errorDetails) {
        super(`Error calling api Url ${url},Method ${method}`);
        this.errorDetails = errorDetails;
        this.message = `Error calling api Url ${url},Method ${method}`;
    }
}
exports.ApiError = ApiError;
class Helper {
    static get(url) {
        return __awaiter(this, void 0, Promise, function* () {
            return new Promise((resolve, reject) => {
                request(url, (error, response, body) => {
                    if (typeof (error) !== undefined) {
                        reject(new ApiError(url, "GET", error));
                    }
                    else if (!response.statusCode.toString().startsWith('2')) {
                        reject(new ApiError(url, "GET", response));
                    }
                    else
                        resolve(JSON.parse(body));
                });
            });
        });
    }
}
class ManagerBase {
    constructor(baseUrl, path) {
        if (!baseUrl.endsWith('/'))
            baseUrl += '/';
        if (!path.endsWith('/'))
            path += '/';
        this._url = baseUrl + path;
    }
    GetAllAsync() {
        return Helper.get(this._url);
    }
    GetByIdAsync(id) {
        console.log(`getting ${this._url + id}`);
        return Helper.get(this._url + id);
    }
}
class ProfileManager extends ManagerBase {
    constructor(baseUrl) {
        super(baseUrl, 'profiles');
    }
}
class PostManager extends ManagerBase {
    constructor(baseUrl) {
        super(baseUrl, 'posts');
    }
}
class Client {
    constructor(baseUrl) {
        this._profileManager = new ProfileManager(baseUrl);
        this._postManager = new PostManager(baseUrl);
    }
    get ProfileManager() {
        return this._profileManager;
    }
    get PostManager() {
        return this._postManager;
    }
}
exports.Client = Client;
