import { useState, useEffect } from "react";

export default function ExpenseForm({ onSubmit, onEdit, onCancel }) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");

  useEffect(() => {
    if (onEdit) {
      setDescription(onEdit.description);
      setAmount(onEdit.amount);
      setCategory(onEdit.category);
    } else {
      setDescription("");
      setAmount("");
      setCategory("Food");
    }
  }, [onEdit]);

  function handleSubmit() {
    if (description.trim() === "" || !amount || Number(amount) <= 0) return;
    onSubmit({ description, amount: Number(amount), category });
    setDescription("");
    setAmount("");
    setCategory("Food");
  }

  function handleCancel() {
    setDescription("");
    setAmount("");
    setCategory("Food");
    onCancel();
  }

  const inputClass =
    "w-full border border-gray-200 rounded-xl px-4 py-2.5 text-gray-800 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white";
  const labelClass = "block text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1.5";

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 px-5 py-5 mb-3">
      {onEdit && (
        <p className="text-xs text-blue-500 font-medium mb-3">✏️ Editing expense</p>
      )}

      {/* Description */}
      <div className="mb-4">
        <label className={labelClass}>Description</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="e.g. Grocery run"
          className={inputClass}
        />
      </div>

      {/* Amount + Category side by side */}
      <div className="flex gap-3 mb-4">
        <div className="flex-1">
          <label className={labelClass}>Amount (₱)</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            min="0"
            step="0.01"
            className={inputClass}
          />
        </div>
        <div className="flex-1">
          <label className={labelClass}>Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={inputClass}
          >
            <option value="Food">Food</option>
            <option value="Bill">Bill</option>
            <option value="Shopping">Shopping</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-2">
        <button
          onClick={handleSubmit}
          className="flex-1 bg-gray-900 text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-gray-700 transition"
        >
          {onEdit ? "Update expense" : "Add expense"}
        </button>
        {onEdit && (
          <button
            onClick={handleCancel}
            className="flex-1 bg-gray-100 text-gray-600 py-2.5 rounded-xl text-sm font-semibold hover:bg-gray-200 transition"
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
}