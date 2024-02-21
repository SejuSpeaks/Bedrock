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
					<p className='nav-logo-name'>BedRock</p>
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
							<div onClick={() => history.push('/current')} className='upload-album-container'>
								<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402m5.726-20.583c-2.203 0-4.446 1.042-5.726 3.238-1.285-2.206-3.522-3.248-5.719-3.248-3.183 0-6.281 2.187-6.281 6.191 0 4.661 5.571 9.429 12 15.809 6.43-6.38 12-11.148 12-15.809 0-4.011-3.095-6.181-6.274-6.181" /></svg>


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
