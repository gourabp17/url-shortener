const shortid = require('shortid');
const NodeCache = require("node-cache");
const cacheByActualUrl = new NodeCache();
const cacheByShortenUrl = new NodeCache();
const cacheHistoryByShortenUrl = new NodeCache();
export class ShortenUrl {
    public async getActualUrl(shortenUrl: string) {
        const urlToFetch = "localhost:3000/" + shortenUrl;
        console.log("url to fetch " + urlToFetch)


        const actualUrl = cacheByShortenUrl.get(urlToFetch);
        console.log("actual url: " + actualUrl.actualUrl)
        actualUrl.noOfTimesCalled = actualUrl.noOfTimesCalled + 1;
        cacheByShortenUrl.set(urlToFetch, actualUrl)
        return actualUrl.actualUrl;
    }
    public async saveShortenUrl(actualUrl: string) {

        if (cacheByActualUrl.get(actualUrl)) {
            const oldUrl = cacheByActualUrl.get(actualUrl);
            return oldUrl.shortUrl;
        }

        const shortUrl = await this.generateShortUrl();
        const obj = { shortUrl: shortUrl, actualUrl: actualUrl, createdOn: new Date(), noOfTimesCalled: 0 };
        cacheByShortenUrl.set(shortUrl, obj);
        cacheByActualUrl.set(actualUrl, obj);
        return shortUrl;
    }
    public async generateShortUrl() {
        return "localhost:3000/" + shortid.generate();
    }
    public async getAllUrl() {
        const keys = cacheByShortenUrl.keys();
        console.log(JSON.stringify(keys))
        return cacheByShortenUrl.mget(keys);
    }
    public async getAllHistory(shortenUrl: string) {
        const history = cacheHistoryByShortenUrl.get(shortenUrl);
        return history;
    }
    public async storeHitory(shortenUrl: string, ip: string, userAgent: string) {
        let history:any = [];
        const obj = { shortenUrl: shortenUrl, ip: ip, userAgent: userAgent, accessTime: new Date() }
        if (cacheHistoryByShortenUrl.get(shortenUrl)) {
            const oldHistory=cacheHistoryByShortenUrl.get(shortenUrl);
            for(let i=0; i<oldHistory.length; i++){
                history.push(oldHistory[i])
            }
        }
        history.push(obj);

        cacheHistoryByShortenUrl.set(shortenUrl, history)
    }
}