import {Body, Controller, Get, Post, Query, UseGuards} from '@nestjs/common';
import {ApiOperation} from "@nestjs/swagger";
import {ArticleService} from "./article.service";
import {CreateArticleDto} from "./dto/create-article.dto";
import {IsInt, IsString} from "class-validator";
import {Type} from "class-transformer";
import {Roles} from "../auth/roles-auth.decorator";
import {RolesGuard} from "../auth/role.guard";

export class GetArticlesQuery {
    @IsInt()
    @Type(() => Number)
    count: number;

    @IsInt()
    @Type(() => Number)
    offset: number;

    @IsString()
    sort: string;
}

export class SearchArticlesQuery extends GetArticlesQuery {
    @IsString()
    searchString: string;
}

@Controller('articles')
export class ArticleController {
    constructor(private articlesService: ArticleService) {
    }

    @ApiOperation({summary: 'Create post'})
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Post()
    create(@Body() dto: CreateArticleDto) {
        return this.articlesService.createArticle(dto)
    }

    @ApiOperation({summary: 'Get articles'})
    @Get()
    async getAll(@Query() queryParams: GetArticlesQuery) {
        return this.articlesService.getAllArticles(queryParams)
    }

    @ApiOperation({summary: 'Search articles'})
    @Get('/search')
    async search(@Query() queryParams: SearchArticlesQuery) {
        return this.articlesService.search(queryParams)
    }
}
