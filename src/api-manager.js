import store from './store'
export default async function getMoviesFromApi(filter) {
    store.dispatch({type: 'clear', payload: undefined});
    try {
        let response = await fetch('https://itunes.apple.com/search?term=' + filter + '&entity=musicVideo');
        let responseJson = await response.json();
        for (el in responseJson.results) {
            store.dispatch({type: 'musicVideo', payload: responseJson.results[el]});
        }
        return responseJson.movies;
    } catch (error) {
        console.error(error);
    }
}
