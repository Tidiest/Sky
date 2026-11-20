import './styles/App.css'
import { Book } from './components/Book'
import { useState, useEffect } from 'react'

type BookData =
{
  id:number,
  title:string,
  author:string,
  read:boolean
}

type APIBookData =
{
  userId: number,
  id: number,
  title: string,
  body: string
}

function App() 
{
  const [books, setBooks] = useState<BookData[]>([]);

  useEffect(()=>{

    async function fetchBooks()
    {
      try
      {
          const booksResponse = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=10");
          if (!booksResponse.ok) 
          {
            throw new Error("Request failed");
          }

          const booksAPI = await booksResponse.json();

      setBooks(booksAPI.map((book:APIBookData) => ({id:book.id, title:book.title, author:"tidiest", read:false})));
      }
      catch (e)
      {
          console.error("Exception: ", e);
      }
      console.log("effect")
      
    }

    fetchBooks();

  }, []);

  const [searchBookTitle, setSearchBookTitle] = useState("");
  const [searchOnlyRead, setSearchOnlyRead] = useState(false);

  const filteredBooks = books.filter(book => book.title.toLocaleLowerCase().includes(searchBookTitle.toLocaleLowerCase()));
  const visibleBooks = filteredBooks.filter(book => (book.read || !searchOnlyRead));

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
        visibleBooks.map(book => (
          <Book 
            key={book.id} 
            title={book.title} 
            author={book.author} 
            read={book.read} 
            onMarkAsRead={()=>{
              setBooks(prev => prev.map(mappedBook => mappedBook.id === book.id ? {...mappedBook, read:!mappedBook.read} : mappedBook));
            }} 
          />
        ))
        }
    </>
  )
}

export default App
