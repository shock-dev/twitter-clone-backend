import bcrypt from "bcrypt";

export default (value: string): string => {
    const salt = bcrypt.genSaltSync(10);
    return  bcrypt.hashSync(value, salt);
}
