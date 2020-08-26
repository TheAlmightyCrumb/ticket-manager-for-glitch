import React, { useState } from 'react';

function Ticket({ ticket, handleClick }) {
  const [showMoreFlag, setShowMoreFlag] = useState(false);

  const showLabel = (ticketHasLabel) => ticketHasLabel.labels.map((label) => (
    <div key={label} className="label">
      {label}
    </div>
  ));

  const showFullDate = (ms) => {
    const createdAt = new Date(ms);
    return `${createdAt.getDate()}/${
      createdAt.getMonth() + 1
    }/${createdAt.getFullYear()} 
        ${createdAt.getHours()}:${createdAt.getMinutes()}:${createdAt.getSeconds()}`;
  };

  return (
    <div className="ticket">
      <div className="ticket-top">
        <h2>{ticket.title}</h2>
        <div
          className="hideTicketButton"
          onClick={() => handleClick(ticket.id)}
        >
          Hide
        </div>
      </div>
      {showMoreFlag ? (
        <div className="content">
          {ticket.content}
          <div className="show-more" onClick={() => setShowMoreFlag(!showMoreFlag)}>
            Show Less
          </div>
        </div>
      ) : (
        <div className="content">
          <div>{ticket.content.substring(0, 100)}</div>
          <div
            className="show-more"
            onClick={() => setShowMoreFlag(!showMoreFlag)}
          >
            Show More...
          </div>
        </div>
      )}
      <div className="ticket-bottom">
        <div className="writer-details">
          By:
          {' '}
          {ticket.userEmail}
          {' '}
          |
          {showFullDate(ticket.creationTime)}
        </div>
        <div className="label-container">
          {ticket.labels && showLabel(ticket)}
        </div>
      </div>
    </div>
  );
}

export default Ticket;
