import { useSelector } from 'react-redux'
import Spinner from '../../components/Spinner'
import { RootState } from '../../store'

interface Props {
  children: React.ReactNode
}

export default function MainLayout({ children }: Props) {
  const spinner = useSelector((state: RootState) => state.spinner.isloading)
  return (
    <div>
      {children}
      {spinner && <Spinner />}
    </div>
  )
}
