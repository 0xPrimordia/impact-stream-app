import { useCart } from "@/app/context/CartContext";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import { HeartIcon as HeartIconOutline } from "@heroicons/react/24/outline";
import { ArrowUpIcon, ArrowDownIcon } from "@heroicons/react/24/outline";

const AddRemoveCartButton = ({ grantId }: { grantId: string }) => {
  const { addItemToCart, deleteItemFromCart, isInCart } = useCart();

  const grantIsInCart = isInCart(grantId);

  const arrowHandler = (e: any) => {
    e.preventDefault();
    if (e.target.id === "add") {
      addItemToCart(grantId);
    } else {
      deleteItemFromCart(grantId);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="cursor-pointer text-center">
        <div className="flex flex-row items-center text-black"  >
          {grantIsInCart ? (
            <HeartIconSolid id="remove" color={"#005AAD"} className="h-8 w-8" onClick={arrowHandler}/>
          ) : (
            <HeartIconOutline id="add" color={"#005AAD"} className="h-8 w-8" onClick={arrowHandler} />
          )}
        </div>
      </div>
    </div>
  );
};

export default AddRemoveCartButton;
