"use client";

import * as z from "zod";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Course } from "@prisma/client";
import { AlertTriangle } from "lucide-react";

interface EduxclusiveFormProps {
  initialData: Course;
  courseId: string;
}

export const EduxclusiveForm = ({
  initialData,
  courseId,
}: EduxclusiveFormProps) => {
  const [isEduxclusive, setIsEduxclusive] = useState<boolean>(
    initialData.eduxclusive
  );
  const router = useRouter();

  const onSubmit = async (data: boolean) => {
    try {
      await axios.post(`/api/courses/${courseId}/eduxclusive`, {
        isEduxclusive: data,
      });
      toast.success("Course updated");
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className='mt-6 border bg-slate-100 rounded-md p-4'>
      <div className='font-medium flex items-center justify-between'>
        <div>
          Make this course{" "}
          <span className='text-yellow-500 font-extrabold text-xl'>Eduxclusive?</span>
        </div>

        <label className='relative inline-flex items-center me-5 cursor-pointer'>
          <input
            type='checkbox'
            value=''
            className='sr-only peer'
            checked={isEduxclusive}
            onChange={() => {
              setIsEduxclusive((current) => {
                onSubmit(!current);
                return !current;
              });
            }}
          />
          <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-yellow-300 dark:peer-focus:ring-yellow-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-yellow-400"></div>
        </label>
      </div>
      <p className='mt-8 flex items-center justify-start gap-x-3 text-[10px]'>
        <AlertTriangle size={13}></AlertTriangle>
        This will make the course free to all EduGrade students and teachers
      </p>
    </div>
  );
};
