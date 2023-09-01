import React from "react";

const CastList = (props) => {
  const image =
    "";

  return (
    <div className="casts">
      <div className="casts__item">
        <div
          className="casts__item__img"
          style={{ backgroundImage: `url(${image})` }}
        ></div>
      </div>
    </div>
  );
};

export default CastList;
