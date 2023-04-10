import { doc, setDoc } from 'firebase/firestore'
import { nanoid } from 'nanoid'

import { UserType } from '~types'

import { db } from '~firebase'

async function sendSignupEmail(user: UserType) {
  if (!user.email) {
    console.log('No user email: cannot send signup email')

    return null
  }

  await setDoc(doc(db, 'emails', nanoid()), {
    to: user.email,
    message: {
      subject: 'Welcome to Call of the King!',
      text: `Hi!

Welcome to Call of the King!

We're excited to have you on board. If you have any question about the game, please reply to this email.

Best,

Libe10 from Call of the King`,
    },
  })
}

export default sendSignupEmail
