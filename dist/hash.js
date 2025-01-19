import { hash } from "bcrypt-ts";
export async function hashPassword(plainPassword) {
    return hash(plainPassword, 10).then((hashedPassword) => {
        return hashedPassword;
    });
}
