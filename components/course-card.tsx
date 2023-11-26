import Image from "next/image";
import Link from "next/link";
import { BookOpen, DollarSign } from "lucide-react";

import { IconBadge } from "@/components/icon-badge";
import { formatPrice } from "@/lib/format";
import { CourseProgress } from "@/components/course-progress";
import { MdCastForEducation } from "react-icons/md";

interface CourseCardProps {
  id: string;
  title: string;
  imageUrl: string;
  chaptersLength: number;
  price: number;
  progress: number | null;
  category: string;
  eduxclusive: boolean;
}

export const CourseCard = ({
  id,
  title,
  imageUrl,
  chaptersLength,
  price,
  progress,
  category,
  eduxclusive,
}: CourseCardProps) => {
  return (
    <Link href={`/courses/${id}`}>
      <div className='group hover:shadow-sm transition overflow-hidden border rounded-lg p-3 h-full'>
        <div className='relative w-full aspect-video rounded-md overflow-hidden mb-2'>
          <Image fill className='object-cover' alt={title} src={imageUrl} />
        </div>
        <div className='flex flex-col pt-2'>
          <div className='text-lg md:text-base font-medium group-hover:text-yellow-700 transition line-clamp-2'>
            {title}
          </div>
          <p className='text-xs text-muted-foreground'>{category}</p>
          <div className='my-3 flex items-start gap-x-2 text-sm md:text-xs gap-y-2 flex-col'>
            <div className='flex items-center gap-x-1  text-slate-500'>
              <IconBadge size='sm' icon={BookOpen} />
              <span>
                {chaptersLength} {chaptersLength === 1 ? "Chapter" : "Chapters"}
              </span>
            </div>
            {eduxclusive ? (
              <div className='flex items-center gap-x-1 text-slate-500'>
                <IconBadge size='sm' icon={MdCastForEducation} />
                <span>Eduxclusive course</span>
              </div>
            ) : (
              <div className='flex items-center gap-x-1 text-slate-500'>
                <IconBadge size='sm' icon={DollarSign} />
                <span>EduLearn Premium</span>
              </div>
            )}
          </div>

          {progress !== null ? (
            <CourseProgress
              variant={progress === 100 ? "success" : "default"}
              size='sm'
              value={progress}
            />
          ) : (
            <p className='text-md md:text-sm font-medium text-slate-700'>
              {eduxclusive ? <p><span className="font-extrabold">Free </span>(for EduGrade Students)</p> : formatPrice(price)}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
};
