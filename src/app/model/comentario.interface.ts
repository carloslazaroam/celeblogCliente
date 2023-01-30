import { Pageable, Sort } from "./generic";
import { Post } from "./post.interface";
import { User } from "./user.interface";

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

export interface ComentarioResponse {
    content:        Comentario[];
    totalRegisters: number;
    totalPages: number;
    actualPage:     number;
}
export interface Comentario {
    id?:         string;
    contenido:  string;
    datetime:   string;
    puntuacion: string;
    usuario?:    User;
    post?:       Post;
}






