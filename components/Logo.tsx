import { FC } from "react";
import Link from "next/link";
import { MdCastForEducation } from "react-icons/md";

interface LogoProps {}

const Logo: FC<LogoProps> = ({}) => {
  return (
    <Link href='/dashboard' className='flex items-center'>
      <MdCastForEducation className='w-12 h-12 text-yellow-300 mr-4' />
      <span className='self-center text-3xl font-semibold whitespace-nowrap text-white'>
        EduLearn
      </span>
    </Link>
  );
};

export default Logo;
