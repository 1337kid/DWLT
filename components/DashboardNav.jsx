"use client"
import { dashboardLinks } from "@/constants"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { faCreditCard,faHouse, faClockRotateLeft } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const icons = {'home':faHouse,'pay':faCreditCard,'history':faClockRotateLeft}

const DashboardNav = () => {
  const pathname = usePathname()
  return (
    <div className="bg-slate-100 w-full p-2 rounded-md flex justify-between">
      {dashboardLinks.map((link) => (
        <Link className="w-full" key={link.link} href={link.link}>
          <div className={`flex flex-row gap-3 justify-center items-center mx-5 py-2 rounded-md max-sm:mx-2 ${pathname === link.link ? 'bg-slate-200' : ''}`}>
          <FontAwesomeIcon icon={icons[link.icon]}/>
            <div className="max-sm:hidden">
              {link.title}
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default DashboardNav