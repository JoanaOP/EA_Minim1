import { Message } from "./message";
import { Rating } from "./rating";
import { Activity } from "./activity";
import { Denuncia } from "./denuncia";

export class User {
    _id?: string;
    name: string;
    surname: string;
    username: string;
    password: string;
    phone?: string;
    mail?: string;
    languages: string[];
    location: string[];
    photo?: string;
    denuncias: Denuncia[];
/*     personalRatings?: Rating[];
    activitiesOrganized?: Activity[];
    activities?: Activity[];
    messages?: Message[]; */
    creationDate?: Date;

    constructor(name: string, surname: string, username:string, password: string, phone: string,
        mail: string, languages: string[], location: string[], photo: string, denuncias: Denuncia[]) {
        
        this.name = name;
        this.surname = surname;
        this.username = username;
        this.password = password;
        this.phone = phone;
        this.mail = mail;
        this.languages = languages;
        this.location = location;
        this.photo = photo;
        this.denuncias = denuncias;
    }   
}
