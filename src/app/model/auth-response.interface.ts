export interface AuthResponse {
  ok:    boolean;
  name:  string;
  token: string;
  rol?:   string;
  imagen?: string;
}
export interface CheckTokenResponse {
  ok:  boolean;
  msg: string;
}
