import React from "react";
import BookCard from "./BookCard";
import { motion, AnimatePresence } from 'framer-motion';


function BookList({ searchItem }) {

    // Adding Mock Data incase of Api failure

    const books = [
        { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', price: 10.99 },
        { id: 2, title: '1984', author: 'George Orwell', price: 12.5 },
        { id: 3, title: 'To Kill a MockingBird', author: 'Harper Lee', price: 9.75 },
        { id: 4, title: 'Pride and Prejudice', author: 'Jane Austen', price: 9.99 },
        { id: 5, title: 'The Catcher in the Rye', author: 'J. D. Salinger', price: 11.75 },
        { id: 6, title: 'The Hobbit', author: 'J. R. R. Tolkien', price: 13.49 },
        { id: 7, title: 'Harry Potter and the Sorcerer\'s Stone', author: 'J. K. Rowling', price: 15.99 },
        { id: 8, title: 'The Alchemist', author: 'Paulo Coelho', price: 10.50 },
        { id: 9, title: 'Brave New World', author: 'Aldous Huxley', price: 12.25 },
        { id: 10, title: 'The Book Thief', author: 'Markus Zusak', price: 16.99 },
        { id: 11, title: 'Little Women', author: 'Louisa May Alcott', price: 8.99 },
        { id: 12, title: 'The Kite Runner', author: 'Khaled Hosseini', price: 13.75 },
        { id: 13, title: 'Animal Farm', author: 'George Orwell', price: 7.99 },
        { id: 14, title: 'The Fault in Our Stars', author: 'John Green', price: 11.49 },
        { id: 15, title: 'The Lord of the Rings', author: 'J. R. R. Tolkien', price: 19.99 },
        { id: 16, title: 'Atomic Habits', author: 'James Clear', price: 17.50 },
        { id: 17, title: 'The Silent Patient', author: 'Alex Michaelides', price: 14.25 },
        { id: 18, title: 'Dune', author: 'Frank Herbert', price: 15.99 },
        { id: 19, title: 'The Midnight Library', author: 'Matt Haig', price: 13.99 },
        { id: 20, title: 'Sapiens', author: 'Yuval Noah Harari', price: 18.50 },
    ];
}