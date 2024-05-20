export const handleScroll = (scrollableElement, lastScrollY, setLastScrollY, setShowHeader) => {
    console.log('here')
    console.log(scrollableElement.scrollY)
    const currWindowScroll = scrollableElement.scrollY;

    if (currWindowScroll > lastScrollY) {
        setShowHeader(false)
    }
    else {
        setShowHeader(true)
    }
    setLastScrollY(currWindowScroll)
    return
}
