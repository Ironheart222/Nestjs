/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.inpute';
import { User } from './user.entity';

@Injectable()
export class UserService {
    user: any;

    constructor(@InjectRepository(User) private userRepository: Repository<User>) { }

    createUser(createUserInput: CreateUserInput): Promise<User> {
        const newUser = this.userRepository.create(createUserInput);
        return this.userRepository.save(newUser);
    }

    async findAll(): Promise<User[]> {
        return this.userRepository.find();
    }

    async findOne(id: number): Promise<User> {
        return this.userRepository.findOneOrFail(id)
    }

    async update(id:number,updateUserInput:UpdateUserInput): Promise<User> {
        const user: User  =  this.userRepository.create(updateUserInput)
        user.id = id;
        return this.userRepository.save(user);
        // Object.assign(user,updateUserInput);
    }

    async remove(id: number) {
        const user = this.findOne(id)
        if (user) {
            const ret = await this.userRepository.delete(id)
            if (ret.affected === 1) {
                return user;
            }
        }
        throw new NotFoundException(`Record cannot find by id ${id}`)
    }

}