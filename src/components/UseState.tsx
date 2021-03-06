import { useState } from "react";
import { INITIAL_STATE } from "../initialState";

export const UseStateComponent = <T,>({
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
        {Object.entries(state)
          .filter(([k, v]) => typeof v != "undefined")
          .map(([k, v]) => (
            <tr key={k}>
              <th>{k}</th>
              <td>
                {typeof v == "string" ? (
                  v
                ) : (
                  <UseStateComponent
                    state={v}
                    setState={(v) => setState({ ...state, [k]: v })}
                  />
                )}
              </td>
              <td>
                <button
                  onClick={() => {
                    setState({ ...state, [k]: undefined });
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
                <UseStateComponent
                  state={objectValue}
                  setState={setObjectValue}
                />
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
  const [state, setState] = useState(INITIAL_STATE);

  return <UseStateComponent state={state} setState={setState} />;
};
