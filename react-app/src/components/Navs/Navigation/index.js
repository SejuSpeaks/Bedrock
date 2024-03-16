import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import logo2 from './logo2.png'
import { useHistory } from 'react-router-dom';

function Navigation({ isLoaded }) {
	const sessionUser = useSelector(state => state.session.user);
	const history = useHistory()

	return (
		<div className='nav-container'>
			<div className='nav-left'>
				<div className='nav-logo-container'>
					{/* <img className='site-logo-img' src={logo2} onClick={() => history.push('/')} /> */}
					<p onClick={() => history.push('/')} className='nav-logo-name'>BedRock</p>
				</div>
				{/* <div className='search-container'>
					<input className='search-bar' type='text' placeholder='Search and discover music' />
					<div className='search-icon'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							width='14'
							height='14'
							viewBox='0 0 24 24'
							fill='none'
							stroke='currentColor'
							strokeWidth='2'
							strokeLinecap='round'
							strokeLinejoin='round'
						>
							<circle cx='11' cy='11' r='8'></circle>
							<line x1='21' y1='21' x2='16.65' y2='16.65'></line>
						</svg>
					</div>
				</div> */}

			</div>

			<div className='nav-right'>

				<ul>

					{!sessionUser && (
						<div className='sign-up-buttons'>
							<NavLink className='navlink' to='/login'>Log in</NavLink>
							<NavLink className='navlink' to='/signup'>Sign up</NavLink>
						</div>
					)}

					{isLoaded && sessionUser && (
						<div className='logged-in-links-nav'>
							{sessionUser.artist_account && (

								<div onClick={() => history.push('/albums/new')}>
									<i className="fa-solid fa-square-plus fa-xl upload-album-container" style={{ "color": "#4c72e7" }}></i>
								</div>
							)}

							<div onClick={() => history.push('/current')} className='upload-album-container'>
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="25" height="25">
									<path fill="none" stroke="#FFFFFF" stroke-width="2" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
								</svg>


							</div>

							<div>
								<ProfileButton isLoaded={isLoaded} user={sessionUser} />
							</div>
						</div>

					)}
				</ul>
			</div>
		</div>
	);
}

export default Navigation;
