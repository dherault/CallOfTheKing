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
    <div className="p-6 bg-slate-800 h-full min-h-screen text-white relative flex flex-col">
      <h1 className="font-display text-4xl">
        Call of the
        {' '}
        <span className="text-deep-red">King</span>
      </h1>
      <div className="absolute top-8 right-8 w-64 h-64 hidden md:block">
        <Dots />
      </div>
      <div className="absolute bottom-8 left-8 w-64 h-64 hidden md:block">
        <Dots reversed />
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
          />
        )}
      </AnimatePresence>
      <div className="flex-grow" />
      <div className="text-xs text-gray-400 mt-10 self-center md:self-end">
        Copyright &copy;
        {' '}
        {new Date().getFullYear()}
        {' '}
        Call of the King SAS and David Hérault.
      </div>
    </div>
  )
}

export default App
