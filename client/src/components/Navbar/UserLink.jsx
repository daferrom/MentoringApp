import {Link} from 'react-router-dom'

const UserLink = ({user, handleLogout}) => {
  return (
    <li className='drop-nav'>
      <Link to='#' className='avatar'>
        <img src={user.avatar} alt='' /> {user.name}{' '}
        <i className='fas fa-angle-down'></i>
      </Link>
      <ul className='dropdown'>
        <li>
          <Link to='/profile'>Profile</Link>
        </li>
        <li>
          <Link to='/' onClick={handleLogout}>
            Logout
          </Link>
        </li>
      </ul>
    </li>
  )
}

export default UserLink