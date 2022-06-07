import { useState } from "react";

const UseState = <T,>({
  state,
  setState,
}: {
  state: T;
  setState: React.Dispatch<T>;
}) => {
  const [key, setKey] = useState("");
  const [type, setType] = useState<"object" | "string">("string");
  const [stringValue, setStringValue] = useState("");
  const [objectValue, setObjectValue] = useState({});
  return (
    <table border={1}>
      <tbody>
        {Object.entries(state).map(([k, v]) => (
          <tr key={k}>
            <th>{k}</th>
            <td>
              {typeof v == "string" ? (
                v
              ) : (
                <UseState
                  state={v}
                  setState={(v) => setState({ ...state, [k]: v })}
                />
              )}
            </td>
            <td>
              <button
                onClick={() => {
                  delete (state as any)[k];
                  setState({ ...state });
                }}
              >
                DELETE
              </button>
            </td>
          </tr>
        ))}
        <tr>
          <th>PUT</th>
          <td>
            <div style={{ display: "flex" }}>
              <input
                type="text"
                value={key}
                onChange={({ target: { value } }) => setKey(value)}
              />
              <select
                value={type}
                onChange={({ target: { value } }) =>
                  setType(value as "string" | "object")
                }
              >
                <option value="string">string</option>
                <option value="object">object</option>
              </select>
              {type == "string" && (
                <input
                  type="text"
                  value={stringValue}
                  onChange={({ target: { value } }) => setStringValue(value)}
                />
              )}
              {type == "object" && (
                <UseState state={objectValue} setState={setObjectValue} />
              )}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setState({
                    ...state,
                    [key]:
                      type == "string"
                        ? stringValue
                        : type == "object"
                        ? objectValue
                        : "ERROR",
                  });
                  setKey("");
                  setType("string");
                  setStringValue("");
                  setObjectValue({});
                }}
              >
                submit
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default () => {
  const [state, setState] = useState({ a: "b", "depth-1": { a: "b" } });

  return <UseState state={state} setState={setState} />;
};
