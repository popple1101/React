import { FaTrash } from "react-icons/fa";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";

export default function TodosList({ todos, onCheckedUpdate, onRemoved }) {
  return (
    <table border="1" style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr>
          {todos.map((t, idx) => (
            <th
              key={`time-${idx}`}
              style={{
                backgroundColor: "#f8f9fa",
                padding: "10px",
                textAlign: "center",
              }}
            >
              {t.time}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr>
          {todos.map((t, idx) => (
            <td
              key={`todo-${idx}`}
              style={{ padding: "10px", textAlign: "center" }}
            >
              {t.text}
            </td>
          ))}
        </tr>
        <tr>
          {todos.map((t, idx) => (
            <td
              key={`chk-${idx}`}
              style={{ padding: "10px", textAlign: "center" }}
            >
              <div
                className={`checkbox ${t.checked ? "checked" : ""}`}
                onClick={() => onCheckedUpdate(t.time, t.checked)}
              >
                {t.checked ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
                {t.checked ? "완료" : "미완료"}
              </div>
            </td>
          ))}
        </tr>
        <tr>
          {todos.map((t, idx) => (
            <td
              key={`rmv-${idx}`}
              style={{ padding: "10px", textAlign: "center" }}
            >
              <div className="remove" onClick={() => onRemoved(t.time)}>
                <FaTrash />
              </div>
            </td>
          ))}
        </tr>
      </tbody>
    </table>
  );
}