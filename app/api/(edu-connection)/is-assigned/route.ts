import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { gradedb } from "@/lib/db";

export async function POST(req:Request) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const {chapterId} =await req.json();
    if(!chapterId){
         return new NextResponse("Invalid payload", { status: 400 });
    }

    const assignedChapterGroup = await gradedb.group.findFirst({where:{
        chapterId: chapterId
    }})

    if(!assignedChapterGroup){
        return NextResponse.json(false);
    }

    return NextResponse.json(true);
  } catch (error) {
    console.log("[CHECK_ASSIGNED_GROUP]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
