import React from 'react'
import "./banner.css"
import Carousel from 'react-material-ui-carousel'

const data = [
    "https://m.media-amazon.com/images/G/31/img2020/fashion/MA2020/Store/banner-pc-1024x350._CB427954858_.jpg",
    "https://png.pngtree.com/template/20211025/ourmid/pngtree-cross-border-e-commerce-amazon-overseas-simple-fashion-backpack-travel-banner-image_661109.jpg",
    "https://images-eu.ssl-images-amazon.com/images/G/31/img21/Fashion/pricepointstore/clothing/199/under-199-desktop-header.jpg",
    "https://images-eu.ssl-images-amazon.com/images/G/31/AmazonKarigar/Saheli_store_banner.png"
]


const Banner = () => {
    return (
        <>

            <Carousel
                className="carasousel"
                autoPlay={true}
                animation="slide"
                indicators={false}
                navButtonsAlwaysVisible={true}
                cycleNavigation={true}
                navButtonsProps={{
                    style: {
                        background: "#fff",
                        color: "#494949",
                        borderRadius: 0,
                        marginTop: -22,
                        height: "104px",
                    }
                }}>
                {
                    data.map((imag, i) => {
                        return (
                            <>
                                <img src={imag} alt="img" key={i} className="banner_img" />
                            </>
                        )
                    })
                }

            </Carousel>
        </>
    )
}

export default Banner;