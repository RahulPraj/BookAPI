//we give prefix to book and we remove all the (/book ) from route : /book


//Initializing Express Router
const Router = require("express").Router();

//databse models
const BookModel = require("../../database/book");

//paste all API of books
 /*
Route -> /
Description -> get all books
Access -> Public
Parameter->None
Methods-> GET
 */
Router.get("/", async (req, res) =>{
    const getAllBooks = await BookModel.find();
    return res.json(getAllBooks);
});

/*
Route            /is
Description     get specific books based on ISBN
Access          Public
Parameter       ISBN
Methods         GET
 */
    //to get specific books
    Router.get("/is/:isbn", async (req, res) =>{

        const getSpecificBook = await BookModel.findOne({ISBN: req.params.isbn});
        // inside bracket we provide obejct having our ISBN and pass the params isbn.
        //findOne -> we need to find one book having one ISBN because book  can have only one isbn. 
        //how to check that getSpecificBook have data or not- i.e array length
    
        if(!getSpecificBook){
            return res.json({error:`No book found for the ISBN of ${req.params.isbn}`,});
        }
        return res.json({book:getSpecificBook});
    });

     /*
Route            /c
Description     to get list of books based on category
Access          Public
Parameter       category
Methods         GET
 */
  
Router.get("/c/:category", async (req, res) =>{
    const getSpecificBooks = await BookModel.findOne({
        category: req.params.category,
    });

    if(!getSpecificBooks) {
        return res.json({error: `No book found for the category of ${req.params.category}`,});
    }

    return res .json({books: getSpecificBooks});
});

/*
Route            /
Description     to get list of books based on language
Access          Public
Parameter       category
Methods         GET
 */
Router.get("/l/:language",async (req,res) =>{
    const getSpecificBooks = await BookModel.findOne({language: req.params.language});
    if(!getSpecificBooks){
        return res.json({error:`No book found for the language of ${req.params.language}`}); 
        /*$ isused to excess a js express inside templete literal(``)*/ 
    }

    // if we have data
    return res.json({books:getSpecificBooks});
});

//comment
/*
Route            /book/new
Description      Add new book
Access          Public
Parameter       NONE
Methods         POST
 */
Router.post("/new", async (req, res) =>{
    console.log(req.body);
    const { newBook } = req.body;
    const  addNewBook = await BookModel.create(newBook);
    return res.json({message:"book was added"});
});

/*
Route           /book/update/tittle
Description      update book title
Access          Public
Parameter       isbn
Methods         PUT
 */
Router.put("/update/:isbn", async(req, res) =>{
    const updatedBook = await BookModel.findOneAndUpdate(
        {
            ISBN: req.params.isbn, //passing isbn so tha the update done in books database.
        },
        {
            title: req.body.bookTitle, //specify what we have to update
        
        },
        {
            new: true,
        }
    );

 return res.json({books:updatedBook});
});

/*
Route           /book/update/author
Description      update/add new author FOR A BOOK
Access          Public
Parameter       isbn
Methods         PUT
 */

//here we are useing paramter in parameter->/:isbn/:authorId as we need both isbnbook and author id.
Router.put("/update/author/:isbn", async(req,res)=> {  
    //update book database-> we have to add the author for the book database
    //we using monogoDB
   
   const updatedBook =  await BookModel.findOneAndUpdate(
       {
           ISBN: req.params.isbn,
       },
       {
           $addToSet:{
               authors: req.body.newAuthor
           },
       },
       {
           new: true
       }
       
    );
 
 //database.books.forEach((book) =>{
//if(book.ISBN=== req.params.isbn){
//to add something to an array we use push , as we know our author data is an array to add soemthing to an array we use push.
// return book.author.push(parseInt(req.params.authorId)); /*if the ISBN of book matchs the paramter of isbn we are pushing the author array to paramter of authorId */        
//};
//});

//then update author database for same book 

const updatedAuthor = await AuthorModel.findOneAndUpdate(
    {
        id: req.body.newAuthor,
    },
    {
        $addToSet: {
            books: req.params.isbn
        },
    },
    {
        new: true

    }
    
);

//database.authors.forEach((author) => {
//if(author.id=== parseInt(req.params.authorId)){
// return author .books.push(req.params.isbn);/*here we are checking the author.id with params authorID AND pushing the isbn */
//}
    
//}); 
return res.json({
    books: updatedBook,
    authors: updatedAuthor,
    message:"new  author was added"
 });
});

/*
Route           /book/delet
Description      delete book
Access          Public
Parameter       isbn
Methods         delete
 */
Router.delete("/delete/:isbn",async(req,res )=>{
    const   updatedBookDatabase = await BookModel.findOneAndDelete({ISBN:req.params.isbn});  
        
        //how we can delete a book->using array filter -> is just cleaning the data
    
        // we will use map here we can make a copy of th array
    
    /*which evrer the book object or data is not match with the book isbn send to  pdatedBookDatabase or if any book data match to isbn will thown out(delete)*/    
       // const updatedBookDatabase = database.books.filter((book)=> 
       // book.ISBN!== req.params.isbn);    //filter  and stored in updatedBookDatabase //we have to that filter so that it stored new array in const
    //after we have pdatedBookDatabase in const
    //database.book= updatedBookDatabase; //it will not work so we have to change in database const to let variable
    return res.json({books:updatedBookDatabase});
    });

    /*
Route          /book/delete/author
Description      delete author from a book
Access          Public
Parameter       isbn, author id
Methods         delete
 */

/*if we delete the author from a book we  also have to update the author database as well ,like if we delete 1 from authore the the book should be deleted*/
Router.delete("/delete/author/:isbn/:authorId", async(req, res) =>{

    // update the book database
const updatedBook = await BookModel.findOneAndUpdate(
//because we updateing the specfic array not deleting the whole part.
    {
        ISBN: req.params.isbn
    },
//now i am delete athour from that book
    {
        $pull:{
            authors: parseInt(req.params.authorId),
        },    },
        {
            new:true
        }
    ); 
    // update the author databse
const updatedAuthor = await AuthorModel.findOneAndUpdate(
    {
        id: parseInt(req.params.authorId) //we use parseInt here because we give id of author as url so to convert this in string we use this.
    },
    {
       $pull:{
         books: req.params.isbn 
       }, 
    },
    {
        new: true
    }
);
return res.json({book:updatedBook,author:updatedAuthor,message:"author was deleted!!"});
});



module.exports = Router;


