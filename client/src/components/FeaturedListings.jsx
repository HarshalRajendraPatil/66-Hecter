import React from "react";
import HorizontalScrollBar from "./HorizontalScrollBar";
import useFetch from "../hooks/useFetch";
import SkeletonColor from "./Skeleton";
import LoadingSpinner from "./LoadingSpinner";

const FeaturedListings = () => {
  const { data: topRated, status: topRatedPropStatus } = useFetch(
    "/analytics/top-rated"
  );
  const { data: expensive, status: expensivPropStatus } = useFetch(
    "/analytics/most-expensive"
  );
  const { data: sell, status: sellPropStatus } = useFetch(
    "/analytics/sell-properties"
  );
  const { data: rent, status: rentPropStatus } = useFetch(
    "/analytics/rent-properties"
  );
  const { data: mostViewed, status: mostViewedPropStatus } = useFetch(
    "/analytics/most-viewed"
  );

  return (
    <section id="listings" className="py-12 bg-[#F8F9FA]">
      {topRatedPropStatus === "loading" ? (
        <LoadingSpinner />
      ) : topRatedPropStatus === "failed" ? (
        <p>Failed to load properties.</p>
      ) : (
        topRated.length > 0 && (
          <HorizontalScrollBar
            data={topRated}
            heading={"Top Rated Properties"}
          />
        )
      )}
      {expensivPropStatus === "loading" ? (
        <LoadingSpinner />
      ) : expensivPropStatus === "failed" ? (
        <p>Failed to load properties.</p>
      ) : (
        expensive.length > 0 && (
          <HorizontalScrollBar
            data={expensive}
            heading={"Most Expensive Properties"}
          />
        )
      )}
      {sellPropStatus === "loading" ? (
        <LoadingSpinner />
      ) : sellPropStatus === "failed" ? (
        <p>Failed to load properties.</p>
      ) : (
        sell.length > 0 && (
          <HorizontalScrollBar data={sell} heading={"Best Properties to buy"} />
        )
      )}
      {rentPropStatus === "loading" ? (
        <LoadingSpinner />
      ) : rentPropStatus === "failed" ? (
        <p>Failed to load properties.</p>
      ) : (
        rent.length > 0 && (
          <HorizontalScrollBar
            data={rent}
            heading={"Best Properties to rent"}
          />
        )
      )}
      {mostViewedPropStatus === "loading" ? (
        <LoadingSpinner />
      ) : mostViewedPropStatus === "failed" ? (
        <p>Failed to load properties.</p>
      ) : (
        mostViewed.length > 0 && (
          <HorizontalScrollBar
            data={mostViewed}
            heading={"Most Viewed Properties"}
          />
        )
      )}
    </section>
  );
};

export default FeaturedListings;
