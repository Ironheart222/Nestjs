/* eslint-disable prettier/prettier */
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CreateUserInput } from './dto/create-user.input';
import { DeleteUserInput } from './dto/delete-user.input';
import { UpdateUserInput } from './dto/update-user.inpute';
import { User } from './user.entity';
import { UserService } from './user.service';

@Resolver(of => User)
export class UserResolver {
    constructor(private userService: UserService) { }

    @Query(() => User)
    getUser(@Args('id', { type: () => Int }) id: number) {
        return this.userService.findOne(id);
    }

    @Query(() => [User])
    user(): Promise<User[]> {
        return this.userService.findAll();
    }

    @Mutation(() => User)
    createUser(@Args('CreateUserInput') CreateUserInput: CreateUserInput): Promise<User> {
        return this.userService.createUser(CreateUserInput);
    }

    @Mutation(() => User, { name: 'update' })
    update(@Args('updateUserInput') updateUserInpute: UpdateUserInput): Promise<User> {
        return this.userService.update(updateUserInpute.id,updateUserInpute);
    }

    @Mutation(() => User)
    removeUser(@Args('id') id: number): Promise<User> {
        return this.userService.remove(id);
    }
}
