import React, { useState, useEffect } from 'react';
import './/login-reg-left-component.css';

const LeftLogRegComponent: React.FC = () => {

    const quotesAuthor = [
        'Walt Disney',
        'Thomas Edison',
        'Steve Jobs',
    ];

    const quotes = [
        'The way to get started is to quit talking and begin doing.',
        'I have not failed. I’ve just found 10,000 ways that won’t work.',
        'I’m convinced that about half of what separates the successful entrepreneurs from the non-successful ones is pure perseverance.',
    ];

    const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentQuoteIndex((prevIndex) =>
                prevIndex === quotes.length - 1 ? 0 : prevIndex + 1
            );
        }, 4000);
        return () => clearInterval(intervalId);
    }, [quotes.length]);

    return (
        <div className="left-login-component padding-20 margin-auto text-align-center dark-font max-width-400">
            <p className="font-22 quote-animation">"{quotes[currentQuoteIndex]}"</p>
            <p className="font-18 italic author-animation">– {quotesAuthor[currentQuoteIndex]}</p>
        </div>
    );
};

export default LeftLogRegComponent;
