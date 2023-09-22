import { footerLinks } from "@/constants"
import { FooterLink } from "."
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInstagram,faGithub } from "@fortawesome/free-brands-svg-icons"

const Footer = () => {
  return (
    <footer className="bg-slate-400">
    <div className="flex justify-center max-md:px-2 py-10">
      <div className='w-9/12 max-md:w-full flex justify-between p-2 gap-3 max-[340px]:flex-col text-center max-sm:text-sm'>
        <FooterLink links={footerLinks.DWLT} headtext="DWLT"/>
        <FooterLink links={footerLinks.links} headtext="Links"/>
        <FooterLink links={footerLinks.company} headtext="Company"/>
      </div>
    </div>
    <div className="flex justify-center">
      <div className="w-11/12 border-t-2 border-t-slate-500 flex justify-between p-10">
        <div>&copy; 2023 DWLT</div>
        <div className="flex gap-2">
          <FontAwesomeIcon icon={faInstagram} size="xl"/>
          <FontAwesomeIcon icon={faGithub} size="xl"/>
        </div>
      </div>
    </div>
    </footer>
  )
}

export default Footer