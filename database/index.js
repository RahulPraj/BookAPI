let books = [
    {
        ISBN: "12345Book",
        title: "Getting started with Mern",
        pubDate: "2021-07-07",
        language: "en",
        numPage: 250,
        authors: [1, 2],   /*we specifing id of the other as a number not a name*/
        publication: 1,   /*one book have multiple publication*/
        category: ["tech","programming", "education","triller"],
    },
    {
        ISBN: "12345Two",
        title: "Getting started with Python",
        authors: [1, 2],
        language: "en",
        pubDate: "2021-07-07",
        numOfPage: 225,
        category: ["fiction", "tech", "web dev"],
        publication: 1,
      },
];

const authors = [
    /*as we have to authors for books so we give two names */
    {
        id: 1,
        name: "Rahul",
        books: ["12345Book","12345678Secret"],
    },
    {
        id: 2,
        name: "Elon Musk",
        books: ["12345Book"],
    },
];

const publications = [
    {
        id: 1,
        name: "writex",
        books: ["12345Book"],
    },
    {
        id: 2,
        name: "Vickie Publications",
        books: [],
      },
];
/*we will export that data because java script dont allow us to do that because of security */
//we use module for that , so we can import.

module.exports = {books , authors, publications};