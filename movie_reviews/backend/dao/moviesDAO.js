import mongodb from "mongodb"
const ObjectId = mongodb.ObjectID
let movies
export default class MoviesDAO {
    static async injectDB(conn) {
        if (movies) {
            return
        }
        try {
            movies = await conn.db(process.env.MOVIEREVIEWS_NS)
                .collection('movies')
        }
        catch (e) {
            console.error(`unable to connect in MoviesDAO: ${e}`)
        }
    }

    static async getMovies({// default filter
        filters = null,
        page = 0,
        moviesPerPage = 20, // will only get 20 movies at once
    } = {}) {
        let query
        if (filters) {
            if ("title" in filters) {
                query = { $text: { $search: filters['title'] } }
            } else if ("rated" in filters) {
                query = { "rated": { $eq: filters['rated'] } }
            }
        }
        let cursor
        try {
            cursor = await movies
                .find(query)
                .limit(moviesPerPage)
                .skip(moviesPerPage * page)
            const moviesList = await cursor.toArray()
            const totalNumMovies = await movies.countDocuments(query)
            return { moviesList, totalNumMovies }
        }
        catch (e) {
            console.error(`Unable to issue find command, ${e}`)
            return { moviesList: [], totalNumMovies: 0 }
        }
    }

    static async getRatings() {
        let ratings = []
        try {
            ratings = await movies.distinct("rated")
            return ratings
        }
        catch (e) {
            console.error(`unable to get ratings, $(e)`)
            return ratings
        }
    }

    static async getMovieById(id) {                 //filter by id
        try {                                       //await...pause execution
            return await movies.aggregate([         //aggregate operations - collects values from various documents and groups them together 
                {
                    $match: {                       //using the operation "match",in the movie document, filter the document by _id 
                        _id: new ObjectId(id),      //converts the id found into an object
                    }
                },
                {
                    $lookup:                        //lookup from the reviews collection
                    {
                        from: 'reviews',            //collection
                        localField: '_id',          //match localfield to foreign field
                        foreignField: 'movie_id',
                        as: 'reviews',              //finds all the reviews with specific movie id and returns the movie with the review
                    }
                }
            ]).next() //return the next document in a cursor
        }
        catch (e) { //
            console.error(`something went wrong in getMovieById: ${e}`)
            throw e
        }
    }


}
