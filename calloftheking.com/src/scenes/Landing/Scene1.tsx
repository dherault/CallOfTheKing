import { motion } from 'framer-motion'

function Scene1({ onNext }: any) {
  return (
    <motion.div
      transition={{ duration: 1 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="flex flex-col items-center justify-center w-full mt-8">
        <img
          src="/images/scene1.png"
          width="33%"
          alt="Scene 1"
          className="rounded-lg w-2/3 md:w-1/3"
        />
        <div className="mt-8 font-display text-4xl uppercase">
          An
          {' '}
          <span className="text-primary-500">IRL RPG</span>
          {' '}
          where you are the hero
        </div>
        <div className="mt-8 max-w-xl">
          Call of the King is a unique multiplayer role-playing game that takes place in the real world.
          Players choose one of eight classes with unique skills and attributes, and complete quests that range from puzzles and sports to charity events and historical tours.
          By emphasizing
          {' '}
          <span className="text-primary-500">exploration of the real world</span>
          , the game offers an immersive and unparalleled gaming experience.
        </div>
        <button
          className="bg-primary-500 text-white px-4 py-2 rounded mt-10"
          onClick={onNext}
          type="button"
        >
          Continue
        </button>
      </div>
    </motion.div>
  )
}

export default Scene1
