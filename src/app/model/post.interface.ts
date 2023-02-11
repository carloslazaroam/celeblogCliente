import { User } from "./user.interface";
import { FormControl } from "@angular/forms";
import { Pageable, Sort } from "./generic";
import { Categoria } from "./categoria";


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
    images: string;
    usuario?:    User;
    categoria?: Categoria;
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


