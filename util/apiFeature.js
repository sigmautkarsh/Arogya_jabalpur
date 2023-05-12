class ApiFeatures {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }
    search() {
        const keyword = this.queryStr.keyword ? {
            name: {
                $regex: this.queryStr.keyword,
                $options: 'i'
            },

        } : {};
        this.query = this.query.find({ ...keyword })
        return this;
    }

    // filter for api 
    filter() {
        const queryCopy = { ...this.queryStr };
        
        //console.log(queryCopy);
        const removedField = ['keyword', 'page', 'limit'];

        removedField.forEach(key => delete queryCopy[key]);
        //console.log(queryCopy)
        //filtering for price and rating
        let queryStr =JSON.stringify(queryCopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g,(key)=> `$${key}`);

        //console.log(queryStr)
        this.query = this.query.find(JSON.parse(queryStr));
        return this;
    }

    pageination(resultesPerPage){
        const currentPage = Number(this.queryStr.page) ||1;

        const skip = resultesPerPage* (currentPage-1);
        this.query = this .query.limit(resultesPerPage).skip(skip);
        return this ;

    }
}
module.exports = ApiFeatures;