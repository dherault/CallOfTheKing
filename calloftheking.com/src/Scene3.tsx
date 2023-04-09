import { motion } from 'framer-motion'
import { useCallback, useState } from 'react'
import { doc, setDoc } from 'firebase/firestore'
import { nanoid } from 'nanoid'

import { db } from './firebase'

function Scene3() {
  const [email, setEmail] = useState('')
  const [success, setSuccess] = useState(false)

  const handleSubmit = useCallback(async (event: any) => {
    event.preventDefault()

    const id = nanoid()

    await setDoc(doc(db, 'leads', id), {
      id,
      email,
    })

    setSuccess(true)
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
          alt="Scene 1"
          className="rounded-lg w-2/3 md:w-1/4"
        />
        <div className="mt-8 font-display text-4xl uppercase">
          Start your
          {' '}
          <span className="text-deep-red">journey</span>
          {' '}
          now
        </div>
        <div className="mt-8 max-w-xl">
          Call of the King will release around the middle of 2023. Let us know your email so we can contact you when it launches.
          {' '}
          <span className="text-deep-red">No spam, promise</span>
          .
        </div>
        {!success && (
          <form
            className="flex gap-2 mt-10 flex-wrap"
            onSubmit={handleSubmit}
          >
            <input
              className="p-2 border border-deep-red bg-slate-900 rounded flex-shrink"
              style={{ width: 256 }}
              placeholder="hero@castle.com"
              value={email}
              onChange={event => setEmail(event.target.value)}
              autoComplete="email"
              name="email"
              type="email"
            />
            <button
              className="bg-deep-red text-white px-4 py-2 rounded flex-shrink-0"
              type="submit"
            >
              Alert me
            </button>
          </form>
        )}
        {success && (
          <div className="mt-10 text-center">
            Thank you! We will contact you when the game launches.
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default Scene3
