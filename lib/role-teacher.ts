import axios from "axios";

export const isRoleTeacher = async (): Promise<string> => {
  try {
    const response = await axios.get("/api/check-role");
    const { role } = response.data;
    return role;
  } catch (error) {
    console.error("Error in isRoleTeacher:", error);
    throw error; // You may handle the error according to your needs
  }
};
