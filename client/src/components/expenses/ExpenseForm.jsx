import { useState } from "react";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useGlobalContext } from "../../context/GlobalContext";
import Button from "../button/Button";
import { plus } from "../../utils/Icons";

const ExpenseForm = () => {
  const { addExpense, error, setError } = useGlobalContext();

  const [inputState, setInputState] = useState({
    title: "",
    amount: "",
    date: "",
    category: "",
    description: "",
  });

  const { title, amount, date, category, description } = inputState;

  const handleInput = (name) => (e) => {
    setInputState({ ...inputState, [name]: e.target.value });
    setError(""); // Clear the error whenever there's a change in any input field
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if the amount is not a valid number
    if (isNaN(Number(amount))) {
      setError("Expense amount must be a number");
      return;
    }

    addExpense(inputState);
    setError("");
    setInputState({
      title: "",
      amount: "",
      date: "",
      category: "",
      description: "",
    });
  };

  return (
    <ExpenseFormStyled onSubmit={handleSubmit}>
      {error && <p className="error">{error}</p>}
      <div className="input-control">
        <input
          type="text"
          value={title}
          name={"title"}
          placeholder="Expense Title"
          onChange={handleInput("title")}
        />
      </div>

      <div className="input-control">
        <input
          type="text"
          value={amount}
          name={"amount"}
          id={"amount"}
          placeholder={"Expense Amount"}
          onChange={handleInput("amount")}
        />
      </div>

      <div className="input-control">
        <DatePicker
          id="date"
          placeholderText="Enter a date"
          selected={date}
          dateFormat="dd/MM/yyyy"
          onChange={(date) => {
            setInputState({ ...inputState, date: date });
          }}
        />
      </div>

      <div className="selects input-control">
        <select
          required
          value={category}
          name="category"
          id="category"
          onChange={handleInput("category")}
        >
          <option value="" disabled>
            Select Option
          </option>
          <option value="education">Education</option>
          <option value="groceries">Groceries</option>
          <option value="health">Health</option>
          <option value="subscriptions">Subscriptions</option>
          <option value="takeaways">Takeaways</option>
          <option value="clothing">Clothing</option>
          <option value="travelling">Travelling</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div className="input-control">
        <textarea
          name="description"
          value={description}
          placeholder="Enter a description"
          id="description"
          cols="30"
          rows="4"
          onChange={handleInput("description")}
        ></textarea>
      </div>

      <div className="submit-btn">
        <Button
          type="submit" // Make sure the button has type="submit"
          name={"Add Expense"}
          icon={plus}
          bPad={"0.8rem 1.6rem"}
          bRad={"30px"}
          bg={"var(--color-accent)"}
          color={"#fff"}
          hColor={"red"}
        />
      </div>
    </ExpenseFormStyled>
  );
};

const ExpenseFormStyled = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  input,
  textarea,
  select {
    font-family: inherit;
    font-size: inherit;
    outline: none;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    border: 2px solid #fff;
    background: transparent;
    resize: none;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    color: rgba(34, 34, 96, 0.9);
    &::placeholder {
      color: rgba(34, 34, 96, 0.4);
    }
  }
  .input-control {
    input {
      width: 100%;
    }
  }

  .selects {
    display: flex;
    justify-content: flex-end;
    select {
      color: rgba(34, 34, 96, 0.4);
      &:focus,
      &:active {
        color: rgba(34, 34, 96, 1);
      }
    }
  }

  .submit-btn {
    button {
      box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
      &:hover {
        background: var(--color-green) !important;
      }
    }
  }
`;

export default ExpenseForm;
