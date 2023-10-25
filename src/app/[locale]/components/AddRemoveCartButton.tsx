import { useCart } from "@/app/context/CartContext";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import { HeartIcon as HeartIconOutline } from "@heroicons/react/24/outline";

const AddRemoveCartButton = ({ grantId }: { grantId: string }) => {
  const { addItemToCart, deleteItemFromCart, isInCart } = useCart();

  const grantIsInCart = isInCart(grantId);

  return (
    <div className="flex flex-col items-center">
      <div
        className="cursor-pointer text-center"
        onClick={() =>
          grantIsInCart ? deleteItemFromCart(grantId) : addItemToCart(grantId)
        }
      >
        {grantIsInCart ? (
          <HeartIconSolid color={"#005AAD"} className="h-8 w-8" />
        ) : (
          <HeartIconOutline color={"#005AAD"} className="h-8 w-8" />
        )}
      </div>
    </div>
  );
};

export default AddRemoveCartButton;
