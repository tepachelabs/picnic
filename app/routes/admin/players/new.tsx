import type { ActionFunction } from '@remix-run/node'
import { redirect } from '@remix-run/node'

import { db } from '~/utils/db.server'

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData()
  const name = form.get('name') as string
  const thumbnail = form.get('thumbnail') as string
  const description = form.get('description') as string
  const fields = { name, thumbnail, description }

  const player = await db.player.create({
    data: fields,
  })
  return redirect(`${player.id}`)
}

export default function PlayerRoute () {
  return (
    <div>
      <h2>New player</h2>

      <form method="post">
        <input name="name"/>
        <input name="thumbnail"/>
        <textarea name="description"/>

        <input type="submit"/>
      </form>
    </div>
  )
}
