import { useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { add, remove } from "../redux/Slices/CartSlice";

const Product = ({ post }) => {
  const { cart } = useSelector((state) => state);
  const dispatch = useDispatch();
  
  // Local state for managing quantity
  const [quantity, setQuantity] = useState(1);

  const addToCart = () => {
    dispatch(add({ ...post, quantity }));
    toast.success("Item added to Cart");
  };

  const removeFromCart = () => {
    dispatch(remove(post.id));
    toast.error("Item removed from Cart");
  };

  // Increase quantity
  const incrementQuantity = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  // Decrease quantity
  const decrementQuantity = () => {
    setQuantity(prevQuantity => Math.max(1, prevQuantity - 1));
  };

  return (
    <div className="flex flex-col items-center justify-between 
    hover:scale-110 transition duration-300 ease-in gap-3 p-4 mt-10 ml-5 rounded-xl outline shadow-lg">
      <div className="w-full">
        <p className="text-gray-700 font-semibold text-lg text-left truncate w-full mt-1">{post.title}</p>
      </div>
      <div className="w-full">
        <p className="text-gray-400 font-normal text-xs text-left">{post.description.split(" ").slice(0, 10).join(" ") + "..."}</p>
      </div>
      <div className="h-[180px] w-full">
        <img src={post.image} alt={post.title} className="h-full w-full object-cover" />
      </div>

      <div className="flex justify-between items-center w-full mt-5">
        <p className="text-green-600 font-semibold text-lg">${post.price}</p>
        
        <div className="flex items-center space-x-2">
         
          <button
            className="bg-gray-200 text-gray-700 border-2 border-gray-700 rounded-full p-1 px-3"
            onClick={decrementQuantity}
          >
            -
          </button>
          <span className="text-gray-700 font-semibold text-lg">{quantity}</span>
          <button
            className="bg-gray-200 text-gray-700 border-2 border-gray-700 rounded-full p-1 px-3"
            onClick={incrementQuantity}
          >
            +
          </button>
        </div>
        
        {
          cart.some((p) => p.id === post.id) ?
          (<button
            className="text-gray-700 border-2 border-gray-700 rounded-full font-semibold 
            text-xs p-2 px-4 uppercase 
            hover:bg-gray-700
            hover:text-white transition duration-300 ease-in"
            onClick={removeFromCart}>
            Remove Item
          </button>) :
          (<button
            className="text-gray-700 border-2 border-gray-700 rounded-full font-semibold 
            text-xs p-2 px-4 uppercase 
            hover:bg-gray-700
            hover:text-white transition duration-300 ease-in"
            onClick={addToCart}>
            Add to Cart
          </button>)
        }
      </div>
    </div>
  );
};

export default Product;
