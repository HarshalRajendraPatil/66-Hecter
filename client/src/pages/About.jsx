import React from "react";

const About = () => {
  return (
    <div className="bg-lightBeige text-darkGray">
      <div className="container mx-auto p-6">
        <section className="bg-navyBlue text-white py-8 px-6 text-center mb-10 mt-[4rem] ">
          <h1 className="text-4xl font-bold mb-4">About Us</h1>
          <p className="text-lg">
            Discover our story and meet the team behind our success.
          </p>
        </section>

        <section className="about-us py-8">
          <div className="text-center mb-4">
            <h2 className="text-3xl font-bold text-navyBlue">Who We Are</h2>
            <p className="mt-4 text-lg">
              We are a leading real estate company with a passion for helping
              people find their dream homes.
            </p>
          </div>
          <div className="flex flex-wrap justify-center">
            <div className="w-full md:w-1/2 lg:w-1/3 p-4">
              <img
                src="./Team.jpeg"
                alt="Our Team"
                className="w-full rounded-lg shadow-lg mb-4 h-[20rem] object-cover"
              />
              <h3 className="text-2xl font-bold">Our Team</h3>
              <p className="mt-2">
                Our dedicated team of professionals is committed to providing
                exceptional service and support.
              </p>
            </div>
            <div className="w-full md:w-1/2 lg:w-1/3 p-4">
              <img
                src="./mission.jpeg"
                alt="Our Mission"
                className="w-full rounded-lg shadow-lg mb-4 h-[20rem] object-cover"
              />
              <h3 className="text-2xl font-bold">Our Mission</h3>
              <p className="mt-2">
                We aim to revolutionize the real estate industry by offering
                innovative solutions and unparalleled customer service.
              </p>
            </div>
          </div>
        </section>

        <section className="values bg-gray-100 py-8">
          <div className="text-center mb-4">
            <h2 className="text-3xl font-bold text-navyBlue">Our Values</h2>
            <p className="mt-4 text-lg">
              Integrity, excellence, and customer satisfaction are at the core
              of everything we do.
            </p>
          </div>
          <div className="flex flex-wrap justify-center">
            <div className="w-full md:w-1/2 lg:w-1/4 p-4">
              <div className="bg-white min-h-[15rem] p-6 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold mb-2">Integrity</h3>
                <p className="text-lg">
                  We uphold the highest standards of integrity in all our
                  actions.
                </p>
              </div>
            </div>
            <div className="w-full md:w-1/2 lg:w-1/4 p-4">
              <div className="bg-white min-h-[15rem] p-6 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold mb-2">Excellence</h3>
                <p className="text-lg">
                  We strive for excellence in everything we do.
                </p>
              </div>
            </div>
            <div className="w-full md:w-1/2 lg:w-1/4 p-4">
              <div className="bg-white min-h-[15rem] p-6 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold mb-2">
                  Customer Satisfaction
                </h3>
                <p className="text-lg">
                  We are dedicated to meeting our customers' needs and exceeding
                  their expectations.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="contact-us py-8">
          <div className="text-center mb-4">
            <h2 className="text-3xl font-bold text-navyBlue">Contact Us</h2>
            <p className="mt-4 text-lg">
              We would love to hear from you! Feel free to reach out with any
              questions or inquiries.
            </p>
          </div>
          <div className="flex flex-wrap justify-center">
            <div className="w-full md:w-1/2 lg:w-1/3 p-4">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="md:text-2xl text-xl font-bold mb-2">Email Us</h3>
                <p className="md:text-lg text-sm">info@realestateapp.com</p>
              </div>
            </div>
            <div className="w-full md:w-1/2 lg:w-1/3 p-4">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="md:text-2xl text-xl font-bold mb-2">Call Us</h3>
                <p className="md:text-lg text-sm">+1 234 567 890</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
