// Requirements for our peoject

// We are a book management company

//we build this API using http method :- GET

//BOOKS
/* we need id to identify the book  uniquely*/
// ISBN - international  standard book number.(id)
// book tittle
// publish date 
// language(book language)
//no pf pages(num page)
//author[] (same as du to multiple no of author we use array)
//category[] (there are multiple no of category i.e we use array )


//AUTHORS
//we build this API using http method :- GET
//GET
//author have id (id).
// name.
// books[] (author can write multiple books) 

//GET
//PUBLICATIONS

//id
//name
//books[] (publication can publish no of books )

/* these are the data what company have ans we have to build API upon this */

// what are all the APIs that we need....

/*what API we need in books*/

//BOOKS
//GET
/*we need an API (GLOBAL QUESTION)*/
// to get all books                                          (DONE)
// to get specific books                                     (DONE)
// to get list of books based on category                    (DONE)
// we need API to get list of books based on languages       (DONE)

/*----------------------------------------------------------------------*/

//SECOND METHOD OF http:- POST

/*purpose of post is sending a data */

//Add new book (wrtitng new API to add new book)             (DONE)




/*----------------------------------------------------------------------- */

//THIRD METHOD IS :-PUT

/*purpose of put is to update data */

//PUT
//to update book title                                        (DONE)
//update/add new author                                       (DONE)


/*-----------------------------------------------------------------------------*/

//THIRD METHOD IS :-DELETE

/*purpose of DELETE is to delete existing data */

//DELETE
//delete a book                                               (DONE)
//delete an author from a book                                (DONE)

/*--------------------------------------------------------------------------------*/

//AUTHORS
//GET
/*we need an API (GLOBAL QUESTION)*/
// to get all authors                                         (DONE)
//to get specific authors                                     (DONE)
// to get list of authors based on books                      (DONE)


/*----------------------------------------------------------------------- */

//POST
//Add new author                                              (DONE)

/*---------------------------------------------------------------------- */

//PUT
//update author name                                          (DONE)

/*------------------------------------------------------------------- */
//DELETE
//delete an author                                            (DONE)

//PUBLICATIONS
//GET
/*we need an API (GLOBAL QUESTION)*/
//to get all publication                                      (DONE)
// to get specific publication                                (DONE)
// to get list of publication based on book                   (DONE)

/*------------------------------------------------------------------- */
//POST
//ADD new publictions                                         (DONE)

//PUT
//update the publication name                                 (DONE)
//update/add books to publications                            (DONE)

//DELETE
//delete  the publication                                     (DONE)
//delete the book from publication                            (DONE)


//how server serve the request

// (!==)-> STRICTLY NOT EQUAL TOO.
//(===)-> STRICTLY EQUAL TOO.