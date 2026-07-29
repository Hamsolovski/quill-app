import { Link } from 'react-router'
import BackButton from '../common/buttons/BackButton'

export default function NavBar() {
  return (
    <nav>
      <Link to="/tables">Tables</Link>
      <BackButton />
    </nav>
  )
}
