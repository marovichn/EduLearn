import { MdCastForEducation } from "react-icons/md";
import Link from "next/link";

export const Logo = () => {
  return (
    <Link href='/' className='flex items-center p-0'>
      <MdCastForEducation className='text-yellow-300 mr-2' size={40}/>
      
      <span className='self-center text-3xl font-bold whitespace-nowrap text-white'>
        EduLearn
      </span>
    </Link>
  );
}