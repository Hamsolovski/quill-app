import { useNavigate } from 'react-router'

export default function BackButton() {
  const navigate = useNavigate()
  return <button onClick={() => navigate(-1)}>Retour</button>
}
