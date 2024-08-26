import { Header } from '@/components/Header'
import { Outlet } from 'react-router-dom'

const MainLayout: React.FC = () => {
  return (
    <div className="min-h-screen min-w-screen">
      <Header />
      <main className="container mx-auto mt-[80px]">
        <div className="border border-black px-[80px] py-[60px]">
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default MainLayout
