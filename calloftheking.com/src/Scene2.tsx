import { motion } from 'framer-motion'

function Scene2({ onNext }: any) {
  return (
    <motion.div
      transition={{ duration: 1 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="flex flex-col items-center justify-center w-full mt-8">
        <img
          src="/images/scene2.png"
          width="25%"
          alt="Scene 1"
          className="rounded-lg"
        />
        <div className="mt-8 font-display text-4xl uppercase">
          Collect more than
          {' '}
          <span className="text-deep-red">200 cards</span>
        </div>
        <div className="mt-8 max-w-xl">
          In Call of the King, players can
          {' '}
          <span className="text-deep-red">collect cards</span>
          {' '}
          that represent spells or items to aid them in their quests.
          These cards can be earned by completing quests or trading with other players.
          Each card can help players in different situations, such as defeating monsters or solving puzzles.
          With many different cards to collect, players can create their own strategies for success.
        </div>
        <button
          className="bg-deep-red text-white px-4 py-2 rounded mt-10"
          onClick={onNext}
          type="button"
        >
          Continue
        </button>
      </div>
    </motion.div>
  )
}

export default Scene2
