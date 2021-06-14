import React from 'react';
import './Badge.css'

function BadgeItem({text, image}) {
    return (
        <ul className="badgeItem">
            <img className="image" src={image} alt={text}/>
            <li className="text">{text}</li>
        </ul>
    );
}

export default BadgeItem;