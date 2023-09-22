import Link from "next/link"

const FooterLink = ({links,headtext}) => {
  return (
    <div>
      <h5 className="pb-2 text-[18px] font-semibold underline underline-offset-2">{headtext}</h5>
      <div className="flex flex-col">
        {links.map(({title,link}) => <Link className="hover:text-sky-800" key={title} href={link}>{title}</Link>)}
      </div>
    </div>
  )
}

export default FooterLink