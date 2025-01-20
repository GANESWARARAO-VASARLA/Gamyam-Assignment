import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Carousel } from "react-responsive-carousel";
import FormattedLandPrice from "./FormattedDetails";
import useFetchLands from "./useFetchLands";

const LandList = () => {
  const { lands, hasMore, fetchLands } = useFetchLands();

  return (
    <div>
      <h1 className="header">Land Listings</h1>
      <div className="content">
        <InfiniteScroll
          dataLength={lands.length}
          next={fetchLands}
          hasMore={hasMore}
          loader={
            <div className="loader-container">
              <div className="loader"></div>
            </div>
          }
          endMessage={<p>No more results</p>}
        >
          <div className="land-cards">
            {lands.map((land, index) => (
              <div key={index} className="land-card">
                <Carousel
                  showThumbs={false}
                  showStatus={false}
                  infiniteLoop={true}
                  autoPlay={false}
                  dynamicHeight={true}
                >
                  {land.land_media.map((image, idx) => (
                    <div key={idx}>
                      <img
                        src={image.image}
                        alt={`Land ${index + 1} Image ${idx + 1}`}
                        style={{
                          height: "200px",
                          objectFit: "cover",
                          width: "100%",
                        }}
                      />
                    </div>
                  ))}
                </Carousel>
                <div className="address">
                  <h3>
                    <FormattedLandPrice land={land} />
                  </h3>
                  <p>
                    {land.division_info[2].name}, {land.division_info[1].name}{" "}
                    (dt)
                  </p>
                </div>
              </div>
            ))}
          </div>
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default LandList;
