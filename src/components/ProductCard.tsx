import React from 'react';
import styles from './ProductCard.module.css';

type ProductCardProps = {
    image: string;
    title: string;
    description: string;
    link: string;
};

const ProductCard: React.FC<ProductCardProps> = ({ image, title, description, link }) => {
    // Function to count words in a string
    const wordCount = (text: string) => text.trim().split(/\s+/).length;

    // Check if description exceeds 20 words
    const showReadMore = wordCount(description) > 20;

    // Debugging: Log word count and showReadMore status
    console.log(`Description word count: ${wordCount(description)}`);
    console.log(`Show Read More: ${showReadMore}`);

    return (
        <div className={styles.card}>
            <a href={link}>
                <img className={styles.image} src={image} alt={title} />
            </a>
            <div className={styles.content}>
                <a href={link}>
                    <h5 className={styles.title}>{title}</h5>
                </a>
                <p className={styles.description}>{description}</p>
                {showReadMore && (
                    <a href={link} className={styles.readMore}>
                        Read more
                        <svg className={styles.icon} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                        </svg>
                    </a>
                )}
            </div>
        </div>
    );
};

export default ProductCard;
