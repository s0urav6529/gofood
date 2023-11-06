import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";
import Carousel from "../components/Carousel";

export default function Home() {
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);
  const [error, setError] = useState(null);

  const loadData = async () => {
    try {
      let response = await fetch("http://localhost:5000/api/foodData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const json = await response.json();

      setFoodItem(json[0]);
      setFoodCat(json[1]);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
  <div>
    <div>
      <Navbar />
    </div>

    <div>
      <Carousel />
    </div>

    <div className="container">
      {

        foodCat.length > 0 ? foodCat.map((data)=>{
          return (
            <div className="row mb-3">
              <div key={data._id} className="fs-3 m-3">
                {data.categoryName}
              </div>
              <hr />
              {
                foodItem.length > 0 ? foodItem.filter((items) => items.categoryName === data.categoryName)
                .map(filterItems=>{
                  return(
                    <div key={filterItems._id} className="col-12 col-md-6 col-lg-3">
                      <Card foodName = {filterItems.name}
                      imgSrc = {filterItems.img} 
                      options = {filterItems.options} 
                      description = {filterItems.description} />
                    </div>
                  )
                }) : <div>No Such Item Found</div>
              }
            </div>
          )
        }):""

      }
    </div>

    <div>
      <Footer />
    </div>
  </div>
);

}
