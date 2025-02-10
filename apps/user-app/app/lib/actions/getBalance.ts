import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";
import { redirect } from "next/navigation";

export async function getBalance() {
    try {
        const session = await getServerSession(authOptions);
        console.log('session',session)
        if (!session || !session.user) {
            redirect("/signin"); // Redirect to the sign-in page if session is invalid
        }

        const balance = await prisma.balance.findFirst({
            where: {
                userId: Number(session.user.id),
            },
        });

        return {
            amount: balance?.amount || 200000,
            locked: balance?.locked || 0,
        };
    } catch (error) {
        console.error("Error fetching balance:", error);
        redirect("/signin"); // Ensure redirection on failure
    }
}