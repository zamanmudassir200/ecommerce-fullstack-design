import React from "react";
import RecommendedItem from "./RecommendedItem";

const RecommendedItems = () => {
  const recommendedItems = [
    {
      image: "./1.png",
      price: "$10.30",
      description: "T-shirts with multiple colors, for men",
    },
    {
      image: "./1.png",
      price: "$10.30",
      description: "T-shirts with multiple colors, for men",
    },
    {
      image: "./1.png",
      price: "$10.30",
      description: "T-shirts with multiple colors, for men",
    },
    {
      image: "./1.png",
      price: "$10.30",
      description: "T-shirts with multiple colors, for men",
    },
    {
      image: "./1.png",
      price: "$10.30",
      description: "T-shirts with multiple colors, for men",
    },
    {
      image: "./1.png",
      price: "$10.30",
      description: "T-shirts with multiple colors, for men",
    },
    {
      image: "./1.png",
      price: "$10.30",
      description: "T-shirts with multiple colors, for men",
    },
    {
      image: "./1.png",
      price: "$10.30",
      description: "T-shirts with multiple colors, for men",
    },
    {
      image: "./1.png",
      price: "$10.30",
      description: "T-shirts with multiple colors, for men",
    },
    {
      image: "./1.png",
      price: "$10.30",
      description: "T-shirts with multiple colors, for men",
    },
  ];

  return (
    <section className="my-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <h1 className="font-bold text-lg sm:text-xl md:text-2xl mb-4 sm:mb-6">
        Recommended Items
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
        {recommendedItems.map((item, index) => (
          <RecommendedItem
            key={index}
            image={item.image}
            price={item.price}
            description={item.description}
          />
        ))}
      </div>
    </section>
  );
};

export default RecommendedItems;
