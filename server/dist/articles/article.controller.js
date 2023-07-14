"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticleController = exports.SearchArticlesQuery = exports.GetArticlesQuery = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const article_service_1 = require("./article.service");
const create_article_dto_1 = require("./dto/create-article.dto");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const roles_auth_decorator_1 = require("../auth/roles-auth.decorator");
const role_guard_1 = require("../auth/role.guard");
class GetArticlesQuery {
}
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], GetArticlesQuery.prototype, "count", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], GetArticlesQuery.prototype, "offset", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GetArticlesQuery.prototype, "sort", void 0);
exports.GetArticlesQuery = GetArticlesQuery;
class SearchArticlesQuery extends GetArticlesQuery {
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SearchArticlesQuery.prototype, "searchString", void 0);
exports.SearchArticlesQuery = SearchArticlesQuery;
let ArticleController = class ArticleController {
    constructor(articlesService) {
        this.articlesService = articlesService;
    }
    create(dto) {
        return this.articlesService.createArticle(dto);
    }
    async getAll(queryParams) {
        return this.articlesService.getAllArticles(queryParams);
    }
    async search(queryParams) {
        return this.articlesService.search(queryParams);
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create post' }),
    (0, roles_auth_decorator_1.Roles)('ADMIN'),
    (0, common_1.UseGuards)(role_guard_1.RolesGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_article_dto_1.CreateArticleDto]),
    __metadata("design:returntype", void 0)
], ArticleController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get articles' }),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [GetArticlesQuery]),
    __metadata("design:returntype", Promise)
], ArticleController.prototype, "getAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Search articles' }),
    (0, common_1.Get)('/search'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [SearchArticlesQuery]),
    __metadata("design:returntype", Promise)
], ArticleController.prototype, "search", null);
ArticleController = __decorate([
    (0, common_1.Controller)('articles'),
    __metadata("design:paramtypes", [article_service_1.ArticleService])
], ArticleController);
exports.ArticleController = ArticleController;
//# sourceMappingURL=article.controller.js.map