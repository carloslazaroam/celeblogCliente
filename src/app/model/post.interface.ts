import { User } from "./user.interface";
import { FormControl } from "@angular/forms";
import { Pageable, Sort } from "./generic";


export interface PostResponse {
    content:        Post[];
    totalRegisters: number;
    totalPages: number;
    actualPage:     number;
}

export interface Post {
    id?:         string;
    title:      string;
    contenido:  string;
    datetime:   string;
    usuario?:    User;
}

export interface IPage<T> {
    content: T[];
    pageable: Pageable;
    last: boolean;
    totalPages: number;
    totalElements: number;
    numberOfElements: number;
    first: boolean;
    size: number;
    number: number;
    sort: Sort;
    empty: boolean;
}


