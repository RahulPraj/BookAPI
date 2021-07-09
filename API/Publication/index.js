//Initializing Express Router
const Router = require("express").Router();

//databse models
const PublicationModel = require("../../database/publication");


/*
Route            /Publication
Description     to get all publication
Access          Public
Parameter       NUNE
Methods         GET
 */
Router.get("/",async(req,res) =>{
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
Router.get("/:id", async(req,res) => {
    
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
Router.get("/:isbn",async(req,res) =>{
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
Route            /publication/add
Description      Add new publication
Access          Public
Parameter       NONE
Methods         POST
 */
Router.post("/add", (req, res) =>{
    const {newPublication} = req.body;  
    
    PublicationModel.create(newPublication) 
     return res.json({message:"publication is added"}); 
});

/*
Route           /book/update/publication/name
Description      update publication name 
Access          Public
Parameter       id
Methods         PUT
 */

Router.put("/update/name/:pubId",async(req,res) =>{
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
Router.put("/update/book/:isbn",(req, res) =>{
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
Route           /publication/delete
Description      delete publication
Access          Public
Parameter       id
Methods         delete
 */
Router.delete("/delete/:pubId", async(req, res) =>{
    const updatedPublication = await PublicationModel.findOneAndDelete({id: req.body.pubId});   
        //const updatedPublicationDatabase = database.publications.filter((publication)=>
        //publication.id!==parseInt(req.params.pubId));
        //database.publications = updatedPublicationDatabase;
        return res.json({publication:updatedPublication});
    });

 /*
Route            /publication/delete/book
Description      delete the book from publication
Access           Public
Parameter        isbn, publication id
Methods          delete
 */
Router.delete("/delete/book/:isbn/:pubId",async(req, res)=>{
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


module.exports = Router;