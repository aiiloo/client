import { useSelector } from 'react-redux'
import Spinner from '../../components/Spinner'
import { RootState } from '../../store'
import LeftSidebar from '../../components/LeftSidebar'

interface Props {
  children: React.ReactNode
}

export default function MainLayout({ children }: Props) {
  const spinner = useSelector((state: RootState) => state.spinner.isloading)
  return (
    <>
      <div className='bg-black text-white'>
        <div className='flex min-h-screen justify-center md:gap-x-8 md:px-4'>
          {/* Sidebar */}
          <LeftSidebar />
          {children}
          {spinner && <Spinner />}
        </div>
      </div>
    </>
  )
}
