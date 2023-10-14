import axios from "axios";

export const isRoleTeacher = async () => {
  const { role } = (await axios.get("/api/check-role")) as { role: string };
  return role;
};
