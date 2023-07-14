import {forwardRef, Module} from '@nestjs/common';
import {ArticleController} from './article.controller';
import {ArticleService} from './article.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "../users/user.model";
import {Article} from "./article.model";
import {AuthModule} from "../auth/auth.module";

@Module({
  controllers: [ArticleController],
  providers: [ArticleService],
  imports: [
    SequelizeModule.forFeature([User, Article]),
    forwardRef(() => AuthModule)
  ],
})
export class ArticleModule {}
