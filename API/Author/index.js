//Initializing Express Router
const Router = require("express").Router();

//databse models
const AuthorModel = require("../../database/author");


/*
Route            author
Description     get all authors
Access          Public
Parameter       author
Methods         GET
 */
Router.get("/",async(req,res) =>{
    try{
        const getAllAuthors = await AuthorModel. find();
    return res.json({authors:getAllAuthors});
    }catch(error){
        return res.json ({error: error.message});
    }
    
});


 /*
Route            /author/id
Description     to get specific authors
Access          Public
Parameter       ISBN
Methods         GET
 */

Router.get("/:id",async (req,res) => {

    try{
        const getSpecificAuthors = await AuthorModel.findOne({id: req.params.id});
    if(!getSpecificAuthors){
        return res.json({error:`No  specific author  is found ${req.params.id}`});
    }
    return res.json({authors:getSpecificAuthors});
    }catch(error){
        return res.json ({error: error.message});
    }
    
});

/*
Route            /author/book
Description     to get list of authors based on books
Access          Public
Parameter       ISBN
Methods         GET
 */
Router.get("/book/:isbn",async(req,res) =>{

    try{
        const getSpecificAuthors = await AuthorModel.findOne({ISBN:parseInt(req.params.isbn)}); 

        if(!getSpecificAuthors){
            return res.json({error:`No Author found for the book of ${req.params.isbn}`,
            }); 
            /*$ isused to excess a js express inside templete literal(``)*/ 
        }
    
        // if we have data
        return res.json({authors:getSpecificAuthors});
    
    
    }catch(error){
        return res.json ({error: error.message});
    }
    
});

/*
Route            /author/add
Description      Add new author
Access          Public
Parameter       NONE
Methods         POST
 */
Router.post("/add",async(req, res) => {
    try{
        const {newAuthor} = req.body;  
    
        AuthorModel.create(newAuthor);
         return res.json({message:" author is added"});
    }catch(error){
        return res.json ({error: error.message});
    }

    
});

/*
Route           /book/update/author/name
Description      update author name 
Access          Public
Parameter       id
Methods         PUT
 */
Router.put("/update/name/:authorId",async(req,res) =>{

    try{
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
    }catch(error){
        return res.json ({error: error.message});
    }
    
   
});

/*
Route           /author/delete
Description      delete author
Access          Public
Parameter       id
Methods         delete
 */
Router.delete("/delete/:authorId", async(req, res) =>{
    try{
        const updatedAuthor = await AuthorModel.findOneAndDelete({id: req.body.authorId});    
        //const updatedAuthorDatabase = database.authors.filter((author)=>
        //author.id!==parseInt(req.params.authorId));
        //database.authors = updatedAuthorDatabase;
         return res.json({author:updatedAuthor});
    }catch(error){
        return res.json ({error: error.message});
    }
    
 });

    
    
    module.exports = Router;