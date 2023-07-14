import { User } from "./user.model";
import { CreateUserDto } from "./dto/create-user.dto";
import { RolesService } from "../roles/roles.service";
export declare class UsersService {
    private userRepository;
    private roleService;
    constructor(userRepository: typeof User, roleService: RolesService);
    createAdmin(dto: CreateUserDto): Promise<User>;
    getAllUsers(): Promise<User[]>;
    getUsersByEmail(email: string): Promise<User>;
}
