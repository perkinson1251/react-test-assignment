import { Button } from '@/components/ui/Button'
import { Link } from 'react-router-dom'

const Header: React.FC = () => {
  return (
    <div className="border-b border-black flex items-center justify-center gap-5 py-5 md:flex-row flex-col">
      <Link to="/edit">
        <Button>Edit Users</Button>
      </Link>
      <Link to="/">
        <Button>Users</Button>
      </Link>
    </div>
  )
}

export { Header }
