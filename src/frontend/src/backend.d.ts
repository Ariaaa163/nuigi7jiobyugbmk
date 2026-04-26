import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface RegistrationInput {
    interests: string;
    name: string;
    email: string;
    message: string;
    phone: string;
}
export type SubmitResult = {
    __kind__: "ok";
    ok: RegistrationId;
} | {
    __kind__: "err";
    err: string;
};
export type RegistrationId = bigint;
export interface Registration {
    id: RegistrationId;
    interests: string;
    name: string;
    submittedAt: bigint;
    email: string;
    message: string;
    phone: string;
}
export interface backendInterface {
    getRegistrations(): Promise<Array<Registration>>;
    submitRegistration(input: RegistrationInput): Promise<SubmitResult>;
}
