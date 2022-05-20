import React, { useEffect, useState } from "react";
import "../component/Gallary.css";
import API from "../component/API";
import Image from "../component/Image";
import Masonry from "react-masonry-css";
// import InfiniteScroll from "react-infinite-scroll-component";
import InfiniteScroll from 'react-infinite-scroller';

let pageNum = 1;
const Gallary = () => {
  const [imagesArray, setImagesArray] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  const fetchImages = (pageNumber) => {
    API.get("/", { params: { page: pageNumber } })
      .then((res) => {
        console.log(res.data);
        setImagesArray([...imagesArray, ...res.data.hits]);
        setTotalPages(res.data.totalHits / res.data.hits.length);
      })
      .catch((err) => console.log(err));
  };

  // function to fetch images based on the
  useEffect(() => {
    fetchImages(pageNum);
  }, []);

  const breakpointColumnsObj = {
    default: 6,
    1200: 3,
    992: 3,
    768: 2,
    576: 1,
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row bgImage justify-content-center">
          <div className="col-12">
            <div className="innerContent text-light text-center">
              <h1 className="mt-5">
                Stunning free images & royalty free stock
              </h1>
              <p className="mb-5">
                Over 2.6 million+ high quality stock images, videos and music
                shared by our talented community.
              </p>
            </div>
          </div>

          <div className="col-6 searchBar d-flex p-0">
            <button className="btn searchbutton rounded bg-light shadow-none border-0">
              <i className="bi bi-search"></i>
            </button>
            <input
              className="searchfield rounded shadow-none border-0 outline-0"
              type="search"
              placeholder="Search image,vectors,videos,music"
              aria-label="Search"
            />

            <select className="form-control float-end shadow-none border-0  text-center selectBox">
              <option value="image2" selected>
                Image
              </option>
              <option value="image3" selected>
                Dog
              </option>

              <option value="image4" selected>
                Cat
              </option>

              <option value="image5" selected>
                Car
              </option>
            </select>
          </div>
          <div className="col-12 text-light text-center mt-5">
            <p>
              Popular Images: background, wallpaper, nature, flowers, money,
              business, beach, flower, sky, food, dog, love, coronavirus
            </p>
            <h6 className="">Free image by ilyessuti</h6>
          </div>
        </div>
      </div>
      <div className="">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <InfiniteScroll
              dataLength={totalPages}
                pageStart={0}
                loadMore={() => fetchImages(++pageNum)}
                hasMore={pageNum < totalPages ? true : false}
              >
                <Masonry
                  breakpointCols={breakpointColumnsObj}
                  className="masonry-grid"
                  columnClassName="masonry-grid_column"
                >
                  {imagesArray.map((image) => (
                    <Image key={image.id} {...image} />
                  ))}
                </Masonry>
              </InfiniteScroll>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Gallary;
