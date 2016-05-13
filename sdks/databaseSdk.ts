import Profile = Entities.Profile;
import Post = Entities.Post;
import request = require('request');

export class ApiError extends Error {
    public message: string;
    constructor(url: string, method: string, public errorDetails?: any) {
        super(`Error calling api Url ${url},Method ${method}`);
        this.message = `Error calling api Url ${url},Method ${method}`;
    }
}

class Helper {
    static async get<T>(url: string): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            request(url, (error, response, body) => {
                if (typeof (error) !== undefined) {
                    reject(new ApiError(url, "GET", error));
                } else if (!response.statusCode.toString().startsWith('2')) {
                    reject(new ApiError(url, "GET", response))
                }
                else
                    resolve(JSON.parse(body));
            });
        });
    }
}

interface IManager<T> {
    GetAllAsync(): Promise<T[]>;
    GetByIdAsync(id: any): Promise<T>;
}

class ManagerBase<T> implements IManager<T> {
    private _url: string;
    constructor(baseUrl: string, path: string) {
        if (!baseUrl.endsWith('/'))
            baseUrl += '/';
        if (!path.endsWith('/'))
            path += '/'
        this._url = baseUrl + path;
    }

    GetAllAsync(): Promise<T[]> {
        return Helper.get<T[]>(this._url);
    }

    GetByIdAsync(id: any): Promise<T> {
        console.log(`getting ${this._url + id}`);
        return Helper.get<T>(this._url + id);
    }
}

export interface IProfileManager extends IManager<Profile> {
}

class ProfileManager extends ManagerBase<Profile> implements IProfileManager {
    constructor(baseUrl: string) {
        super(baseUrl, 'profiles');
    }
}

export interface IPostManager extends IManager<Post> {
}

class PostManager extends ManagerBase<Post> implements IPostManager {
    constructor(baseUrl: string) {
        super(baseUrl, 'posts');
    }
}

export class Client {
    constructor(baseUrl: string) {
        this._profileManager = new ProfileManager(baseUrl);
        this._postManager = new PostManager(baseUrl);
    }

    private _profileManager: IProfileManager;
    public get ProfileManager(): IProfileManager {
        return this._profileManager;
    }

    private _postManager: IPostManager;
    public get PostManager(): IPostManager {
        return this._postManager;
    }
}