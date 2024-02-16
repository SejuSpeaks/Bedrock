import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import Earbuds from './Earbuds.png'
import { useHistory } from 'react-router-dom';

function Navigation({ isLoaded }) {
	const sessionUser = useSelector(state => state.session.user);
	const history = useHistory()

	return (
		<div className='nav-container'>
			<div className='nav-left'>
				<div className='nav-logo-container'>
					<img src={Earbuds} onClick={() => history.push('/')} />
					<p>BedRock</p>
				</div>
				<div>
					<input placeholder='Search and discover music' />
				</div>
			</div>

			<div>

				<ul>

					{!sessionUser && (
						<>
							<li>
								<NavLink to='/login'>Log in</NavLink>
							</li>
							<li>Sign up</li>
						</>
					)}

					{isLoaded && sessionUser && (
						<div className='logged-in-links-nav'>
							{sessionUser.artist_account && (
								<div onClick={() => history.push('/albums/new')} className='upload-album-container'>
									<p>Upload</p>
									<svg clip-rule="evenodd" height={30} fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m21 3.998c0-.478-.379-1-1-1h-16c-.62 0-1 .519-1 1v16c0 .621.52 1 1 1h16c.478 0 1-.379 1-1zm-16.5.5h15v15h-15zm6.75 6.752h-3.5c-.414 0-.75.336-.75.75s.336.75.75.75h3.5v3.5c0 .414.336.75.75.75s.75-.336.75-.75v-3.5h3.5c.414 0 .75-.336.75-.75s-.336-.75-.75-.75h-3.5v-3.5c0-.414-.336-.75-.75-.75s-.75.336-.75.75z" fill-rule="nonzero" /></svg>
								</div>
							)}
							<ProfileButton isLoaded={isLoaded} user={sessionUser} />
						</div>
					)}
				</ul>
			</div>
		</div>
	);
}

export default Navigation;
