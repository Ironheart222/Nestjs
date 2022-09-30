/* eslint-disable prettier/prettier */
import { Field, InputType, Int } from "@nestjs/graphql";
import { IsAlpha, IsEmail, IsNotEmpty, IsOptional } from "class-validator";

@InputType()
export class DeleteUserInput {

    @Field((type) => Int)
    @IsNotEmpty()
    id: number;

}