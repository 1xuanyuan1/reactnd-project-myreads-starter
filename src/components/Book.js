import React, { Component } from 'react'

class Book extends Component {
  render () {
    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 188, backgroundImage: `url("${this.props.data.imageLinks.thumbnail}")` }}></div>
            <div className="book-shelf-changer">
              <select value={this.props.data.shelf || 'none'} onChange={this.props.onChangeShelf}>
                <option value="" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{this.props.data.title}</div>
          <div className="book-authors">{this.props.data.subtitle}</div>
        </div>
      </li>
    )
  }
}

export default Book