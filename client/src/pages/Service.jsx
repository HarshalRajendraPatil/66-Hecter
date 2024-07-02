import React from "react";

const Services = () => {
  return (
    <div className="bg-lightBeige text-darkGray">
      <div className="bg-navyBlue text-white p-4 m-5 text-center mt-[6rem]">
        <h1 className="text-3xl font-bold">Our Services</h1>
      </div>
      <div className="container mx-auto p-8">
        <section className="mb-[5rem]">
          <div className="flex flex-wrap md:flex-nowrap items-center">
            <img
              src="./buyProperty.jpeg"
              alt="Property Buying"
              className="w-full md:w-1/2 object-contain"
            />
            <div className="md:ml-8 mt-4 md:mt-0 md:w-1/2">
              <h2 className="text-2xl font-bold text-navyBlue">
                Property Buying
              </h2>
              <p className="mt-2 text-lg">
                We offer a comprehensive range of properties for sale, catering
                to all budgets and preferences. Our team of experts will guide
                you through the process to ensure a smooth and successful
                purchase.
              </p>
            </div>
          </div>
        </section>
        <section className="mb-[5rem]">
          <div className="flex flex-wrap md:flex-nowrap items-center">
            <div className="md:mr-8 mt-4 md:mt-0 md:w-1/2 order-last md:order-first">
              <h2 className="text-2xl font-bold text-navyBlue">
                Property Renting
              </h2>
              <p className="mt-2 text-lg">
                Explore a variety of rental properties to suit your needs. From
                short-term rentals to long-term leases, we have options
                available in prime locations to fit your lifestyle.
              </p>
            </div>
            <img
              src="./rentProperty.png"
              alt="Property Renting"
              className="w-full md:w-1/2 object-contain"
            />
          </div>
        </section>
        <section className="mb-[5rem]">
          <div className="flex flex-wrap md:flex-nowrap items-center">
            <img
              src="./sellProperty.png"
              alt="Property Selling"
              className="w-full md:w-1/2 object-contain"
            />
            <div className="md:ml-8 mt-4 md:mt-0 md:w-1/2">
              <h2 className="text-2xl font-bold text-navyBlue">
                Property Selling
              </h2>
              <p className="mt-2 text-lg">
                Selling your property has never been easier. Our team provides
                expert market analysis, professional photography, and strategic
                marketing to help you get the best price for your property.
              </p>
            </div>
          </div>
        </section>
        <section className="mb-12">
          <div className="flex flex-wrap md:flex-nowrap justify-between items-center">
            <div className="md:mr-8 mt-4 md:mt-0 md:w-1/2 order-last md:order-first">
              <h2 className="text-2xl font-bold text-navyBlue">
                Property Management
              </h2>
              <p className="mt-2 text-lg">
                Our property management services include tenant screening, rent
                collection, maintenance, and more. Let us handle the day-to-day
                operations while you enjoy the benefits of property ownership.
              </p>
            </div>

            <img
              src="manageProperty.png"
              alt="Property Management"
              className="w-full md:w-1/2 object-contain"
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default Services;
