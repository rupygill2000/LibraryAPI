var bookcontroller = function (Book){

var post = function(req, res)
    {
    var book = new Book(req.body);
    if(!req.body.title){
        res.status(400);
        res.send('Book Title is required')
    }
    else{
 
    
    book.save();
    res.status(201);
    res.send(book);
        }
    }
var get = function(req,res){

        var query = {};

        if(req.query.genre)
        {
            query.genre = req.query.genre;
        }
        Book.find(query, function(err,books){
            if(err)
                res.status(500).send(err);
            else
            {
            var returnBooks = new Array();
            books.forEach(function(element, index, array){
                var newBook = element.toJSON();
                newBook.links = {};
                newBook.links.self = 'http://' + req.headers.host + '/api/books/' + newBook._id;
                returnBooks.push(newBook);
            })
            res.json(returnBooks);
                //res.json(books);
        }
        });
    }
    return {
        post: post,
        get: get
    }
}

module.exports = bookcontroller;