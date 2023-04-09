import { motion } from 'framer-motion'
import { useCallback, useState } from 'react'

function Scene3() {
  const [email, setEmail] = useState('')

  const handleSubmit = useCallback((event: any) => {
    event.preventDefault()

    console.log(email)
  }, [email])

  return (
    <motion.div
      transition={{ duration: 1 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="flex flex-col items-center justify-center w-full mt-8">
        <img
          src="/images/scene3.png"
          width="25%"
          alt="Scene 1"
          className="rounded-lg"
        />
        <div className="mt-8 font-display text-4xl uppercase">
          Start your
          {' '}
          <span className="text-deep-red">journey</span>
          {' '}
          now
        </div>
        <div className="mt-8 max-w-xl">
          HBAA will release around the middle of 2023. Let us know your email so we can contact you when it launches.
          {' '}
          <span className="text-deep-red">No spam, promise</span>
          .
        </div>
        <form
          className="flex gap-2 mt-10"
          onSubmit={handleSubmit}
        >
          <input
            className="p-2 border border-deep-red bg-slate-900 rounded"
            style={{ width: 256 }}
            placeholder="hero@castle.com"
            value={email}
            onChange={event => setEmail(event.target.value)}
          />
          <button
            className="bg-deep-red text-white px-4 py-2 rounded"
            type="submit"
          >
            Alert me
          </button>
        </form>
      </div>
    </motion.div>
  )
}

export default Scene3
