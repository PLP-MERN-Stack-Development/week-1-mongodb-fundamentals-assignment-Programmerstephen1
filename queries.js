// Basic Queries

// 1. Find all books in a specific genre
db.books.find({ genre: "Business" })

// 2. Find books published after a certain year
db.books.find({ published_year: { $gt: 2010 } })

// 3. Find books by a specific author
db.books.find({ author: "Robert C. Martin" })

// 4. Update the price of a specific book
db.books.updateOne({ title: "Clean Code" }, { $set: { price: 25.99 } })

// 5. Delete a book by its title
db.books.deleteOne({ title: "Zero to One" })

// Advanced Queries

// Books in stock and published after 2010
db.books.find({ in_stock: true, published_year: { $gt: 2010 } })

// Projection: Only return title, author, and price
db.books.find({}, { _id: 0, title: 1, author: 1, price: 1 })

// Sorting by price ascending
db.books.find().sort({ price: 1 })

// Sorting by price descending
db.books.find().sort({ price: -1 })

// Pagination: page 1 (5 per page)
db.books.find().skip(0).limit(5)

// Pagination: page 2 (5 per page)
db.books.find().skip(5).limit(5)

// Aggregation Pipelines

// Average price by genre
db.books.aggregate([
  { $group: { _id: "$genre", avg_price: { $avg: "$price" } } }
])

// Author with most books
db.books.aggregate([
  { $group: { _id: "$author", book_count: { $sum: 1 } } },
  { $sort: { book_count: -1 } },
  { $limit: 1 }
])

// Group by publication decade and count
db.books.aggregate([
  {
    $group: {
      _id: { $concat: [
        { $toString: { $multiply: [{ $floor: { $divide: ["$published_year", 10] } }, 10] } },
        "s"
      ]},
      total: { $sum: 1 }
    }
  }
])

// Indexing

// Create index on title
db.books.createIndex({ title: 1 })

// Create compound index on author and published_year
db.books.createIndex({ author: 1, published_year: -1 })

// Use explain to show performance
db.books.find({ title: "Clean Code" }).explain("executionStats")
