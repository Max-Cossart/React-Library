import React, { useState, useEffect } from "react";
import Footer from "./components/Footer";
import Nav from "./components/Nav";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from "./Pages/Home";
import Books from "./Pages/Books";
import { books } from "./data";
import BookInfo from "./Pages/BookInfo";
import Cart from "./Pages/Cart";

function App() {
  const [cart, setCart] = useState([]);

  function addToCart(book) {
    const dupeItem = cart.find(item => +item.id === +book.id)
    if (dupeItem) {
      setCart(cart.map(item => {
        if (item.id === dupeItem.id) {
          return {
            ...item,
            quantity: item.quantity + 1
          }
        }
        else {
          return item
        }
      }))
    }
    else {
      setCart([...cart, {...book, quantity : 1}])
    }
  }

  useEffect(() => {
      console.log(cart)
    }, [cart]);

  return (
    <Router>
      <div className="App">
        <Nav />
        <Route exact path="/" component={Home}></Route>
        <Route exact path="/books" render={() => <Books books={books} />} />
        <Route
          path="/books/:id"
          render={() => <BookInfo books={books} addToCart={addToCart} />}
        />
        <Route path="/cart" render={() => <Cart books={books} />} />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
