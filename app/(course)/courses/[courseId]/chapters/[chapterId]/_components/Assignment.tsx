"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";
import { FC, useEffect, useState } from "react";
import { MdCastForEducation } from "react-icons/md";

interface AssignmentProps {
  chapterId: string;
}

const Assignment: FC<AssignmentProps> = ({ chapterId }) => {
  const [role, setRole] = useState("BASIC");
  const [isAssigned, setIsAssigned] = useState(false);
  useEffect(() => {
    axios
      .get("/api/check-role")
      .then((role: any) => setRole(role.data.role))
      .then(() => console.log(role));

    axios
      .post("/api/is-assigned", { chapterId })
      .then((isAssigned: any) => setIsAssigned(isAssigned.data))
      .then(() => console.log(isAssigned));
  }, []);

  const handleAdding = () => {};
  const handleFinishing = () => {};

  return (
    <>
      {role === "Student" ? (
        <div className='p-10 bg-gray-200'>
          <div className='flex items-center p-0 mb-5'>
            <MdCastForEducation className='text-black mr-4' size={40} />

            <span className='self-center text-3xl font-bold whitespace-nowrap text-black'>
              EduGrade <span className='text-yellow-500'>Student</span>
            </span>
          </div>
          <h1 className='text-xl font-semibold mb-2'>Assignment?</h1>
          <p className='mb-5'>
            Marking lessons as assignment will add current lesson to your{" "}
            <span className='font-semibold'>EduGrade</span>, with{" "}
            <span className='font-semibold'>7 day</span> time period to finish,
            each lesson is worth{" "}
            <span className='font-semibold'>(10 points)</span>.
          </p>
          {!isAssigned ? (
            <Button onClick={handleAdding}>
              Mark this lesson as an assignment
            </Button>
          ) : (
            <Button onClick={handleFinishing}>Mark as finished</Button>
          )}
        </div>
      ) : null}
    </>
  );
};

export default Assignment;
