import React from 'react';
import Header from '../Header.js';
import Typography from '@material-ui/core/Typography';
import './AboutUs.css';

export default function AboutUs(){
    return(
        <div class="page">
            <Header/>
            <div className="abt_wrapper">
                <div className="abt_container">
                    <div className="space"/>
                    <Typography  variant="h5" align="left" color="secondary" style={{ maxWidth: 700 }}>
                        WELCOME TO BUTTERFLY HOTEL
                    </Typography>
                    <div className="space"/>
                    <hr/>
                    <div className="space"/>
                    <Typography variant="subtitle1">
                        Butterfly Hotel is a luxury hotel, top class in Vietnam. Come to Butterfly Hotel, you are not only immersed in a royal life with full facilities, professional services, top quality but also feel a cozy atmosphere, comfortable and comfortable, familiar as at home.
                        Butterfly Hotel is a safe, friendly place for everyone while in Danang. Conveniently located in a prime location, right in the heart of the city, within easy reach of Danang's tourist attractions, the hotel is easily accessible to all the popular tourist destinations. It is also an ideal destination thanks to the high level of service provided by the hotel. All rooms are designed in a modern style mixed with classic, unique architecture, harmony between the traditional beauty of the Vietnamese and the sophistication of the West. The hotel staff is experienced, professional and enthusiastic staff who are constantly improving their professional skills and quality, always ready to serve customers with the motto "bring the core values to customers ".
                        Another highlight of Butterfly Hotel is our professional service restaurant system bearing bold Eurasia with Butterfly Hotel brand. Right here, you can enjoy the special dishes with the best taste in Asian style, made from the freshest ingredients under strict inspection to ensure the safety of real food. Under the hands of skillful chef team experienced experience.
                        In addition, during the stay at the hotel, you can also enjoy the free on-site facilities such as restaurants, conference rooms, ... What better way to stay in the long holiday? day, your training habits, your daily health care is maintained as at home.
                        Great, comfortable, and impressive are the feelings that visitors comment about Butterfly Hotel after the time here and that is also what we - the people who have the charm to serve you feel themselves. most proud. With the most prestigious and quality services built from the most enduring efforts, Butterfly Hotel is committed to providing you with the highest quality of life, the best moments, the happiest, the most Your holiday is a forever memory never forget.
                    </Typography>
                </div>
            </div>
        </div>
        );
}