import React from 'react';
import { Link } from 'react-router-dom';
import { ProductContext } from '../context';
import { ButtonContainer } from './Button';

function Details() {
  const { addToCart, valueDetail } = React.useContext(ProductContext);
  const { id, company, img, info, price, title, inCart } = valueDetail;

  return (
    <div className="container py-5">
      {/* title */}
      <div className="row">
        <div className="col-10 mx-auto text-center text-slanted text-blue my5">
          <h1>{title}</h1>
        </div>
      </div>

      {/* product info */}
      <div className="row">
        <div className="col-10 mx-auto col-md my-3 text-capitalize">
          <img src={img} className="img-fluid" alt="product" />
        </div>
        {/* product text */}
        <div className="col-10 mx-auto col-md my-3 text-capitalize">
          <h2>model : {title} </h2>
          <h4 className="text-title text-uppercase text-muted mt-3 mb-2">
            made by : <span className="text-uppercase">{company}</span>
          </h4>
          <h4 className="text-blue">
            <strong>
              price : <span>$</span>
            </strong>
          </h4>
          <p className="text-capitalize font-weight-bold mt-3 mb-0">some info about product:</p>
          <p className="text-muted lead">{info} </p>
          {/* buttons */}
          <div>
            <Link to="/">
              <ButtonContainer>bact to product</ButtonContainer>
            </Link>
            <ButtonContainer
              cart
              disabled={inCart ? true : false}
              onClick={() => {
                addToCart(id);
              }}>
              {inCart ? 'inCart' : 'add to cart'}
            </ButtonContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Details;
