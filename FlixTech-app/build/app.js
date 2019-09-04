"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var shortenUrl_service_1 = require("./service/shortenUrl.service");
var bodyParser = require('body-parser');
var shortenUrlService = new shortenUrl_service_1.ShortenUrl();
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.get('/health', function (req, res) {
    res.send({ 'status': 'Alive!' });
});
app.get('/url', function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var shortUrl;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log(req.body);
                    return [4 /*yield*/, shortenUrlService.getAllUrl()];
                case 1:
                    shortUrl = _a.sent();
                    console.log(shortUrl);
                    res.send(shortUrl);
                    return [2 /*return*/];
            }
        });
    });
});
app.post('/history/:shortUrl', function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var shortUrl;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, shortenUrlService.getAllHistory(req.params.shortUrl)];
                case 1:
                    shortUrl = _a.sent();
                    res.send(shortUrl);
                    return [2 /*return*/];
            }
        });
    });
});
app.post('/url', function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var shortUrl;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, shortenUrlService.saveShortenUrl(req.body.originalUrl)];
                case 1:
                    shortUrl = _a.sent();
                    console.log(shortUrl);
                    res.send({ 'responseUrl': shortUrl });
                    return [2 /*return*/];
            }
        });
    });
});
app.get('/:shortUrl', function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var actualUrl, ip, userAgent;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log(req.params.shortUrl);
                    return [4 /*yield*/, shortenUrlService.getActualUrl(req.params.shortUrl)];
                case 1:
                    actualUrl = _a.sent();
                    ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
                    userAgent = req.headers['user-agent'];
                    return [4 /*yield*/, shortenUrlService.storeHitory(req.params.shortUrl, ip, userAgent)];
                case 2:
                    _a.sent();
                    res.redirect(actualUrl);
                    return [2 /*return*/];
            }
        });
    });
});
app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
