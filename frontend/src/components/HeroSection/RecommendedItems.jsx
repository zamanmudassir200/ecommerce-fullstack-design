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
    <main className="my-6  min-w-[1180px]">
      <h1 className="font-bold text-xl">Recommended Items</h1>
      <div className="flex mt-5  justify-between gap-y-10 flex-wrap ">
        <RecommendedItem recommendedItems={recommendedItems} />
      </div>
    </main>
  );
};

export default RecommendedItems;
