"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";
import { CheckCheck } from "lucide-react";
import { FC, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { MdCastForEducation } from "react-icons/md";

interface AssignmentProps {
  chapterId: string;
}

const Assignment: FC<AssignmentProps> = ({ chapterId }) => {
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState("BASIC");
  const [isAssigned, setIsAssigned] = useState(false);
  const [done, setDone] = useState(false);
  
  useEffect(() => {
    const setData = async () => {
      const role = await axios.get("/api/check-role");
      setRole(role.data.role);

      const isAssigned = await axios.post("/api/is-assigned", { chapterId });
      setIsAssigned(isAssigned.data);
      if (isAssigned.data) {
        const done = await axios.post("/api/is-done", { chapterId });
        setDone(done.data);
      }
    };
    setData();
  }, [chapterId]);

  const handleAdding = async () => {
    setLoading(true);
    axios
      .post("/api/add-assignment", { chapterId })
      .then(() => {
        setLoading(false);

        location.reload();

        toast.success("Assignment added!");
      })
      .catch((err) => toast.error(err.message));
  };

  const handleFinishing = async () => {
    setLoading(true);
    axios
      .post("/api/finish-assignment", { chapterId })
      .then(() => {
        setLoading(false);

        location.reload();

        toast.success("Assignment finsihed!");
      })
      .catch((err) => toast.error(err.message));
  };

  let action = !done ? (
    <Button disabled={loading} onClick={handleFinishing}>
      Mark as finished
    </Button>
  ) : (
    <Button
      className='bg-green-500 hover:bg-green-500 flex items-center justify-center gap-x-3 cursor-default'
      disabled={loading}
    >
      Finished <CheckCheck />
    </Button>
  );

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
            <Button disabled={loading} onClick={handleAdding}>
              Mark this lesson as an assignment
            </Button>
          ) : (
            action
          )}
        </div>
      ) : null}
    </>
  );
};

export default Assignment;
