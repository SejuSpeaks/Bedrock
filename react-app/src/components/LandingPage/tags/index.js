<<<<<<< HEAD
<<<<<<< HEAD
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGetTags } from "../../../store/tags";
import { useHistory } from "react-router-dom";

import './index.css'
import { fetchAlbumsByTag } from "../../../store/albums";
=======
import './index.css'
>>>>>>> 207fad1617ac56749c0160b847c7270a1a1343a3
=======
import './index.css'
>>>>>>> 7b101935324880b3d94c82a8fe5a306252da7140

//dispatch selected tab
//if tagname == selectedTab set active class
const Tags = ({ tags, selectedTab, setSelectedTab }) => {

    const tagClicked = (name) => {
        setSelectedTab(name)
    }

    const displayTags = Object.values(tags).map(tag => {
        return (
<<<<<<< HEAD
<<<<<<< HEAD
            <button className={selectedTab == tag.name ? 'genre-tab-active' : 'genre-tab'} onClick={() => tagClicked(tag.name)}>{tag.name}</button>
=======
            <button key={tag.id} className={selectedTab == tag.name ? 'genre-tab-active' : 'genre-tab'} onClick={() => tagClicked(tag.name)}>{tag.name}</button>
>>>>>>> 207fad1617ac56749c0160b847c7270a1a1343a3
=======
            <button key={tag.id} className={selectedTab == tag.name ? 'genre-tab-active' : 'genre-tab'} onClick={() => tagClicked(tag.name)}>{tag.name}</button>
>>>>>>> 7b101935324880b3d94c82a8fe5a306252da7140
        );
    })



    return (
        <div className='tabs-container-landing-page'>
            {displayTags}
        </div>
    );
}

export default Tags;
