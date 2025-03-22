import LeftSidebar from '../../components/LeftSidebar'
import MainContent from '../../components/MainContent'
import RightSidebar from '../../components/RightSidebar'

export default function Home() {
  return (
    <>
      <div className='bg-black text-white'>
        <div className='flex min-h-screen justify-center md:gap-x-8 md:px-4'>
          {/* Sidebar */}
          <LeftSidebar />
          {/* Main Content */}
          <MainContent />
          {/* Right Sidebar */}
          <RightSidebar />
        </div>
      </div>
    </>
  )
}
