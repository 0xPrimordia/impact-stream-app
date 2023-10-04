import { useCart } from "@/app/context/CartContext";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import { HeartIcon as HeartIconOutline } from "@heroicons/react/24/outline";

const AddRemoveCartButton = ({ grantId }: { grantId: string }) => {
  const { addItemToCart, deleteItemFromCart, isInCart } = useCart();

  const grantIsInCart = isInCart(grantId);
  const buttonText = grantIsInCart ? "Remove from Cart" : "Add item to Cart";

  return (
    <div className="flex flex-col items-center">
      <div
        className="cursor-pointer"
        onClick={() =>
          grantIsInCart ? deleteItemFromCart(grantId) : addItemToCart(grantId)
        }
      >
        {grantIsInCart ? (
          <HeartIconSolid color={"red"} className="h-8 w-8 mt-2" />
        ) : (
          <HeartIconOutline color={"red"} className="h-8 w-8 mt-2" />
        )}
      </div>
      <span className="text-xxs text-gray-500">{buttonText}</span>
    </div>
  );
};

export default AddRemoveCartButton;
