import { DexieDebug } from './database/DbDebug'
import { DexiePlayground } from './database/TestDb'

function App() {
  return (
    <>
      <p>Salut c'est Quill</p>
      <DexieDebug />
      <DexiePlayground />
    </>
  )
}

export default App
