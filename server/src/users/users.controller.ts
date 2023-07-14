import {Body, Controller, Get, Post, Query, UseGuards, UsePipes} from "@nestjs/common";
import {UsersService} from "./users.service";
import {CreateUserDto} from "./dto/create-user.dto";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {User} from "./user.model";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {Roles} from "../auth/roles-auth.decorator";
import {RolesGuard} from "../auth/role.guard";
import {ValidationPipe} from "../pipes/validation.pipe";

@ApiTags('Users')
@Controller('/users')
export class UsersController {
    constructor(private usersService: UsersService) {
    }

    @ApiOperation({summary: 'Create user'})
    @ApiResponse({status: 200, type: User})
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @UsePipes(ValidationPipe)
    @Post()
    create(@Body() userDto: CreateUserDto) {
        return this.usersService.createAdmin(userDto)
    }

    @ApiOperation({summary: 'Get users'})
    @ApiResponse({status: 200, type: [User]})
    /*@UseGuards(JwtAuthGuard)*/
    @Get()
    getAll() {
        return this.usersService.getAllUsers()
    }

    @ApiOperation({summary: 'Get one user'})
    @ApiResponse({status: 200, type: User})
    @UseGuards(JwtAuthGuard)
    @Get('/current')
    getOne(@Query('email') email: number) {
        const stringifyEmail = String(email)
        return this.usersService.getUsersByEmail(stringifyEmail)
    }

}