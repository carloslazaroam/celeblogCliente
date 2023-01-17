import { FormControl } from "@angular/forms";
import { Tipousuario } from "./tipousuario";
import { Pageable, Sort } from "./generic";

export interface IEntity {
    id: number;
}

export interface UserResponse {
    content:        User[];
    totalRegisters: number;
    totalPages: number;
    actualPage:     number;
}

export interface User {
    id?:          string;
    nombre:      string;
    apellidos:   string;
    email:       string;
    usuario:     string;
    images?:       string;
    password?:    string,
    tipousuario?: Tipousuario;
}

export interface User2Form {
    id:          FormControl<string>;
    nombre:      FormControl<string>;
    apellidos:   FormControl<string>;
    email:       FormControl<string>;
    usuario:     FormControl<string>;
    tipousuario: FormControl<number>;
}

export interface User2Send {
    id:          string;
    nombre:      string;
    apellidos:   string;
    email:       string;
    usuario:     string;
    tipousuario: IEntity;
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


