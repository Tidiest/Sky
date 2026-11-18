import './styles/App.css'
import { Book } from './components/Book'
import { useState } from 'react'

function App() 
{
  const [books, setBooks] = useState([
    {id: 1, title: "First book", author: "tidiest", read: false},
    {id: 2, title: "Second book", author: "tidiest", read: false},
    {id: 3, title: "Third book", author: "tidiest", read: false},
    {id: 4, title: "Fourth book", author: "tidiest", read: false},
    {id: 5, title: "Fifth book", author: "tidiest", read: false},
    {id: 6, title: "Sixth book", author: "tidiest", read: false},
  ])

  const [searchBookTitle, setSearchBookTitle] = useState("");
  const [searchOnlyRead, setSearchOnlyRead] = useState(false);
  return (
    <>
      <h1>My Books</h1>
      <p>Search by title</p>
      <input
        type="text"
        value={searchBookTitle}
        onChange={(event) => setSearchBookTitle(event.target.value)}
      />
      <p>Search only read books</p>
      <input
      type="checkbox"
      checked={searchOnlyRead}
      onChange={(event) => setSearchOnlyRead(event.target.checked)}
      />
      
      {
        books.filter(book => 
          book.title.toLocaleLowerCase().includes(searchBookTitle.toLocaleLowerCase()))
        .filter(book => (searchOnlyRead ? book.read === searchOnlyRead : true))
        .map(book => (
          <Book key={book.id} title={book.title} author={book.author} read={book.read} onMarkAsRead={()=>{
            setBooks(prev => 
              prev.map(mappedBook => 
                 mappedBook.id === book.id ? {...mappedBook, read:!mappedBook.read} : mappedBook
              )
            );
          }} />
        ))}
    </>
  )
}

export default App
