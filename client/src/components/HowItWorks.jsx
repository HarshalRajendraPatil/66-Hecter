import React from "react";

const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      icon: "🔍",
      title: "Search",
      description: "Find the perfect property that meets your needs.",
    },
    {
      id: 2,
      icon: "🏠",
      title: "Select",
      description: "Choose from a wide range of properties available.",
    },
    {
      id: 3,
      icon: "📞",
      title: "Contact",
      description: "Get in touch with the property owner or agent.",
    },
    {
      id: 4,
      icon: "📝",
      title: "Buy/Rent",
      description: "Complete the process and move into your new place.",
    },
  ];

  return (
    <section id="how-it-works" className="py-12 bg-white">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
          How It Works
        </h2>
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <div
              key={step.id}
              className="text-center bg-[#F8F9FA]  p-4 shadow-lg mx-6 rounded-md"
            >
              <div className="text-6xl mb-4">{step.icon}</div>
              <h3 className="text-xl font-bold">{step.title}</h3>
              <p className="mt-2 text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
