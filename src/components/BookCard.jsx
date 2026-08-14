import React, { useState } from "react";
import { useTheme } from "../context/ThemeContext";



function BookCard({ book }) {
    const { theme } = useTheme(); // will be using themeContext for toggling
    const [added, setAdded] = useState(false);

    const handleAddToCart = () => {

        setAdded(true) // To add items in cart
        setTimeout(() => setAdded(false), 1000)
    };

    return (
        <div
            className="book-card"
            style={{
                backgroundColor: 'var(--card-bg)',
                color: "var(--text-color)",
                borderRadius: '12px',
                padding: '1.5rem',
                textAlign: 'center',
                boxShadow:
                    theme === 'dark'
                        ? '0 4px 15px rgba(255, 255, 255,0, 0.5'
                        : '0 4px 15px rgba(0 ,0, 0 ,0.1)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            }}
        >
            <h2 style={{ fontSize: '1.4rem', marginBottom: '0.4rem' }}>

                {/* Title of book form api */}
            </h2>
            <p style={{ marginBottom: '0.2rem' }}>

                {/* <strong>Author:</strong> Author of the book from api */}

            </p>
            <p style={{ marginBottom: '1rem' }}>

                {/* <strong>Price: </strong> Price of the book from api */}

            </p>

            <button
                className={`add-to-cart-btn ${added ? 'added' : ''}`}
                onClick={handleAddToCart} // To add items in cart
            >
                {added ? '✅ Added!' : '🛒 Add to Cart'}
            </button>

        </div>
    );


}


export default BookCard; 