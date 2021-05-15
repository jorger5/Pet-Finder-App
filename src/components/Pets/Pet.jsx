import React from "react";

const Pet = (props) => {
  const { pet, owner } = props;

  return (
    <div class="infocardContainer">
      <div id="main">
        <img
          alt="pet_pic"
          src={`https://placedog.net/${Math.floor(Math.random() * 501)}`}
        ></img>
      </div>
      <div id="textbois">
        <h2>{`${pet.name}, ${pet.race}`}</h2>
        <p>{`${pet.name} is ${pet.age} years old, weights ${pet.weight} kgs`}</p>
        <p>{`Located in ${pet.city}!`}</p>

        <p>
          {owner ? `Registered by ${owner.name}` : "No information about owner"}
        </p>
        <div id="hotlinks">
          <a href={`tel:+551999999999`}>
            <img
              src="https://image.flaticon.com/icons/png/128/455/455705.png"
              alt="phoneTo"
            ></img>
          </a>
          <a href={`mailto: ${owner ? owner.email : "admin@petfinder"}`}>
            <img
              src="https://img-premium.flaticon.com/png/512/1782/1782765.png?token=exp=1621053681~hmac=f29069661f1a8edcb936c91ef29b35c5"
              alt="mailTo"
            ></img>
          </a>
        </div>
      </div>
    </div>
  );
};
export default Pet;
