import React, { useState,useEffect } from 'react';
import axios from 'axios';

const Basicscreen = () => {

  const [books,setBooks] = useState([]);
  const [member,setMember] = useState([]);
  const [selectedBook,setSelectedBook] = useState('');
  const [selectedMember,setSelectedMember] = useState('');
  const [circulationId,setCirculationId] = useState('');
  const [message,setMessage] = useState('');

  useEffect(()=>{
    axios.get('http://localhost:5000/api/books')
    .then(res=>{
      setBooks(res.data);
    })
    .catch(err=>{
      console.log(err)
    });


    axios.get('http://localhost:5000/api/member')
    .then(res=>{
      setMember(res.data);
    })
    .catch(err=>{
      console.log(err)
    });
  },[]);

  const handleCheckout =()=>{
    axios.post('http://localhost:5000/api/books/checkout',{bookId:selectedBook,memberId:selectedMember})
    .then(res=>{
      setMessage(res.data.message);
    })
    .catch(err=>{
      console.log(err)
    })
  }


  const handleReturn=()=>{
    axios.post('http://localhost:5000/api/books/return',{circulationId})
    .then(res=>{
      setMessage(res.data.message);
    })
    .catch(err=>{
      console.log(err)
    })
  }

  return (
    <div>
      <h1>Library Management System</h1>
      <div>
        <h2>Books</h2>
        <select value={selectedBook} onChange={(e)=>setSelectedBook(e.target.value)}>
          <option value="" >Select a Book</option>
          {books.map(book =>(
            <option key={book._id} value={book._id}>{book.BookName}</option>
          ))}
        </select>
      </div>
      <div>
        <h2>Member</h2>
        <select value={selectedMember} onChange={(e)=>setSelectedMember(e.target.value)}>
          <option value="" >Select a Member</option>
          {member.map(member =>(
            <option key={member._id} value={member._id}>{member.MemberName}</option>
          ))}
        </select>
      </div>
      <div>
        <button onClick={handleCheckout}>Checkout</button>
      </div>
      <div>
        <h2>Return Book</h2>
        <input type='text' value={circulationId} onChange={(e)=> setCirculationId(e.target.value)}/>
        <button onClick={handleReturn}>Return</button>
      </div>
      <div>{message}</div>
    </div>
  )
}



export default Basicscreen