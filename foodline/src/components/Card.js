import React, { useEffect, useRef, useState } from "react";
import { useCart, useDispatchCart } from "./contextReducer";

export default function Card(props) {
  const priceOption = Object.keys(props.foodItems.option);
  const foodName = props.foodItems.name;
  const id = props.foodItems._id;
  const img = props.foodItems.img;
  const priceRef = useRef();

  let data = useCart();
  let dispatch = useDispatchCart();

  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");

  const handleAddToCart = async () => {
    let food = [];

    for (const item of data) {
      if (item.id === id) {
        food = item;
        break;
      }
    }

    /* only same item er qty change hole update hbe, size change hole new add hbe */
    if (food !== []) {
      if (food.size === size) {
        await dispatch({
          type: "UPDATE",
          id: id,
          name: foodName,
          price: finalPrice,
          qty: qty,
        });
        return;
      } else if (food.size !== size) {
        await dispatch({
          type: "ADD",
          id: id,
          name: foodName,
          price: finalPrice,
          qty: qty,
          size: size,
          img: img,
        });
        return;
      }
    }
    await dispatch({
      type: "ADD",
      id: id,
      name: foodName,
      price: finalPrice,
      qty: qty,
      size: size,
      img: img,
    });
    return;
  };

  let finalPrice = qty * parseInt(props.foodItems.option[size]);

  useEffect(() => {
    setSize(priceRef.current.value);
  }, []);

  return (
    <div>
      <div className="card mt-3" style={{ width: "18rem", maxHeight: "360px" }}>
        <img src={img} alt="" style={{ height: "120px" }} />
        <div className="card-body">
          <h5 className="card-title">{foodName}</h5>
          <p className="card-text">This is the description.</p>
          <div className="container w-100">
            <select
              className="m-2 h-100 bg-success rounded"
              onChange={(e) => setQty(e.target.value)}
            >
              {Array.from(Array(6), (e, i) => {
                return (
                  <option key={i + 1} value={i + 1}>
                    {" "}
                    {i + 1}
                  </option>
                );
              })}
            </select>
            <select
              className="m-2 h-100 bg-success rounded"
              ref={priceRef}
              onChange={(e) => setSize(e.target.value)}
            >
              {priceOption.map((data) => {
                return (
                  <option key={data} value={data}>
                    {data}
                  </option>
                );
              })}
            </select>
            <div className="d-inline h-100 fs-5"> ৳{finalPrice}/-</div>
          </div>
          <hr />
          <button
            className="btn btn-success justify-center ms-2"
            onClick={handleAddToCart}
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}
