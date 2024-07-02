import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { Skeleton } from "@mui/material";

const HeroSection = () => {
  const [bannerProperties, setBannerProperties] = useState([]);
  const [currentImage, setCurrentImage] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleNext = () => {
    if (currentImage <= bannerProperties.length - 1)
      setCurrentImage((e) => e + 1);
  };

  const handlePrevious = () => {
    if (currentImage > 0) setCurrentImage((e) => e - 1);
  };

  useEffect(() => {
    const fetchBannerProperties = async () => {
      try {
        setLoading(true);
        const res = await axios.get("/properties");
        setBannerProperties(res.data.data.properties);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    fetchBannerProperties();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentImage >= bannerProperties.length - 1) setCurrentImage(0);
      handleNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [bannerProperties, currentImage]);

  return (
    <section className="w-full h-full z-10">
      <div className="flex min-h-full md:max-h-[80vh] overflow-hidden">
        {bannerProperties.map((data, index) => {
          return loading ? (
            <Skeleton
              sx={{ bgcolor: "grey" }}
              variant="rectangular"
              width={1200}
              height={700}
              key={index}
            />
          ) : (
            <div
              className="min-w-full min-h-[700px] lg:min-h-full overflow-hidden relative group"
              style={{
                transform: `translateX(-${currentImage * 100}%)`,
                transition: "all .7s ease-in-out",
              }}
              key={index}
            >
              <div className="w-full h-full">
                <img
                  src={data?.media?.images?.[0]?.url}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-full h-full absolute hidden top-0 items-center justify-between px-4 lg:flex">
                <button
                  className="bg-[#001F3F] p-1 rounded-full text-xl z-10 text-white"
                  onClick={handlePrevious}
                >
                  <FaAngleLeft />
                </button>
                <button
                  className="bg-[#001F3F] p-1 rounded-full text-xl z-10 text-white"
                  onClick={handleNext}
                >
                  <FaAngleRight />
                </button>
              </div>
              <div className="absolute top-0 w-full h-full bg-gradient-to-t from-[#F8F9FA] to-transparent"></div>
              <div className="container mx-auto">
                <div className="absolute bottom-0 max-w-md px-3">
                  <h2 className="font-bold text-xl md:text-2xl lg:text-4xl text-black drop-shadow-2xl">
                    {data.title}
                  </h2>
                  <p className="text-ellipsis line-clamp-3 my-2">
                    {data.overview}
                  </p>
                  <div className="flex items-center gap-4">
                    <p>Rating: {Number(data.averageRating).toFixed(1)}</p>
                  </div>
                  <Link to={`/properties/${data._id}`}>
                    <button className="bg-[#001F3F] px-4 py-2 text-white font-bold rounded mt-4 hover:bg-gold hover:text-black shadow-md transition-all hover:scale-105">
                      View Property
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default HeroSection;
