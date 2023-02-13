export interface AuthResponse {
  ok:    boolean;
  id:    number;
  name:  string;
  token: string;
  tipousuario?:   string;
  imagen?: string;
}
export interface CheckTokenResponse {
  ok:  boolean;
  msg: string;
}
