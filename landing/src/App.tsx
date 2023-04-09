import { useCallback, useState } from 'react'
import { AnimatePresence } from 'framer-motion'

import Dots from './Dots'
import Scene1 from './Scene1'
import Scene2 from './Scene2'
import Scene3 from './Scene3'

function App() {
  const [sceneIndex, setSceneIndex] = useState(0)
  const handleNext = useCallback(() => {
    setSceneIndex(x => x + 1)
    setTimeout(() => setSceneIndex(x => x + 1), 1100)
  }, [])

  return (
    <div className="p-6 bg-slate-800 h-screen text-white">
      <h1 className="font-display text-4xl">
        <span className="text-deep-red">Honor Bound, </span>
        Adventure Awaits
      </h1>
      <div className="absolute top-8 right-8 w-64 h-64">
        <Dots />
      </div>
      <div className="absolute bottom-8 left-8 w-64 h-64">
        <Dots reversed />
      </div>
      <div className="absolute bottom-8 right-8 text-xs text-gray-400">
        Copyright &copy;
        {' '}
        {new Date().getFullYear()}
        {' '}
        Honor Bound, Adventure Awaits and David Hérault.
      </div>
      <AnimatePresence>
        {sceneIndex === 0 && (
          <Scene1
            key="Scene1"
            onNext={handleNext}
          />
        )}
        {sceneIndex === 2 && (
          <Scene2
            key="Scene2"
            onNext={handleNext}
          />
        )}
        {sceneIndex === 4 && (
          <Scene3
            key="Scene3"
            onNext={handleNext}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

export default App
