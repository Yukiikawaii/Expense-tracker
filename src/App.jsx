import Header from "./components/Header";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import { useState, useEffect } from "react";

const FILTER_OPTIONS = ["All", "Food", "Bill", "Shopping", "Other"];

export default function App() {
  const [expense, setExpense] = useState(() => {
    const saved = localStorage.getItem("expense");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("expense", JSON.stringify(expense));
  }, [expense]);

  const [editItem, setEdit] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");

  function handleSubmit(expenseData) {
    if (editItem) {
      setExpense(expense.map((item) =>
        editItem.id === item.id ? { ...item, ...expenseData } : item
      ));
      setEdit(null);
    } else {
      setExpense([...expense, { id: Date.now(), ...expenseData }]);
    }
  }

  function handleDelete(id) {
    setExpense(expense.filter((item) => item.id !== id));
  }

  function handleEdit(item) {
    setEdit(item);
  }

  const filtered =
    selectedCategory === "All"
      ? expense
      : expense.filter((item) => item.category === selectedCategory);

  const total = filtered.reduce((sum, item) => sum + Number(item.amount), 0);

  return (
    <div className="min-h-screen bg-gray-100 py-6 px-4">
      <div className="max-w-md mx-auto">
        <Header />
        <ExpenseForm
          onSubmit={handleSubmit}
          onEdit={editItem}
          onCancel={() => setEdit(null)}
        />

        {/* List card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 px-5 py-4">
          {/* Filter pills */}
          <div className="flex gap-2 flex-wrap mb-4">
            {FILTER_OPTIONS.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-full text-sm border transition font-medium ${
                  selectedCategory === cat
                    ? "bg-gray-900 text-white border-gray-900"
                    : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400">
              {filtered.length} expense{filtered.length !== 1 ? "s" : ""}
            </span>
            <span className="text-base font-bold text-green-600">
              ₱{total.toLocaleString("en-PH", { minimumFractionDigits: 2 })}
            </span>
          </div>

          <ExpenseList
            expense={filtered}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        </div>
      </div>
    </div>
  );
}