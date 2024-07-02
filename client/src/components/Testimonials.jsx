import React from "react";

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      img: "🙎🏼‍♂️",
      name: "John Doe",
      text: "Great experience! Found the perfect home for my family.",
    },
    {
      id: 2,
      img: "👩🏻‍💼",
      name: "Jane Smith",
      text: "Highly professional and very helpful throughout the process.",
    },
    {
      id: 3,
      img: "🙎🏽‍♂️",
      name: "Michael Brown",
      text: "Excellent service! Will recommend to others.",
    },
  ];

  return (
    <section id="testimonials" className="py-12 px-3 bg-[#F8F9FA]">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
          What Our Clients Say
        </h2>
        <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="text-center p-4 mx-6">
              <span className="text-[10rem]">{testimonial.img}</span>
              <p className="text-gray-600 italic">"{testimonial.text}"</p>
              <h3 className="mt-4 text-xl font-bold">{testimonial.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
