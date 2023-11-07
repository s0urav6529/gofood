import React from "react";
import { useCart } from "../components/contextReducer";
import { useDispatchCart } from "../components/contextReducer";
import trash from "../pictures/trash.png";

export default function Cart() {
  let data = useCart();
  let dispatch = useDispatchCart();

  console.log(data);

  if (data.length === 0) {
    <div>
      <div className="m-5 w-100 text-center fs-3">The Cart is Empty</div>
    </div>;
  }

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
            {data.map((food, index) => {
              <tr>
                <th scope="row">{index + 1}</th>
                <td>{food.name}</td>
                <td>{food.qty}</td>
                <td>{food.size}</td>
                <td>{food.price}</td>
                <td>
                  <button type="button" className="btn p-0">
                    <img src={trash} alt="delete" />
                  </button>
                </td>
              </tr>;
            })}
          </tbody>
        </table>
        <div>{<h1 className="fs-2">Total Price: ৳{totalPrice}/-</h1>}</div>
        <div>
          <button
            className="btn bg-success mt-5 " /* onClick={handleCheckOut} */
          >
            {" "}
            Check Out{" "}
          </button>
        </div>
      </div>
    </div>
  );
}
