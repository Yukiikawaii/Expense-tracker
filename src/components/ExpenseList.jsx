import ExpenseItem from "./ExpenseItem";

export default function ExpenseList({ expense, onDelete, onEdit }) {
  return (
    <div>
      {expense.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10 text-gray-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-10 h-10 mb-2 text-gray-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 14H7a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v6a2 2 0 01-2 2h-2M9 14v4m0 0h6m-6 0H7m8-4v4"
            />
            <line x1="4" y1="4" x2="20" y2="20" strokeWidth={1.5} />
          </svg>
          <p className="text-sm">No expenses yet</p>
        </div>
      ) : (
        expense.map((item) => (
          <ExpenseItem
            key={item.id}
            expense={item}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))
      )}
    </div>
  );
}