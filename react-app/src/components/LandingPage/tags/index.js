import './index.css'

//dispatch selected tab
//if tagname == selectedTab set active class
const Tags = ({ tags, selectedTab, setSelectedTab }) => {

    const tagClicked = (name) => {
        setSelectedTab(name)
    }

    const displayTags = Object.values(tags).map(tag => {
        return (
            <button key={tag.id} className={selectedTab == tag.name ? 'genre-tab-active' : 'genre-tab'} onClick={() => tagClicked(tag.name)}>{tag.name}</button>
        );
    })



    return (
        <div className='tabs-container-landing-page'>
            {displayTags}
        </div>
    );
}

export default Tags;
