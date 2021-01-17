import { BaseResponse } from "./BaseResponse";

export class LoginResponse extends BaseResponse {
    data!: LoginResponseData;
}

export class LoginResponseData {
    id!: string;
    name!:string;
    email!:string;
    username!: string;
    password!:string;
    token!:string;
    success!:string;
    user!:string;
}

