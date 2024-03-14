import React from "react";
import { ShoppingBag } from "lucide-react";

const ShoppingCart = () => {
  return (
    <div className="relative cursor-pointer">
      <p className="absolute top-[-9px] right-[-9px] bg-red-500 text-white h-5 w-5 flex items-center justify-center text-xs font-medium rounded-full">
        0
      </p>
      <ShoppingBag strokeWidth={1.2} className="h-6 w-6" />
    </div>
  );
};

export default ShoppingCart;
