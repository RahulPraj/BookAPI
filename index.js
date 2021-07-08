require("dotenv").config();
//Frame work
const { json } = require("express");
const express = require("express");
const mongoose = require("mongoose");


   //import database
   const database =require("./database");

   //commit models
   const BookModel= require("./database/book");
   const AuthorModel= require("./database/author");
   const PublicationModel= require("./database/publication");

   ///micro-services Routes
   const Books  = require("./API/Book");

   // initization
 const booky = express();
//configuration
booky.use(express.json());

//Establish database connection
mongoose.connect(process.env.MONGO_URL,
 {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}
).then(() => console.log("connection established!!")); 
 // describe our API.

 //initializing microservices(preffix)
 booky.use("/book",Books);



 
 /*
Route            author
Description     get all authors
Access          Public
Parameter       author
Methods         GET
 */
booky.get("/author",async(req,res) =>{
    const getAllAuthors = await AuthorModel. find();
    return res.json({authors:getAllAuthors});
});
 /*
Route            /author/id
Description     to get specific authors
Access          Public
Parameter       ISBN
Methods         GET
 */

booky.get("/author/:id",async (req,res) => {
    
    const getSpecificAuthors = await AuthorModel.findOne({id: req.params.id});
    if(!getSpecificAuthors){
        return res.json({error:`No  specific author  is found ${req.params.id}`});
    }
    return res.json({authors:getSpecificAuthors});
    
});
 /*
Route            /author/book
Description     to get list of authors based on books
Access          Public
Parameter       ISBN
Methods         GET
 */
booky.get("/author/book/:isbn",async(req,res) =>{
    const getSpecificAuthors = await AuthorModel.findOne({ISBN:parseInt(req.params.isbn)}); 

    if(!getSpecificAuthors){
        return res.json({error:`No Author found for the book of ${req.params.isbn}`,
        }); 
        /*$ isused to excess a js express inside templete literal(``)*/ 
    }

    // if we have data
    return res.json({authors:getSpecificAuthors});


});
/*
Route            /Publication
Description     to get all publication
Access          Public
Parameter       NUNE
Methods         GET
 */
booky.get("/publication",async(req,res) =>{
    const getSpecificPublications = await PublicationModel.find();
    return res.json({publications:getSpecificPublications});
});
/*
Route            /Publication
Description      to get specific publication
Access          Public
Parameter       id
Methods         GET
 */
booky.get("/publication/:id", async(req,res) => {
    
    const getSpecificPublications = await PublicationModel.findOne({id: req.params.id});
    if(!getSpecificPublications){
        return res.json({error:`No  specific publication  is found ${req.params.id}`});
    }
    return res.json({publications:getSpecificPublications});
    
});
/*
Route            /Publication/book
Description       to get list of publication based on book  
Access          Public
Parameter       isbn
Methods         GET
 */
booky.get("/publication/book/:isbn",async(req,res) =>{
    const getSpecificPublications = await PublicationModel.findOne({ISBN: req.params.isbn});
    if(!getSpecificPublications){
        return res.json({error:`No publication found for the book of ${req.params.isbn}`
        }); 
        /*$ isused to excess a js express inside templete literal(``)*/ 
    }

    // if we have data
    return res.json({publications:getSpecificPublications});


});


/*
Route            /author/add
Description      Add new author
Access          Public
Parameter       NONE
Methods         POST
 */
booky.post("/author/add",async(req, res) => {

    const {newAuthor} = req.body;  
    
    AuthorModel.create(newAuthor);
     return res.json({message:" author is added"}); 
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
    
    PublicationModel.create(newPublication) 
     return res.json({message:"publication is added"}); 
});



/*
Route           /book/update/author/name
Description      update author name 
Access          Public
Parameter       id
Methods         PUT
 */
booky.put("/book/author/update/name/:authorId",async(req,res) =>{
    const updatedAuthor = await AuthorModel.findOneAndUpdate(
        {
            id: parseInt(req.params.authorId)
        },
        {
            name: req.body.newAuthorName
        },
        {
            new: true
        }
    );
    // database.authors.forEach((author) => {
    //     if(author.id=== parseInt(req.params.id)){
    //         author.name= req.body.newAuthorName;
    //         return;
    //     }
    // });
    return res.json({authors:updatedAuthor});
   
});
/*
Route           /book/update/publication/name
Description      update publication name 
Access          Public
Parameter       id
Methods         PUT
 */

booky.put("/book/publication/update/name/:pubId",async(req,res) =>{
    const updatedPublication = await PublicationModel.findOneAndUpdate(
        {
            id: parseInt(req.params.pubId)
        },
        {
            name: req.body.newPublicationName
        },
        {
            new: true
        }
    );
    // database.publications.forEach((publication) => {
    //     if(publication.id=== parseInt(req.params.id)){
    //         publication.name= req.body.newPublicationName;
    //         return;
    //     }
    // });
    return res.json({publications:updatedPublication});
   
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
Route           /author/delete
Description      delete author
Access          Public
Parameter       id
Methods         delete
 */
booky.delete("/author/delete/:authorId", async(req, res) =>{
const updatedAuthor = await AuthorModel.findOneAndDelete({id: req.body.authorId});    
    //const updatedAuthorDatabase = database.authors.filter((author)=>
    //author.id!==parseInt(req.params.authorId));
    //database.authors = updatedAuthorDatabase;
     return res.json({author:updatedAuthor});
});
/*
Route           /publication/delete
Description      delete publication
Access          Public
Parameter       id
Methods         delete
 */
booky.delete("/publication/delete/:pubId", async(req, res) =>{
const updatedPublication = await PublicationModel.findOneAndDelete({id: req.body.pubId});   
    //const updatedPublicationDatabase = database.publications.filter((publication)=>
    //publication.id!==parseInt(req.params.pubId));
    //database.publications = updatedPublicationDatabase;
    return res.json({publication:updatedPublication});
});


 

/*here we are using forEach and filter , so we are usign forEach because we are not replacing the whole database we just editing one property */
//database.books.forEach((book)=>{

/*we check the book form the book paramter if that matches we go inside that,  */    
   // if(book.ISBN=== req.params.isbn){

/*as we have author as a array having mutliple data so to delete that we use filter , we will check weather the auth id inisde the database is equal to the other id that we receving 
so whater the auth id is not equal to thw id that we receving is stored in newAuthorList anf the we replacing the whole array and the we returning  */        
        //delete the authore using filter
     //const newAuthorList= book.authors.filter((author) => author!== parseInt(req.params.authorId)) ;
    // book.authors = newAuthorList;
     //return;
    //}
//});
// update the author databse

// database.authors.forEach((author)=>{
//     if(author.id=== parseInt(req.params.authorId)){
//         const newBooksList= author.books.filter((book) =>book!== req.params.isbn);
//         author.books = newBooksList;
//         return;
//     }
// });

/*
Route            /publication/delete/book
Description      delete the book from publication
Access           Public
Parameter        isbn, publication id
Methods          delete
 */
booky.delete("/publication/delete/book/:isbn/:pubId",async(req, res)=>{
    //update publication database
const updatedPublication = await PublicationModel.findOneAndUpdate(
    {
        id: parseInt(req.params.pubId)
    },
    {
        $pull:{
            books: req.params.isbn
        },
    },
    {
        new:true
    }
);
/*here we are just replacing the publication 1 by 0 because we have one publication */
// database.publications.forEach((publication)=>{
//     if(publication.id=== parseInt(req.params.pubId)){
//       const newBooksList = publication.books.filter((book)=>  book !== req.params.isbn);
//       publication.books = newBooksList;
//       return;
//     }
// });

//update book database
const updatedBook = await BookModel.findOneAndUpdate(
    {
        ISBN: req.params.isbn
    },
    {
        $pull:{
            id: req.body.pubId
        },
    },
    {
        new: true
    }
);

// database.books.forEach((book)=>{
//     if(book.ISBN=== req.params.isbn){
//         book.publication= 0; //we assuming that no publication is availabe
//         return;
//     }
// });
return res.json({books:updatedBook, publications: updatedPublication, message:"book is deleted from publication"});
});
booky.listen(3000, () => console.log("Hey server is running!!") );