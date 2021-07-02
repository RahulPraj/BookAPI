const { json } = require("express");
const express = require("express");


   //import database
   const database =require("./database");

   // initization
 const booky = express();
//configuration
booky.use(express.json());
 
 // describe our API.

 /*
Route -> /
Description -> get all books
Access -> Public
Parameter->None
Methods-> GET
 */
 booky.get("/",(req,res) =>{
    /*to first requirement to get all the books*/
    return res.json({book:database.books});

});
 /*
Route            /is
Description     get specific books based on ISBN
Access          Public
Parameter       ISBN
Methods         GET
 */
    //to get specific books
     booky.get("/is/:isbn",(req,res) =>{
         //process data
         const getSpecificBook = database.books.filter((book ) => book.ISBN ===req.params.isbn ); 
         /*getspecificbook go to dartabase and check ,it will finds the books array and filter everything
          and we pass a fun called book .this book is nothing it is an each and every object in the books array 
          , inside books there have isbn , and if the parameter is equal then it stored in getSpecificBook*/
          
          //how to check that getSpecificBook have data or not- i.e array length

          if(getSpecificBook.length===0){
              return res.json({error:`No book found for the ISBN of ${req.params.isbn}`}); 
              /*$ isused to excess a js express inside templete literal(``)*/ 
          }

          // if we have data
          return res.json({book:getSpecificBook});
     });

 /*
Route            /
Description     to get list of books based on category
Access          Public
Parameter       category
Methods         GET
 */
  
booky.get("/c/:category",(req,res) =>{
    const getSpecificBook = database.books.filter((book) =>  
     book.category.includes(req.params.category) 
/* icludes is an another array method as we know category is a array
having samw string in it. so we includs these array , so whatever we data give to include method
it will take and compare each and every value inside this category  and if the match is found it will
 return true or it will return false*/
    );
    if(getSpecificBook.length===0){
        return res.json({error:`No book found for the category of ${req.params.category}`,
        }); 
        /*$ isused to excess a js express inside templete literal(``)*/ 
    }

    // if we have data
    return res.json({book:getSpecificBook});


});
 /*
Route            /
Description     to get list of books based on language
Access          Public
Parameter       category
Methods         GET
 */
booky.get("/l/:language", (req,res) =>{
    const getSpecificBook = database.books.filter((book) =>
    book.language=== req.params.language);
    if(getSpecificBook.length===0){
        return res.json({error:`No book found for the language of ${req.params.language}`}); 
        /*$ isused to excess a js express inside templete literal(``)*/ 
    }

    // if we have data
    return res.json({book:getSpecificBook});
});
 /*
Route            author
Description     get all authors
Access          Public
Parameter       author
Methods         GET
 */
booky.get("/author",(req,res) =>{
    return res.json({authors:database.author});
});
 /*
Route            /author/id
Description     to get specific authors
Access          Public
Parameter       ISBN
Methods         GET
 */

booky.get("/author/:id", (req,res) => {
    
    const getSpecificAuthor = database.authors.filter((author) => author.id===parseInt(req.params.id));
    if(getSpecificAuthor.length===0){
        return res.json({error:`No  specific author  is found ${req.params.id}`});
    }
    return res.json({authors:getSpecificAuthor});
    
});
 /*
Route            /author/book
Description     to get list of authors based on books
Access          Public
Parameter       ISBN
Methods         GET
 */
booky.get("/author/book/:isbn",(req,res) =>{
    const getSpecificAuthor = database.authors.filter((author) =>  
     author.books.includes(req.params.isbn) 
/* icludes is an another array method as we know category is a array
having samw string in it. so we includs these array , so whatever we data give to include method
it will take and compare each and every value inside this category  and if the match is found it will
 return true or it will return false*/
    );
    if(getSpecificAuthor.length===0){
        return res.json({error:`No Author found for the book of ${req.params.isbn}`,
        }); 
        /*$ isused to excess a js express inside templete literal(``)*/ 
    }

    // if we have data
    return res.json({authors:getSpecificAuthor});


});
/*
Route            /Publication
Description     to get all publication
Access          Public
Parameter       NUNE
Methods         GET
 */
booky.get("/publication",(req,res) =>{
    return res.json({publications:database.publication});
});
/*
Route            /Publication
Description      to get specific publication
Access          Public
Parameter       id
Methods         GET
 */
booky.get("/publication/:id", (req,res) => {
    
    const getSpecificPublication = database.publications.filter((publication) => publication.id===parseInt(req.params.id));
    if(getSpecificPublication.length===0){
        return res.json({error:`No  specific publication  is found ${req.params.id}`});
    }
    return res.json({publications:getSpecificPublication});
    
});
/*
Route            /Publication/book
Description       to get list of publication based on book  
Access          Public
Parameter       isbn
Methods         GET
 */
booky.get("/publication/book/:isbn",(req,res) =>{
    const getSpecificPublication = database.publications.filter((publication) =>  
     publication.books.includes(req.params.isbn) 
/* icludes is an another array method as we know category is a array
having samw string in it. so we includs these array , so whatever we data give to include method
it will take and compare each and every value inside this category  and if the match is found it will
 return true or it will return false*/
    );
    if(getSpecificPublication.length===0){
        return res.json({error:`No publication found for the book of ${req.params.isbn}`
        }); 
        /*$ isused to excess a js express inside templete literal(``)*/ 
    }

    // if we have data
    return res.json({publications:getSpecificPublication});


});

//comment
/*
Route            /book/add
Description      Add new book
Access          Public
Parameter       NONE
Methods         POST
 */
booky.post("/book/add",(req,res) => {
    console.log(req.body);
   /*HERE WE USE SOMETHING CALL req.body  TO ADD PARAMTER FOR NEW BOOKS */

   const {newBook} = req.body;  
   /*here as we have body (newBook) name and const name(newBook) both are same to solve this thing we use destructure {newBook} array */
 
    // how to add  a data ta an array-> push
    database.books.push(newBook);
    return res.json({books: database.books});      
});
/*
Route            /author/add
Description      Add new author
Access          Public
Parameter       NONE
Methods         POST
 */
booky.post("/author/add",(req, res) => {

    const {newAuthor} = req.body;  
    
     // how to add  a data ta an array-> push
     database.authors.push(newAuthor);
     return res.json({authors: database.author}); 
});
/*
Route            /publication/add
Description      Add new publication
Access          Public
Parameter       NONE
Methods         POST
 */
booky.post("/publication/add", (req, res) =>{
    const {newPublication} = req.body;  
    
     // how to add  a data ta an array-> push
     database.publications.push(newPublication);
     return res.json({publications: database.publication}); 
});
/*
Route           /book/update/tittle
Description      update book title
Access          Public
Parameter       isbn
Methods         PUT
 */
booky.put("/book/update/tittle/:isbn",(req, res) =>{ //here we used paramter in body
//Foreach -> only update the required data i.e title
//map -> it creating a whole new array 
 /*so we will use forEach */
 database.books.forEach((book) => {
     if(book.ISBN=== req.params.isbn){
         book.title= req.body.newBookTitle;
         return;
     }
 });
 return res.json({books:database.book});
});
/*
Route           /book/update/author
Description      update/add new author FOR A BOOK
Access          Public
Parameter       isbn
Methods         PUT
 */

//here we are useing paramter in parameter->/:isbn/:authorId as we need both isbnbook and author id.
booky.put("/book/update/author/:isbn/:authorId",(req,res)=> {  
 //update book database-> we have to add the author for the book database
 database.books.forEach((book) =>{
    if(book.ISBN=== req.params.isbn){
//to add something to an array we use push , as we know our author data is an array to add soemthing to an array we use push.
    return book.author.push(parseInt(req.params.authorId)); /*if the ISBN of book matchs the paramter of isbn we are pushing the author array to paramter of authorId */        
    };
});

//then update author database for same book 
database.authors.forEach((author) => {
    if(author.id=== parseInt(req.params.authorId)){
        return author .books.push(req.params.isbn);/*here we are checking the author.id with params authorID AND pushing the isbn */
    }
    
});
return res.json({books:database.books,authors:database.author});
});
/*
Route           /book/update/author/name
Description      update author name 
Access          Public
Parameter       id
Methods         PUT
 */
booky.put("/book/author/update/name/:id",(req,res) =>{
    database.authors.forEach((author) => {
        if(author.id=== parseInt(req.params.id)){
            author.name= req.body.newAuthorName;
            return;
        }
    });
    return res.json({authors:database.author});
   
});
/*
Route           /book/update/publication/name
Description      update publication name 
Access          Public
Parameter       id
Methods         PUT
 */

booky.put("/book/publication/update/name/:id",(req,res) =>{
    database.publications.forEach((publication) => {
        if(publication.id=== parseInt(req.params.id)){
            publication.name= req.body.newPublicationName;
            return;
        }
    });
    return res.json({publications:database.publication});
   
});

/*
Route           /publication/update/book
Description      update/add books to publications
Access          Public
Parameter       isbn
Methods         PUT
 */
booky.put("/publication/update/book/:isbn",(req, res) =>{
//update the publication database
database.publications.forEach((pub) =>{
    /*here we are accepting the req.body so we dont have to use parseInt   */
    if(pub.id===req.body.pubId){
        return pub.books.push (req.params.isbn);
    }    
});
//update the book database
database.books.forEach((book)=>{
    if(book.ISBN===req.params.isbn){
       return book.pub=req.body.pubId;
        
    }
});
return res.json({books: database.books, 
    publications:database.pub,
    message:"successfully updated publication"});
});
/*
Route           /book/delet
Description      delete book
Access          Public
Parameter       isbn
Methods         delete
 */
booky.delete("/book/delete/:isbn",(req,res )=>{
    //how we can delete a book->using array filter -> is just cleaning the data

    // we will use map here we can make a copy of th array

/*which evrer the book object or data is not match with the book isbn send to  pdatedBookDatabase or if any book data match to isbn will thown out(delete)*/    
    const updatedBookDatabase = database.books.filter((book)=> 
    book.ISBN!== req.params.isbn);    //filter  and stored in updatedBookDatabase //we have to that filter so that it stored new array in const
//after we have pdatedBookDatabase in const
database.book= updatedBookDatabase; //it will not work so we have to change in database const to let variable
return res.json({books:database.book});
});
/*
Route           /author/delete
Description      delete author
Access          Public
Parameter       id
Methods         delete
 */
booky.delete("/author/delete/:authorId", (req, res) =>{
    const updatedAuthorDatabase = database.authors.filter((author)=>
    author.id!==parseInt(req.params.authorId));
    database.authors = updatedAuthorDatabase;
    return res.json({author:database.authors});
});
/*
Route           /publication/delete
Description      delete publication
Access          Public
Parameter       id
Methods         delete
 */
booky.delete("/publication/delete/:pubId", (req, res) =>{
    const updatedPublicationDatabase = database.publications.filter((publication)=>
    publication.id!==parseInt(req.params.pubId));
    database.publications = updatedPublicationDatabase;
    return res.json({publication:database.publications});
});
/*
Route          /book/delete/author
Description      delete author from a book
Access          Public
Parameter       isbn, author id
Methods         delete
 */

/*if we delete the author from a book we  also have to update the author database as well ,like if we delete 1 from authore the the book should be deleted*/
booky.delete("/book/delete/author/:isbn/:authorId", (req, res) =>{

    // update the book database
/*here we are using forEach and filter , so we are usign forEach because we are not replacing the whole database we just editing one property */
database.books.forEach((book)=>{

/*we check the book form the book paramter if that matches we go inside that,  */    
    if(book.ISBN=== req.params.isbn){

/*as we have author as a array having mutliple data so to delete that we use filter , we will check weather the auth id inisde the database is equal to the other id that we receving 
so whater the auth id is not equal to thw id that we receving is stored in newAuthorList anf the we replacing the whole array and the we returning  */        
        //delete the authore using filter
     const newAuthorList= book.authors.filter((author) => author!== parseInt(req.params.authorId)) ;
     book.authors = newAuthorList;
     return;
    }
});
// update the author databse
database.authors.forEach((author)=>{
    if(author.id=== parseInt(req.params.authorId)){
        const newBooksList= author.books.filter((book) =>book!== req.params.isbn);
        author.books = newBooksList;
        return;
    }
});
return res.json({book:database.books,author:database.authors,message:"author was deleted!!"});
});
/*
Route            /publication/delete/book
Description      delete the book from publication
Access           Public
Parameter        isbn, publication id
Methods          delete
 */
booky.delete("/publication/delete/book/:isbn/:pubId",(req, res)=>{
    //update publication database
/*here we are just replacing the publication 1 by 0 because we have one publication */
database.publications.forEach((publication)=>{
    if(publication.id=== parseInt(req.params.pubId)){
      const newBooksList = publication.books.filter((book)=>  book !== req.params.isbn);
      publication.books = newBooksList;
      return;
    }
});    
//update book database
database.books.forEach((book)=>{
    if(book.ISBN=== req.params.isbn){
        book.publication= 0; //we assuming that no publication is availabe
        return;
    }
});
return res.json({books:database.books, publications: database.publications});
});
booky.listen(3000, () => console.log("Hey server is running!!") );