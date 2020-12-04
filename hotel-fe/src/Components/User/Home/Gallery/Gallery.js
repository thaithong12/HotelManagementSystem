import React from 'react';
import Header from '../Header.js'
import { useStyles } from './Style';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Typography from '@material-ui/core/Typography';
import './Gallery.css';

const tileData = [
{
    img: 'https://apricothotels.com/wp-content/uploads/2016/11/Apricot-Hotel-World-Luxury-Award-2016.jpg',
    title: 'Image',
    author: 'author',
    cols: 1,
},
{
    img: 'https://image.forbesvietnam.com.vn/665x390/Uploaded/oizwrg/yrzn.yrfjpy/2020_09_08/01_ETFP.png',
    title: 'Image',
    author: 'author',
    cols: 1,
},
{
    img: 'https://media-cdn.tripadvisor.com/media/photo-s/0d/4c/69/23/rooftop-swimming-pool.jpg',
    title: 'Image',
    author: 'author',
    cols: 1,
},
{
    img: 'https://santaluxuryhotel.com/wp-content/uploads/2020/01/slider-1-01.png',
    title: 'Image',
    author: 'author',
    cols: 1,
},
{
    img: 'https://du-lich.chudu24.com/f/m/1611/25/khach-san-flc-luxury-quy-nhon.jpg',
    title: 'Image',
    author: 'author',
    cols: 2,
},
{
    img: 'https://tourdulichphuyen.com/view/at_flc-luxury-hotel-quy-nhon-khu-nghi-duong-dang-cap-5-sao_706b7c7061dd2bd1ecb9d407490c0322.jpg',
    title: 'Image',
    author: 'author',
    cols: 2,
},
{
    img: 'https://asiaopentours.net/wp-content/uploads/2018/01/Muong-Thanh-Luxury-Hotel-4.jpg',
    title: 'Image',
    author: 'author',
    cols: 1,
},
{
    img: 'https://exp.cdn-hotels.com/hotels/22000000/21740000/21733600/21733592/0e633fb4_z.jpg?impolicy=fcrop&w=500&h=333&q=high',
    title: 'Image',
    author: 'author',
    cols: 1,
},
{
    img: 'https://media.travelmag.vn/files/quangtrung/2020/09/07/6-2154.jpg',
    title: 'Image',
    author: 'author',
    cols: 2,
},
{
    img: 'https://media.ex-cdn.com/EXP/media.vntravellive.com/files/f1/uploaded/images/photo_news/800x800/news_20161111031328/ArtsRoom3.jpg.jpg',
    title: 'Image',
    author: 'author',
    cols: 1,
},
{
    img: 'https://lh3.googleusercontent.com/proxy/T65mM8o1R1cHKl8TFcE2LXETzpabDbGFCXBmNZx-JQyzsIMzr58YIfHyhZKs0HHNYOBDEgdikXCqJ9PccwjdP6O1hqLM68ud6Y0c5EvOn8lpiGoOTzY8OBhUqoYj2Q',
    title: 'Image',
    author: 'author',
    cols: 1,
},
{
    img: 'https://flcquynhon.com.vn/assets/uploads/hotel_room/8-1/images/Family-Suite-Deluxe.jpg',
    title: 'Image',
    author: 'author',
    cols: 1,
},
];
export default function Gallery(){
    const classes = useStyles();
    return(
        <div class="container">
            <Header/>
            <div className="page-wrapperr">
            <div className="gallery-content">
                <Typography variant="h5" align="left" color="secondary" style={{ maxWidth: 700 }}>
                    GALLERY
                </Typography>
                <div className="gal-space"/>
                <hr/>
                <div className="gal-space"/>
            </div>
            <div className="gal-space"/>
            <div className={classes.root}>
                <GridList cellHeight={160} className={classes.gridList} cols={3}>
                    {tileData.map((tile) => (
                    <GridListTile key={tile.img} cols={tile.cols || 1}>
                        <img src={tile.img} alt={tile.title} />
                    </GridListTile>
                    ))}
                </GridList>
                </div>
            </div>
        </div>
        );
}