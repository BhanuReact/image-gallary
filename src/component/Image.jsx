import React from "react";

const Image = (props) => {

  const toDataURL=(url)=> {
      return fetch(url).then((response) => {
              return response.blob();
          }).then(blob => {
              return URL.createObjectURL(blob);
          });
  }
  
  
  const  download=async(url)=> {
          const a = document.createElement("a");
          a.href = await toDataURL(url);
          a.download = "myImage.jpg";
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
  }
  const { tags, webformatURL,largeImageURL } = props;

  return (
    <>
      <div className="row">
        <div className="col px-0">
          <div className="rounded-lg overflow-hidden">
            <img
              src={webformatURL}
              className="img-fluid "
              alt={tags}
              onClick={()=>download(largeImageURL)}
            ></img>
          </div>
        </div>
      </div>
    </>
  );
};

export default Image;
