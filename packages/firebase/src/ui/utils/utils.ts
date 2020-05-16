export const getUrlSearch = () => {
    let search = (window.location.search).replace('?', '');
    if (search.length === 0) {
        search = "room-"+ (new Date).getTime();
        // @ts-ignore
        window.location = `${window.location}?${search}`;
    }
    return search;
}

export const showInfoAlert = (text: string) => {
    console.info(`showing info alert: ${text}`);
    alert(text);
}

export const showErrorAlert = (text: string) => {
    console.error(`showing error alert: ${text}`);
    alert(text);
}
