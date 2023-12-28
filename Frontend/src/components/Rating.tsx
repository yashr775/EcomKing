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
      <div className="pt-1">
        {rating >= 1 ? (
          <TiStarFullOutline />
        ) : rating > 0.5 ? (
          <TiStarHalfOutline />
        ) : (
          ""
        )}{" "}
      </div>
      <div className="pt-1">
        {rating >= 2 ? (
          <TiStarFullOutline />
        ) : rating - 1 > 0.5 ? (
          <TiStarHalfOutline />
        ) : (
          ""
        )}{" "}
      </div>
      <div className="pt-1">
        {rating >= 3 ? (
          <TiStarFullOutline />
        ) : rating - 2 > 0.5 ? (
          <TiStarHalfOutline />
        ) : (
          ""
        )}{" "}
      </div>
      <div className="pt-1">
        {rating >= 4 ? (
          <TiStarFullOutline />
        ) : rating - 3 > 0.5 ? (
          <TiStarHalfOutline />
        ) : (
          ""
        )}{" "}
      </div>
      <div className="pt-1">
        {rating >= 5 ? (
          <TiStarFullOutline />
        ) : rating - 4 > 0.5 ? (
          <TiStarHalfOutline />
        ) : (
          ""
        )}{" "}
      </div>
      <div className="pl-2 pb-2">{reviews}</div>
      <span className="pl-2">Reviews</span>
    </div>
  );
};

export default Rating;
