import { Outlet } from '@remix-run/react'

import { AdminHeader } from '~/shared/admin-header.component'

export default function AdminRoute () {
  if (process.env.NODE_ENV !== 'development') {
    return null
  }

  return (
    <section>
      <AdminHeader />
      <Outlet />
    </section>
  )
}
