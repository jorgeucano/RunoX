export const getUrlSearch = () => {
    let search = (window.location.search).replace('?', '');
    if (search.length === 0) {
        search = "room-"+ (new Date).getTime();
        // @ts-ignore
        window.location = `${window.location}?${search}`;
    }
    return search;
}
