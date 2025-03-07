import db from "@repo/db/client";
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcrypt";

export const authOptions = {
    providers: [
      CredentialsProvider({
          name: 'Credentials',
          credentials: {
            phone: { label: "Phone number", type: "text", placeholder: "1231231231",required:true },
            password: { label: "Password", type: "password",required:true}
          },
          
          // TODO: User credentials type from next-aut
          async authorize(credentials: any) {
            // Do zod validation, OTP validation here
            console.log('credentials.phone',credentials.password)
            const hashedPassword = await bcrypt.hash(credentials.password, 10);
            const existingUser = await db.user.findFirst({
                where: {
                    number: credentials.phone
                }
            });
console.log('existingUser',existingUser)
            if (existingUser) {
                console.log(`password from DB is ${existingUser.password}`)
                console.log(`password from user is ${credentials.password}`)
                console.log(`hashed password from DB is ${hashedPassword}`)
                const passwordValidation = await bcrypt.compare(credentials.password, existingUser.password);
                if (passwordValidation) {
                    console.log('existingUser.id.toString()',existingUser.id.toString())
                    return {
                        id: existingUser.id.toString(),
                        name: existingUser.name,
                        phone: existingUser.number,
                    }
                }
                return null;
            }

            try {
                const user = await db.user.create({
                    data: {
                        number: credentials.phone,
                        password: hashedPassword
                    }
                });
            
                return {
                    id: user.id.toString(),
                    name: user.name,
                    phone: user.number
                }
            } catch(e) {
                console.error(e);
            }

            return null
          },
        })
    ],
    secret: process.env.JWT_SECRET || "secret",
    callbacks: {
        // TODO: can u fix the type here? Using any is bad
        async session({ token, session }: any) {
            session.user.id = token.sub

            return session
        }
    },
    pages: {
        signIn: '/signin',
      },
  }
  