import type { ActionFunction, LoaderFunction } from '@remix-run/node'
import { json, redirect } from '@remix-run/node'
import { Link, Outlet, useLoaderData } from '@remix-run/react'

import { db } from '~/utils/db.server'
import type { Player } from '~/models'

type LoaderData = { player: Player }

export const loader: LoaderFunction = async ({ params }) => {
  const player = await db.player.findUnique({
    where: { id: params.playerId },
    include: {
      networks: true,
    },
  })
  if (!player) {
    throw new Error('Page not found')
  }
  const data: LoaderData = { player }
  return json(data)
}

export const action: ActionFunction = async ({ request, params }) => {
  const form = await request.formData()

  if (form.get('_method') === 'delete') {
    await db.player.delete({
      where: {
        id: params.playerId,
      },
    })
    return redirect('/admin/players')
  } else {
    const name = form.get('name') as string
    const thumbnail = form.get('thumbnail') as string
    const description = form.get('description') as string
    const fields = { name, thumbnail, description }

    const player = await db.player.update({
      where: {
        id: params.playerId,
      },
      data: fields,
    })
    return redirect(`${player.id}`)
  }
}

export default function PlayerRoute () {
  const { player } = useLoaderData<LoaderData>()

  return (
    <div>
      <h2>Update player</h2>

      <form method="post">
        <input name="name" defaultValue={player.name}/>
        <input name="thumbnail" defaultValue={player.thumbnail}/>
        <textarea name="description" defaultValue={player.description}/>

        <input type="submit"/>
      </form>
      <form method="post">
        <input type="hidden" name='_method' value='delete'/>
        <input type="submit" value="delete"/>
      </form>

      <Link to={`/admin/players/${player.id}/network/new`}>Add network</Link>

      {player.networks && (
        <div>
          <ul>
            {player.networks.map((network) => (
              <li key={network.id}>
                <Link to={`${network.id}`}>[{network.title}] {network.handler}</Link>
              </li>
            ))}
          </ul>
          <Outlet />
        </div>
      )}
    </div>
  )
}
