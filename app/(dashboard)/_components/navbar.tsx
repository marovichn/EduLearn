import { NavbarRoutes } from "@/components/navbar-routes"

import { MobileSidebar } from "./mobile-sidebar"

export const Navbar = () => {
  return (
    <div className='p-4 border-b h-full flex items-center  shadow-sm bg-gray-700 rounded-br-xl max-md:rounded-b-xl'>
      <MobileSidebar />
      <NavbarRoutes />
    </div>
  );
}