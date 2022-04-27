import type { ActionFunction } from '@remix-run/node'
import { redirect } from '@remix-run/node'

import { db } from '~/utils/db.server'
import { NETWORKS } from '~/config'

export const action: ActionFunction = async ({ request, params }) => {
  const form = await request.formData()
  const title = form.get('title') as string
  const handler = form.get('handler') as string
  const { playerId = '' } = params
  const fields = { title, handler, playerId }

  await db.network.create({
    data: fields,
  })
  return redirect(`/admin/players/${params.playerId}`)
}

export default function NetworkEditRoute () {
  return (
    <div>
      <h4>New network</h4>

      <form method="post">
        <select name="title">
          {NETWORKS.map(network => (
            <option
              key={network}
              value={network}
            >
              {network}
            </option>
          ))}
        </select>
        <input name="handler"/>

        <input type="submit"/>
      </form>
    </div>
  )
}
