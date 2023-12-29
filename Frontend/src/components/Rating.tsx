import { TiStarFullOutline } from "react-icons/ti";
import { TiStarHalfOutline } from "react-icons/ti";

type Prop = {
  reviews: number;
  rating: number;
};

const Rating = (props: Prop) => {
  const { reviews, rating } = props;
  return (
    <div className="flex">
      <div className="pt-1 text-yellow-400">
        {rating >= 1 ? (
          <TiStarFullOutline className="size-6" />
        ) : rating > 0.5 ? (
          <TiStarHalfOutline className="size-6" />
        ) : (
          ""
        )}{" "}
      </div>
      <div className="pt-1 text-yellow-400">
        {rating >= 2 ? (
          <TiStarFullOutline className="size-6" />
        ) : rating - 1 > 0.5 ? (
          <TiStarHalfOutline className="size-6" />
        ) : (
          ""
        )}{" "}
      </div>
      <div className="pt-1 text-yellow-400">
        {rating >= 3 ? (
          <TiStarFullOutline className="size-6" />
        ) : rating - 2 > 0.5 ? (
          <TiStarHalfOutline className="size-6" />
        ) : (
          ""
        )}{" "}
      </div>
      <div className="pt-1 text-yellow-400">
        {rating >= 4 ? (
          <TiStarFullOutline className="size-6" />
        ) : rating - 3 > 0.5 ? (
          <TiStarHalfOutline className="size-6" />
        ) : (
          ""
        )}{" "}
      </div>
      <div className="pt-1 text-yellow-400 ">
        {rating >= 5 ? (
          <TiStarFullOutline className="size-6" />
        ) : rating - 4 > 0.5 ? (
          <TiStarHalfOutline className="size-6" />
        ) : (
          ""
        )}{" "}
      </div>
      <div className="pl-2 pb-2 text-black pt-1">{reviews}</div>
      <span className="pl-2 text-black pt-1">Reviews</span>
    </div>
  );
};

export default Rating;
