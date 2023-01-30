import { Tipocategoria } from "./tipocategoria";

export interface Categoria {
    id?:            string;
    nombre:        string;
    descripcion:   string;
    tipocategoria?: Tipocategoria;
}

export interface CategoriaResponse {
    content:        Categoria[];
    totalRegisters: number;
    totalPages: number;
    actualPage:     number;
}