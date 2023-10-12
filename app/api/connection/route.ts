import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { isTeacher } from "@/lib/teacher";
import mongoose, { Schema } from "mongoose";
import { connectToDatabase } from "@/lib/mongoose";
import { AdminModel } from "@/lib/mongoose-models";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const { data } = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const currentUserEmail = data.userEmail;

    const db = connectToDatabase();

    const admins = await AdminModel.find({ email: currentUserEmail });

    console.log(admins);

    /*
    const course = await db.course.create({
      data: {
        userId,
        title,
      },
    });
 */
    return NextResponse.json("USER");
  } catch (error) {
    console.log("[USERS]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
