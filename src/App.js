import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Ticket from './components/Ticket';
import './App.css';
import emoji from './poop-emoji-512X512.png';

function App() {
  const [ticketsShown, setTicketsShown] = useState([]);

  const hideTicketByClick = (ticketId) => {
    const hideArr = ticketsShown.map((ticket) => (
      (ticket.id === ticketId ? { ...ticket, hide: true } : ticket)));
    setTicketsShown(hideArr);
  };

  const showTickets = (ticketsArr) => {
    const newTicketsArr = ticketsArr.map((ticket) => (
      <Ticket key={ticket.id} ticket={ticket} handleClick={hideTicketByClick} />));
    return newTicketsArr;
  };

  const showTicketsFromServer = async () => {
    const ticketsArray = await (await axios.get('/api/tickets')).data;
    setTicketsShown(ticketsArray);
  };

  useEffect(() => {
    showTicketsFromServer();
  }, []);

  const showTicketsByTitle = async (title) => {
    const searchedTicketsArray = await (await axios.get(`/api/tickets?searchText=${title}`)).data;
    setTicketsShown(searchedTicketsArray);
  };

  const restoreHiddenTickets = () => {
    const restoreArr = ticketsShown.map((ticket) => ({ ...ticket, hide: false }));
    setTicketsShown(restoreArr);
  };

  const visualTicketsArr = ticketsShown.filter((ticket) => !ticket.hide);
  const hiddenTicketsCounter = ticketsShown.length - visualTicketsArr.length;

  return (
    <main>
      <div id="app-top">
        <div className="top-left">
          <img src={emoji} id="emoji" alt="emoji" />
          <h1>The Almighty Ticket Manager</h1>
        </div>
        <a className="link" href="https://github.com/TheAlmightyCrumb" target="_blank" rel="noopener noreferrer">@TheAlmightyCrumb on GitHub</a>
      </div>
      <div id="header">
        <input
          id="searchInput"
          placeholder="Search Ticket..."
          onChange={(e) => showTicketsByTitle(e.target.value)}
        />
        <section id="hidden-section">
          <div id="restoreHideTickets" onClick={() => restoreHiddenTickets()}>Restore</div>
          <div id="hideTicketsCounter">{hiddenTicketsCounter}</div>
          {hiddenTicketsCounter ? <div>Hidden Tickets:</div> : <></>}
        </section>
      </div>
      <section id="tickets-section">
        {showTickets(visualTicketsArr)}
      </section>
    </main>
  );
}

export default App;
