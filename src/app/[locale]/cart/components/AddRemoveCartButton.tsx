import { useCart } from "@/app/context/CartContext";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import { HeartIcon as HeartIconOutline } from "@heroicons/react/24/outline";
import { ArrowUpIcon, ArrowDownIcon } from "@heroicons/react/24/outline";

const AddRemoveCartButton = ({ grantId }: { grantId: string }) => {
  const { addItemToCart, deleteItemFromCart, isInCart } = useCart();

  const grantIsInCart = isInCart(grantId);

  const arrowHandler = (e: any) => {
    e.preventDefault();
    if (e.target.id === "arrowUp") {
      addItemToCart(grantId);
    } else {
      deleteItemFromCart(grantId);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="cursor-pointer text-center">
        <div className="flex flex-row items-center text-black">
          {grantIsInCart ? (
            <HeartIconSolid color={"#005AAD"} className="h-8 w-8" />
          ) : (
            <HeartIconOutline color={"#005AAD"} className="h-8 w-8" />
          )}
          <ArrowDownIcon
            id="arrowDown"
            color={"#005AAD"}
            className="h-6 w-6 px-1"
            onClick={arrowHandler}
          />
          <ArrowUpIcon
            id="arrowUp"
            color={"#005AAD"}
            className="h-6 w-6 px-1"
            onClick={arrowHandler}
          />
        </div>
      </div>
    </div>
  );
};

export default AddRemoveCartButton;
