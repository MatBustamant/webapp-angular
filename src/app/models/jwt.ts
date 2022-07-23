export interface JwtDTO {
    token: string;
}

export interface decodedJWT {
    sub: string;
    iat: number;
    exp: number;
    roles: [{authority: string}];
}
