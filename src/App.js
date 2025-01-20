import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import { Carousel } from "react-responsive-carousel";
import FormattedLandPrice from "./FormattedDetails";
const LandList = () => {
  const [lands, setLands] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchLands = async () => {
    try {
      const response = await axios.get(
       `https://prod-be.1acre.in/lands/?division=24&page_size=10&page=${page}&ordering=-updated_at`
      );
      const data = response.data.results;
      if (data.length > 0) {
        setLands((prevLands) => [...prevLands, ...data]);
        setPage((prevPage) => prevPage + 1);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching lands:", error);
    }
  };

  useEffect(() => {
    fetchLands();
  }, []);

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