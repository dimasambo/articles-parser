import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, IsString, Matches, MinLength} from "class-validator";

export class CreateUserDto {
    @ApiProperty({example: 'user@gmail.com', description: 'Email'})
    @IsString({message: 'should be string'})
    @IsEmail({}, {message: 'wrong email'})
    readonly email: string
    @ApiProperty({example: '1234qwer', description: 'Password'})
    @IsString({message: 'should be string'})
    @MinLength(6, { message: 'Password must be at least 6 characters' })
    @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,}$/, {
        message: 'Password must contain at least one uppercase letter, one lowercase letter, and one number',
    })
    readonly password: string
}