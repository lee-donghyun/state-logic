import UseState from "./components/UseState";

const App = () => {
  return (
    <div>
      <table style={{ width: "100%", marginTop: 20 }} border={1}>
        <thead>
          <tr>
            <th>useReducer</th>
            <th>redux</th>
            <th>useState</th>
            <th>recoil</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>useReducer</td>
            <td>
              <p>redux</p>
            </td>
            <td>
              <UseState />
            </td>
            <td>
              <p>recoil</p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default App;
