import {useContext, useState} from 'react'

import CartContext from '../../context/CartContext'

import './index.css'

const paymentOptionsList = [
  {
    id: 'CARD',
    displayText: 'Card',
    isDisabled: true,
  },
  {
    id: 'NET BANKING',
    displayText: 'Net Banking',
    isDisabled: true,
  },
  {
    id: 'UPI',
    displayText: 'UPI',
    isDisabled: true,
  },
  {
    id: 'WALLET',
    displayText: 'Wallet',
    isDisabled: true,
  },
  {
    id: 'CASH ON DELIVERY',
    displayText: 'Cash on Delivery',
    isDisabled: false,
  },
]

const PaymentPage = () => {
  const {cartList} = useContext(CartContext)

  const [paymentMethod, setPaymentMethod] = useState('')
  const [isOrderPlaced, setIsOrderPlaced] = useState(false)

  const completePaymentMethod = event => {
    const {id} = event.target
    setPaymentMethod(id)
  }

  const onPlaceOrder = () => setIsOrderPlaced(true)

  const getTotalValue = () =>
    cartList.reduce((acc, item) => acc + item.quantity * item.price, 0)

  const renderPaymentMethods = () => (
    <ul className="payment-methods">
      {paymentOptionsList.map(eachOption => (
        <li key={eachOption.id} className="payment-methods-container">
          <input
            className="payment-method-input"
            id={eachOption.id}
            type="radio"
            name="paymentMethod"
            onChange={completePaymentMethod}
            disabled={eachOption.isDisabled}
          />
          <label
            className={`payment-method-labels ${
              eachOption.isDisabled ? 'disabled-label' : ''
            }`}
            htmlFor={eachOption.id}
          >
            {eachOption.displayText}
          </label>
        </li>
      ))}
    </ul>
  )

  return (
    <div className="payment-bg-container">
      {isOrderPlaced ? (
        <p className="order-msg">Your order has been placed successfully</p>
      ) : (
        <>
          <h1 className="payment-heading">Payment Details</h1>
          <p className="payment-method">Payment Method</p>
          {renderPaymentMethods()}
          <div className="details-container">
            <p className="details-heading">Order details:</p>
            <p className="quantity">Quantity: {cartList.length}</p>
            <p className="price">Total Price: Rs {getTotalValue()}/-</p>
          </div>
          <button
            type="button"
            className="confirm-button"
            onClick={onPlaceOrder}
            disabled={paymentMethod === ''}
          >
            Confirm Order
          </button>
        </>
      )}
    </div>
  )
}

export default PaymentPage
