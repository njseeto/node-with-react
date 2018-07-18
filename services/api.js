// function fetchAlbums(){
//     fetch('https://rallycoding.herokuapp.com/api/music_albums') // fetch returns a promise
//     .then(res => res.json()) // res.json() allows you to read the data in the promise (the response object)
//     .then(json => console.log(json)) // this returns the json object that we care about and can now do what we want with it.
// }

async function fetchAlbums(){ // async tells the application that the following function contains some asynchronous code
    const res = await fetch('https://rallycoding.herokuapp.com/api/music_albums')
    const json = await (res => res.json())
    console.log(json)
}
fetchAlbums()
