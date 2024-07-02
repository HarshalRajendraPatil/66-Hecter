import React from "react";
import HorizontalScrollBar from "./HorizontalScrollBar";
import useFetch from "../hooks/useFetch";
import SkeletonColor from "./Skeleton";

const FeaturedListings = () => {
  const { data: topRated, loading: topRatedLoading } = useFetch(
    "/analytics/top-rated"
  );
  const { data: expensive, loading: expensiveLoading } = useFetch(
    "/analytics/most-expensive"
  );
  const { data: sell, loading: sellLoading } = useFetch(
    "/analytics/sell-properties"
  );
  const { data: rent, loading: rentLoading } = useFetch(
    "/analytics/rent-properties"
  );
  const { data: mostViewed, loading: mostViewedLoading } = useFetch(
    "/analytics/most-viewed"
  );

  return (
    <section id="listings" className="py-12 bg-[#F8F9FA]">
      {topRatedLoading ? (
        <SkeletonColor />
      ) : (
        topRated.length > 0 && (
          <HorizontalScrollBar
            data={topRated}
            heading={"Top Rated Properties"}
          />
        )
      )}
      {expensiveLoading ? (
        <SkeletonColor />
      ) : (
        expensive.length > 0 && (
          <HorizontalScrollBar
            data={expensive}
            heading={"Most Expensive Properties"}
          />
        )
      )}
      {sellLoading ? (
        <SkeletonColor />
      ) : (
        sell.length > 0 && (
          <HorizontalScrollBar data={sell} heading={"Best Properties to buy"} />
        )
      )}
      {rentLoading ? (
        <SkeletonColor />
      ) : (
        rent.length > 0 && (
          <HorizontalScrollBar
            data={rent}
            heading={"Best Properties to rent"}
          />
        )
      )}
      {mostViewedLoading ? (
        <SkeletonColor />
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
