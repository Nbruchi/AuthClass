import {v4 as uuidv4} from "uuid";
import {getVerificationTokenByEmail} from "@/data/verification-token";
import {db} from "@/lib/db";

export const generateVerificationToken = async (email:string) =>{
    const token = uuidv4();
    const expires = new Date(new Date().getTime() + 3600 * 1000);

    const existingToken = await getVerificationTokenByEmail(email);

    if(existingToken){
        await db.verificatinToken.delete({
            where:{
                id: existingToken.id
            }
        })
    }

    return db.verificatinToken.create({
        data: {
            email,
            token,
            expires
        }
    });
}
