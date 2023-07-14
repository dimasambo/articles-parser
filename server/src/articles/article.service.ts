import {Injectable} from '@nestjs/common';
import {CreateArticleDto} from "./dto/create-article.dto";
import {InjectModel} from "@nestjs/sequelize";
import {Article} from "./article.model";
import {GetArticlesQuery, SearchArticlesQuery} from "./article.controller";

@Injectable()
export class ArticleService {
    constructor(@InjectModel(Article) private postRepository: typeof Article) {}

    async createArticle(dto: CreateArticleDto) {
        await this.postRepository.create(dto)
        return await this.postRepository.findAll({where: {userId: dto.userId}, include: {all: true}})
    }

    async getAllArticles(queryParams: GetArticlesQuery) {
        const {count, offset, sort} = queryParams
        return await this.postRepository.findAll({
            offset: offset,
            limit: count,
            order: sort === 'DEFAULT' ? [['id', 'DESC']] : (sort === 'DESC' ? [['title', 'DESC']] : [['title', 'ASC']])
        })
    }

    async search(queryParams: SearchArticlesQuery) {
        const {count, sort, offset, searchString} = queryParams
        const Sequelize = require('sequelize');
        const Op = Sequelize.Op;

        return await this.postRepository.findAll({
            offset: offset,
            limit: count,
            order: sort === 'DEFAULT' ? [['id', 'DESC']] : (sort === 'DESC' ? [['title', 'DESC']] : [['title', 'ASC']]),
            where: {
                title: {
                    [Op.iLike]: `%${searchString}%`
                }
            }
        });
    }
}
