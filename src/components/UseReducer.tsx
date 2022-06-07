import { FC, useReducer, useState } from "react";
import { INITIAL_STATE } from "../initialState";
import { UseStateComponent } from "./UseState";

const UseReducer = <T,>({
  state,
  dispatch,
  path,
}: {
  state: T;
  dispatch: React.Dispatch<Record<string, any>>;
  path: string;
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
                ) : typeof v == "object" ? (
                  <UseReducer
                    state={v}
                    dispatch={dispatch}
                    path={`${path}{${k}`}
                  />
                ) : null}
              </td>
              <td>
                <button
                  onClick={() => {
                    dispatch({ [`${path}{${k}`]: undefined });
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
                  state={objectValue as any}
                  setState={setObjectValue}
                />
              )}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  dispatch({
                    [`${path}{${key}`]:
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

const reducer = (state: any, action: Record<string, any>) => {
  Object.entries(action).forEach(([k, v]) => {
    const [pop, ...path] = k.split("{").filter(Boolean).reverse();
    path.reverse().reduce((acc, k) => acc[k], state)[pop] = v;
  });

  return { ...state };
};

export default () => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  return <UseReducer state={state} dispatch={dispatch} path="" />;
};
