import { User } from "./user"

export class Denuncia{
    _id?: string;
    name: string;
    description: string;
    user: User;
    date: Date;

    constructor(name:string, description:string, user:User, date:Date){
        this.name = name;
        this.description = description;
        this.user = user;
        this.date = date;
    }
}