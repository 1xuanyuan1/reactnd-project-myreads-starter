import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from '../BooksAPI'
import Book from '../components/Book'

class Search extends Component {
  state = {
    shelfs: {}, // {id: shelf}
    books: []
  }
  componentDidMount () {
    /**
     * 获取书架上的书籍
     */
    BooksAPI.getAll().then(res => {
      this.setState(({shelfs}) => {
        res.forEach(item => {
          shelfs[item.id] = item.shelf
        })
        return { shelfs }
      })
    })
  }
  onSearch = (val) => {
    // 若输入框内容为空 则不做处理
    if (val.trim() === '') return
    BooksAPI.search(val).then(res => {
      if (Array.isArray(res)) {
        this.setState({
          books: res.map(item => {
            if (this.state.shelfs[item.id]) {
              item.shelf = this.state.shelfs[item.id]
            }
            return item
          })
        })
      } else {
        this.setState({
          books: []
        })
      }
    })
  }

  onChangeShelf = (shelf, book) => {
    this.setState(({books}) => {
      // 更新本地状态
      book.shelf = shelf
      // 下面这句话 不写也行  why
      // books[books.findIndex(item => item.id === book.id)] = book

      // 更新服务器上的状态
      BooksAPI.update(book, shelf)
      return {
        books
      }
    })
  }

  render () {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input type="text" placeholder="Search by title or author" onChange={(e) => this.onSearch(e.target.value)}/>

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.books.map(item => (
              <Book 
                key={item.id}
                data={item}
                onChangeShelf={(e) => this.onChangeShelf(e.target.value, item)}
                />
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default Search