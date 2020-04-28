export const getUrlSearch = () => {
    const search = (window.location.search).replace('?', '');
    console.log('room', search);
    return search;
}
