export interface Tipocategoria {
    id:     string;
    nombre: string;
}
export interface TipoUsuarioResponse {
    content:        Tipocategoria[];
    totalRegisters: number;
    totalPages: number;
    actualPage:     number;
}
