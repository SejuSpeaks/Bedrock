import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import logo2 from './bedrock.png'
import { useHistory } from 'react-router-dom';

function Navigation({ isLoaded }) {
	const sessionUser = useSelector(state => state.session.user);
	const history = useHistory()

	return (
		<div className='w-full'>
			<div className='bg-gray-300 h-5 '></div>
			<ul className='text-white flex justify-evenly h-10 items-center cursor-pointer p-6'>
				<a href='/'><li className='hover:text-secondary hover:cursor-pointer'>Home</li></a>
				<li className='hover:text-secondary'>Trending</li>
				<li className='hover:text-secondary'>Music</li>
				<a href='/current'><li className='hover:text-secondary'>Profile</li></a>
			</ul>

		</div>
	);
}

export default Navigation;
