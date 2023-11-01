import React from 'react';

const CardTags = ({tag}) => {
    return (
        <span>
            <span className="text-lg">#{tag}, </span>
        </span>
    );
};

export default CardTags;