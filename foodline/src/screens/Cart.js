import React from "react";
import { useCart } from "../components/ContextReducer";
import { useDispatchCart } from "../components/ContextReducer";
import trash from "../pictures/trash.png";

export default function Cart() {
  let data = useCart();
  let dispatch = useDispatchCart();

  if (data.length === 0) {
    return (
      <div>
        <div className="m-5 w-100 text-center text-red fs-3">
          The Cart is Empty!
        </div>
      </div>
    );
  }

  const handleCheckOut = async () => {

    const response = await fetch("http://localhost:5000/api/orderdata", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        orderedFood: data,
        userEmail: localStorage.getItem("userEmail"),
        orderedDate: new Date().toDateString(),
      }),
    });

    const json = await response.json();
    
    if (json.success) {
      await dispatch({ type: "DROP" });
    } else {
      console.log("Server side error");
    }
  };

  let totalPrice = data.reduce((total, food) => total + food.price, 0);

  return (
    <div>
      <div className="container m-auto mt-5 table-responsive  table-responsive-sm table-responsive-md">
        <table className="table table-hover ">
          <thead className=" text-success fs-4">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Quantity</th>
              <th scope="col">Size</th>
              <th scope="col">Amount</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {data.map((food, index) => (
              <tr>
                <th scope="row">{index + 1}</th>
                <td>{food.name}</td>
                <td>{food.qty}</td>
                <td>{food.size}</td>
                <td>{food.price}</td>
                <td>
                  <button type="button" className="btn p-0">
                    <img
                      src={trash}
                      alt="delete"
                      onClick={() => {
                        dispatch({ type: "REMOVE", index: index });
                      }}
                    />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>{<h1 className="fs-2">Total Price: ৳{totalPrice}/-</h1>}</div>
        <div>
          <button className="btn bg-success mt-5 " onClick={handleCheckOut}>
            {" "}
            Check Out{" "}
          </button>
        </div>
      </div>
    </div>
  );
}
