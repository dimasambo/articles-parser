import { CreateArticleDto } from "./dto/create-article.dto";
import { Article } from "./article.model";
import { GetArticlesQuery, SearchArticlesQuery } from "./article.controller";
export declare class ArticleService {
    private postRepository;
    constructor(postRepository: typeof Article);
    createArticle(dto: CreateArticleDto): Promise<Article[]>;
    getAllArticles(queryParams: GetArticlesQuery): Promise<Article[]>;
    search(queryParams: SearchArticlesQuery): Promise<Article[]>;
}
