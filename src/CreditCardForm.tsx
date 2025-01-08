import React, { useState, FormEvent } from 'react';
import { CreditCard, RefreshCw } from 'lucide-react';
import './CreditCardForm.scss';

interface CardData {
  number: string;
  name: string;
  expiry: string;
  cvc: string;
}

export default function CreditCardForm() {
  const initialState: CardData = {
    number: '',
    name: '',
    expiry: '',
    cvc: ''
  };

  const [cardData, setCardData] = useState<CardData>(initialState);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', cardData);
  };

  const handleClear = () => {
    setCardData(initialState);
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  return (
    <div className="credit-card-container">
      {/* Credit Card Preview */}
      <div className="card-preview">
        <div className="card">
          <div className="card-icon">
            <CreditCard />
          </div>
          <div className="card-number" data-testid="card-number">
            <p>{cardData.number || '•••• •••• •••• ••••'}</p>
          </div>
          <div className="card-details">
            <div className="card-holder" data-testid="card-holder">
              <p className="label">Card Holder</p>
              <p className="value">{cardData.name || 'YOUR NAME'}</p>
            </div>
            <div className="card-expiry" data-testid="card-expiry">
              <p className="label">Expires</p>
              <p className="value">{cardData.expiry || 'MM/YY'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Credit Card Form */}
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="cardNumber">Card Number</label>
            <input
              id="cardNumber"
              placeholder="1234 5678 9012 3456"
              value={cardData.number}
              onChange={(e) => setCardData({
                ...cardData,
                number: formatCardNumber(e.target.value)
              })}
              maxLength={19}
            />
          </div>

          <div className="form-group">
            <label htmlFor="cardName">Card Holder Name</label>
            <input
              id="cardName"
              placeholder="John Doe"
              value={cardData.name}
              onChange={(e) => setCardData({
                ...cardData,
                name: e.target.value.toUpperCase()
              })}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="expiry">Expiry Date</label>
              <input
                id="expiry"
                placeholder="MM/YY"
                value={cardData.expiry}
                onChange={(e) => {
                  let value = e.target.value.replace(/\D/g, '');
                  if (value.length >= 2) {
                    value = value.slice(0, 2) + '/' + value.slice(2, 4);
                  }
                  setCardData({ ...cardData, expiry: value });
                }}
                maxLength={5}
              />
            </div>

            <div className="form-group">
              <label htmlFor="cvc">CVC</label>
              <input
                id="cvc"
                placeholder="123"
                type="password"
                value={cardData.cvc}
                onChange={(e) => setCardData({
                  ...cardData,
                  cvc: e.target.value.replace(/\D/g, '')
                })}
                maxLength={3}
              />
            </div>
          </div>

          <div className="button-group">
            <button type="submit" onClick={() => alert('Card info submitted!')}>Submit</button>
            <button
              type="button"
              className="clear-button"
              onClick={handleClear}
            >
              <RefreshCw size={16} />
              Clear
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}