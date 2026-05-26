const CATEGORY_STYLES = {
  Food:     "bg-orange-50 text-orange-600",
  Bill:     "bg-blue-50 text-blue-600",
  Shopping: "bg-purple-50 text-purple-600",
  Other:    "bg-gray-100 text-gray-500",
};

export default function ExpenseItem({ expense, onDelete, onEdit }) {
  const badgeClass = CATEGORY_STYLES[expense.category] || CATEGORY_STYLES.Other;

  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
      <div className="flex items-center gap-3">
        <div>
          <p className="text-sm font-semibold text-gray-800">{expense.description}</p>
          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${badgeClass}`}>
            {expense.category}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-sm font-bold text-green-600">
          ₱{Number(expense.amount).toLocaleString("en-PH", { minimumFractionDigits: 2 })}
        </span>
        <button
          onClick={() => onEdit(expense)}
          className="text-xs text-blue-400 hover:text-blue-600 font-medium transition"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(expense.id)}
          className="text-xs text-red-400 hover:text-red-600 font-medium transition"
        >
          Delete
        </button>
      </div>
    </div>
  );
}