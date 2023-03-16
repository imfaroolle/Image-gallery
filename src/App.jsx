import { useState, useEffect } from "react";
import ImageCard from "./components/imageCard";
import ImageSearch from "./components/ImageSearch";

function App() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [term, setTerm] = useState("");
  
  useEffect(() => {
    fetch(
      `https://pixabay.com/api/?key=${import.meta.env.VITE_REACT_APP_PIXABAY_API}&q=${term}&image_type=photo&pretty=true`
    )
      .then((res) => res.json())
      .then((data) => {
        setImages(data.hits);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, [term]);

  return (
    <div className="container mx-auto">
      <ImageSearch searchText={text => setTerm(text)} />
      {!isLoading && images.length === 0 && <h1 className="text-6xl text-center mx-auto mt-32"> No Images Found, Please Search with Another Term</h1>}
      {isLoading ? <h1 className="text-6xl text-center mx-auto mt-32"> Loading...</h1> : <div className="grid grid-cols-3 gap-4">
        {images.map(image => {
          return (
            <ImageCard key={image.id} image={image} />
          )
        })}
      </div>}
</div>
  );
}

export default App;