import { checkRole } from "@/actions/checkRole";
import { isTeacher } from "@/lib/teacher";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const TeacherLayout = async ({ children }: { children: React.ReactNode }) => {
  const { userId } = auth();
  const eduTeacher = (await checkRole()) === "Teacher";

  if (!isTeacher(userId) && !eduTeacher) {
    return redirect("/");
  }

  return <>{children}</>;
};

export default TeacherLayout;
