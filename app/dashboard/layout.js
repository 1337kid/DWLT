import { DashboardNav } from "@/components"

export const metadata = {
  title: 'DWLT | Dashboard',
  description: 'A digital wallet',
}

export default function RootLayout({ children }) {

  return (
    <div className='flex justify-center max-md:px-2 py-2 bg-slate-200'>
    <div className='w-11/12 max-md:w-full flex p-2'>
      <div className="w-full">
        <DashboardNav/>
        {children}
      </div>
    </div>
  </div>
  )
}
