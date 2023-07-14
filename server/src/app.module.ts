import {Module} from "@nestjs/common";
import * as path from 'path'
import {ServeStaticModule} from "@nestjs/serve-static";
import {SequelizeModule} from "@nestjs/sequelize";
import {UsersModule} from "./users/users.module";
import {ConfigModule} from "@nestjs/config";
import {User} from "./users/user.model";
import { RolesModule } from './roles/roles.module';
import {Role} from "./roles/role.model";
import {UserRoles} from "./roles/user-roles.model";
import {AuthModule} from "./auth/auth.module";
import { ArticleModule } from './articles/article.module';
import {Article} from "./articles/article.model";

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.${process.env.NODE_ENV}.env`
        }),
        ServeStaticModule.forRoot({
            rootPath: path.resolve(__dirname, 'static')
        }),
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'postgres',
            password: 'root',
            database: 'articles-parser',
            models: [User, Role, UserRoles, Article],
            autoLoadModels: true,
            synchronize: true
        }),
        UsersModule,
        RolesModule,
        AuthModule,
        ArticleModule
    ],
    controllers: [],
    providers: []
})
export class AppModule {}