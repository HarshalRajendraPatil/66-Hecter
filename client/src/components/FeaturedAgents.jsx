import React from "react";

const FeaturedAgents = () => {
  const agents = [
    // Dummy data for agents
    {
      id: 1,
      name: "Agent 1",
      image: "./mission.jpeg",
      contact: "contact@agent1.com",
    },
    {
      id: 2,
      name: "Agent 2",
      image: "./mission.jpeg",
      contact: "contact@agent2.com",
    },
    {
      id: 3,
      name: "Agent 3",
      image: "./mission.jpeg",
      contact: "contact@agent3.com",
    },
    {
      id: 4,
      name: "Agent 4",
      image: "./mission.jpeg",
      contact: "contact@agent4.com",
    },
  ];

  return (
    <section id="agents" className="py-12 bg-[#F8F9FA]">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
          Featured Agents
        </h2>
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {agents.map((agent) => (
            <div key={agent.id} className="text-center p-4">
              <img
                src={agent.image}
                alt={agent.name}
                className="w-24 h-24 rounded-full mx-auto"
              />
              <h3 className="mt-4 text-xl font-bold">{agent.name}</h3>
              <p className="mt-2 text-gray-600">{agent.contact}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedAgents;
