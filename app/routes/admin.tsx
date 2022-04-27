import { Outlet } from '@remix-run/react'
import { redirect } from '@remix-run/node'

import { AdminHeader } from '~/shared/admin-header.component'

export default function AdminRoute () {
  if (process.env.NODE_ENV !== 'development') {
    return redirect('/')
  }

  return (
    <section>
      <AdminHeader />
      <Outlet />
    </section>
  )
}
