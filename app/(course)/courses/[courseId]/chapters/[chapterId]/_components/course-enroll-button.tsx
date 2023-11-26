"use client";

import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/format";
import { useRouter } from "next/navigation";

interface CourseEnrollButtonProps {
  price: number;
  courseId: string;
  eduxclusive: boolean;
}

export const CourseEnrollButton = ({
  price,
  courseId,
  eduxclusive,
}: CourseEnrollButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onClick = async () => {
    try {
      setIsLoading(true);

      if (!eduxclusive) {
        const response = await axios.post(`/api/courses/${courseId}/checkout`);

        window.location.assign(response.data.url);
      } else {
        await axios.post(
          `/api/courses/${courseId}/free-purchase`
        );

        router.push(`courses/${courseId}`);
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={onClick}
      disabled={isLoading}
      size='sm'
      className='w-full md:w-auto'
    >
      Enroll for{" "}
      {eduxclusive ? (
        <p className='ml-1'>
          <span className='font-extrabold'> Free </span>
        </p>
      ) : (
        formatPrice(price)
      )}
    </Button>
  );
};
