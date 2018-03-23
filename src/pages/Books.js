import React, { Component } from 'react'
import * as BooksAPI from '../BooksAPI'
import { Link } from 'react-router-dom'
import Book from '../components/Book'
const labels = {
  currentlyReading: 'Currently Reading',
  wantToRead: 'Want to Read',
  read: 'Read',
  // none: 'None'
}
class Books extends Component {
  state = {
    shelfs: {
      currentlyReading: [],
      wantToRead: [],
      read: [],
      // none: []
    }
  }
  componentDidMount () {
    BooksAPI.getAll().then(res => {
      this.setState(({shelfs}) => {
        res.forEach(item => {
          if (shelfs[item.shelf]) {
            shelfs[item.shelf].push(item)
          }
        })
        return { shelfs }
      })
    })
  }
  onChangeShelf = (shelf, book) => {
    this.setState(({shelfs}) => {
      // 更新本地状态
      shelfs[book.shelf].splice(shelfs[book.shelf].findIndex(item => item.id === book.id), 1)
      book.shelf = shelf
      if (shelf !== 'none') { // shelf === none 为删除
        shelfs[shelf].push(book)
      }

      // 更新服务器上的状态
      BooksAPI.update(book, shelf)
      return {
        shelfs
      }
    })
  }

  render () {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {Object.entries(this.state.shelfs).map(([key, shelf]) =>
            <div className="bookshelf" key={key}>
              <h2 className="bookshelf-title">{labels[key]}</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                {shelf.map(item =>
                  <Book 
                    key={item.id}
                    data={item}
                    onChangeShelf={(e) => this.onChangeShelf(e.target.value, item)}
                    />
                  )}
                </ol>
              </div>
            </div>
            )}
          </div>
        </div>
        <div className="open-search">
          <Link to="/search" >Add a book</Link>
        </div>
      </div>
    )
  }
}

export default Books