

export interface Tipocategoria {
    id:     string;
    nombre: string;
    categoria: {id: number, descripcion: string, nombre: string}[]
}
