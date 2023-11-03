import React from "react";
import ShopMen from './../../images/men.jpg';
import ShopWomen from './../../images/women.jpg';
import './styles.scss'



const Directory = props => {
    return (
        <div className="directory">
            <div className="wrap">
                <div
                    className="item"
                    style={{
                        backgroundImage: `url(${ShopWomen})`
                    }}
                >
                    <a>
                        Shop Womens
                    </a>
                </div>
                <div
                    className="item"
                    style={{
                        backgroundImage: `url(${ShopMen})`
                    }}
                >
                    <a>
                        Shop Men
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Directory;