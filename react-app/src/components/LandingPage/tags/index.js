import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGetTags } from "../../../store/tags";
import { useHistory } from "react-router-dom";

import './index.css'
import { fetchAlbumsByTag } from "../../../store/albums";

//dispatch selected tab
//if tagname == selectedTab set active class
const Tags = ({ tags, selectedTab, setSelectedTab }) => {

    const tagClicked = (name) => {
        setSelectedTab(name)
    }

    const displayTags = Object.values(tags).map(tag => {
        return (
            <button className={selectedTab == tag.name ? 'genre-tab-active' : 'genre-tab'} onClick={() => tagClicked(tag.name)}>{tag.name}</button>
        );
    })



    return (
        <div>
            {displayTags}
        </div>
    );
}

export default Tags;
