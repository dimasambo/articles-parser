import { ArticleService } from "./article.service";
import { CreateArticleDto } from "./dto/create-article.dto";
export declare class GetArticlesQuery {
    count: number;
    offset: number;
    sort: string;
}
export declare class SearchArticlesQuery extends GetArticlesQuery {
    searchString: string;
}
export declare class ArticleController {
    private articlesService;
    constructor(articlesService: ArticleService);
    create(dto: CreateArticleDto): Promise<import("./article.model").Article[]>;
    getAll(queryParams: GetArticlesQuery): Promise<import("./article.model").Article[]>;
    search(queryParams: SearchArticlesQuery): Promise<import("./article.model").Article[]>;
}
