import { Link } from '@remix-run/react'

interface MenuItem {
  title: string;
  to: string;
}

const menuItems: MenuItem[] = [
  {
    title: 'Home',
    to: '/admin',
  },
  {
    title: 'Players',
    to: '/admin/players',
  },
]

export const AdminHeader = () => (
  <header>
    <h1>Local admin</h1>
    <p>Use this tool to interact with the local database.</p>
    <nav>
      <ul>
        {menuItems.map((menuItem) => (
          <li key={menuItem.title}>
            <Link
              to={menuItem.to}
              title={menuItem.title}
            >
              <span>{menuItem.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  </header>
)
