import { LucideIcon } from "lucide-react";

import { IconBadge } from "@/components/icon-badge";
import { MdCastForEducation } from "react-icons/md";

interface InfoCardProps {
  numberOfItems: number;
  variant?: "default" | "success";
  label: string;
  icon: LucideIcon;
  points?: boolean;
}

export const InfoCard = ({
  variant,
  icon: Icon,
  numberOfItems,
  label,
  points = false,
}: InfoCardProps) => {
  return (
    <div className='border rounded-md flex items-center gap-x-2 p-3 justify-between'>
      <div className='flex items-center gap-x-2'>
        <IconBadge variant={variant} icon={Icon} />
        <div>
          <p className='font-medium'>{label}</p>
          <p className='text-gray-500 text-sm'>
            {numberOfItems}{" "}
            {points
              ? "Points in total"
              : numberOfItems === 1
              ? "Course"
              : "Courses"}
          </p>
        </div>
      </div>
      {points ? (
        <a href="" className="h-full bg-black/70 p-2 rounded-lg" >
          <MdCastForEducation className="text-yellow-300" size={33}/>
        </a>
      ) : null}
    </div>
  );
};
