import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/sequelize";
import {User} from "./user.model";
import {CreateUserDto} from "./dto/create-user.dto";
import {RolesService} from "../roles/roles.service";
import * as bcrypt from 'bcryptjs'

@Injectable()
export class UsersService {
    constructor(@InjectModel(User) private userRepository: typeof User,
                private roleService: RolesService) {}

    async createAdmin(dto: CreateUserDto) {
        const hashPassword = await bcrypt.hash(dto.password, 5)
        const user = await this.userRepository.create({...dto, password: hashPassword})

        const role = await this.roleService.getRoleByValue('ADMIN')
        user.$set('roles', [role.id])
        user.roles = [role]
        return user
    }

    async getAllUsers() {
        const users = this.userRepository.findAll({include: {all: true}})
        return users
    }

    async getUsersByEmail(email: string) {
        const user = this.userRepository.findOne({where: {email}, include: {all: true}})
        return user
    }

}