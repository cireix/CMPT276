import React from 'react';
import '../css/ProductDetail.scss';

export default function ProductDetail(props) {
    const { country, image, desc, fullName, price, rating, type, volume } = props.product;

    return (
        <div className="product-detail">
            <p className="title has-text-centered">{fullName}</p>
            <div className="detail-image-wrapper">
                <figure className="detail-image">
                    <img className="detail-img" src={image} alt="" />
                </figure>
                <p className="detail-volume has-text-centered">{volume + "L / " + country + " / " + type}</p>
            </div>
                <div className="detail-desc">
                    <p>{ desc === "false" ? "" : desc }</p>
                </div>

            <div className="detail-footer">
                <div className="detail-price">{"$" + price}</div>

            </div>

        </div>
    )
}
