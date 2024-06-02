import { useState } from "react";
import { useAddTransaction } from "../../hooks/useAddTransaction";
import { useGetTransaction } from "../../hooks/useGetTransaction";
import { useGetUserInfo } from "../../hooks/useGetUserInfo";
import "./style.css";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase-config";
import { useNavigate } from "react-router-dom";

export const Journal = () => {
    const { addTransaction } = useAddTransaction();
    const { transaction , transactionTotals } = useGetTransaction();
    const { name, profilePhoto } = useGetUserInfo();
    const navigate = useNavigate();

    const [description, setDescription] = useState("");
    const [transactionAmount, setTransactionAmount] = useState("");
    const [transactionType, setTransactionType] = useState("expense");

    const {balance , income , expense} =transactionTotals;

    const onSubmit = (e) => {
        e.preventDefault();
        alert("transaction added succesfully!")
        addTransaction({
            description,
            transactionAmount,
            transactionType,
        });
        setDescription("");
        setTransactionAmount(0);
    };

    const signUserOut = async () => {
        try {
            await signOut(auth);
            localStorage.clear();
            navigate("/");
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <div className="journal">
                <div className="profile">
                    {profilePhoto && <img className="profile-photo" src={profilePhoto} alt="Profile" />}
                    <button className="sign-out-bt" onClick={signUserOut}>Sign Out</button>
                </div>
                <div className="container">
                    <h1>{name}'s Expense Tracker</h1>
                    <div className="balance">
                        <h3>Your Balance</h3>
                        {balance >= 0 ? <h2> Rs.{balance}</h2> : <h2> -Rs.{balance * -1}</h2>}
                    </div>
                    <div className="summary">
                        <div className="income">
                            <h4>Income</h4>
                            <p>Rs.{income}</p>
                        </div>
                        <div className="expense">
                            <h4>Expenses</h4>
                            <p>Rs.{expense}</p>
                        </div>
                    </div>
                    <form className="add-transaction" onSubmit={onSubmit}>
                        <input
                            type="text"
                            placeholder="Description"
                            value = {description}
                            required
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <input
                            type="number"
                            placeholder="Amount"
                            value={transactionAmount}
                            required
                            onChange={(e) => setTransactionAmount(e.target.value)}
                        />
                        <input
                            type="radio"
                            id="expense"
                            value="expense"
                            checked={transactionType === "expense"}
                            onChange={(e) => setTransactionType(e.target.value)}
                        />
                        <label htmlFor="expense">Expense</label>
                        <input
                            type="radio"
                            id="income"
                            value="income"
                            checked={transactionType === "income"}
                            onChange={(e) => setTransactionType(e.target.value)}
                        />
                        <label htmlFor="income">Income</label>
                        <button type="submit">Add Transaction</button>
                    </form>
                </div>
                <div className="transaction">
                    <h3>Transactions</h3>
                    <ul>
                        {transaction.map((t) => {
                            const { description, transactionAmount, transactionType } = t;
                            return (
                                <li key={t.id}>
                                    <h4>{description}</h4>
                                    <p>
                                        Rs.{transactionAmount} . <label style={{ color: transactionType === "expense" ? "red" : "green" }}>{transactionType}</label>
                                    </p>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </>
    );
};
