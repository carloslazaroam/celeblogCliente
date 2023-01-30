export interface Tipousuario {
    id:     string;
    nombre: string;
}
export interface TipoUsuarioResponse {
    content:        Tipousuario[];
    totalRegisters: number;
    totalPages: number;
    actualPage:     number;
}
