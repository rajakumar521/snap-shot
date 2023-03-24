
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const searchData = useRef(null)
  const [searchText, setSearchText] = useState("mountains")
  const [imageData, setImageData] = useState([])
  useEffect(() => {

    const params = {
      method: "flickr.photos.search",
      api_key: "46580acabf8ee85086c172556eeca085",
      text: searchText,
      sort: "",
      per_page: 40,
      license: '4',
      extras: "owner_name, license",
      format: "json",
      nojsoncallback: 1
    }

    const parameters = new URLSearchParams(params);
    const url = `https://api.flickr.com/services/rest/?${parameters}`
    axios.get(url).then((resp) => {
      console.log(resp.data)
      const arr = resp.data.photos.photo.map((imgData) => {
        return fetchFlickrImageUrl(imgData, 'q')
      });
      setImageData(arr);

    }).catch(() => {

    }).finally(() => {

    })

  }, [searchText])
  const fetchFlickrImageUrl = (photo, size) => {
    let url = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}`
    if (size) {
      url += `_${size}`
    }
    url += '.jpg'
    return url
  }

  return (
    <>
      <div className='snap'>
        <h1 className='head'>Snap Shot</h1>
        <input onChange={(e) => { searchData.current = e.target.value }} value={searchData.current ? searchData.current : ""} placeholder="search" />
        <button onClick={() => { setSearchText(searchData.current) }}>Search</button>
        <section className='btn'>
          <button onClick={() => { setSearchText("mountains") }}>mountains</button>
          <button onClick={() => { setSearchText("beached") }}>Beaches</button>
          <button onClick={() => { setSearchText("birds") }}>Birds</button>
          <button onClick={() => { setSearchText("food") }}>Food</button>
        </section>
      </div>
      <section className='image-container'>

        {imageData.map((imageurl, key) => {
          return (
            <article className='flickr-image'>
              <img src={imageurl} key={key} />
            </article>
          )
        })}

      </section>
    </>
  );
}

export default App;
