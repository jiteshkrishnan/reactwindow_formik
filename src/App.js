import { FixedSizeList as List, areEqual } from "react-window";
import { useEffect, memo, useCallback } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import UserForm from "./UserForm";
import { results } from "./atoms";
import "./styles.css";
import { deepDiffBetweenObjects } from "./diff";

const Row = memo(({ index, style, data }) => {
  console.log("rendering row ", index);
  const item = data[index];
  const updateFn = useSetRecoilState(results);

  const updateValues = useCallback((values) => {
    console.log("VALUES", values);
    const modifiedObj = { ...item, ...values };
    console.log("DIFF### ", deepDiffBetweenObjects(values, item));
    // console.log("modifiedObj", modifiedObj);
    updateFn((results) => [
      ...results.slice(0, index),
      modifiedObj,
      ...results.slice(index + 1)
    ]);
  }, []);

  return (
    <div style={style}>
      <UserForm index={index} updateValues={updateValues} item={item} />
    </div>
  );
}, areEqual);

export default function App() {
  const [records, setRecords] = useRecoilState(results);
  console.log("Records ", records);
  useEffect(() => {
    fetch("https://randomuser.me/api/?results=50&nat=gb")
      .then((res) => res.json())
      .then(({ results: data }) =>
        data.map((user) => ({
          ...user,
          friends: [
            { first: "John", last: "Grisham" },
            { first: "Peter", last: "Kirsten" }
          ]
        }))
      )
      .then((records) => setRecords(records));
  }, []);
  return (
    <div className="App">
      <List
        height={700}
        itemCount={records.length}
        itemData={records}
        itemSize={100}
        width={1000}
      >
        {Row}
      </List>
    </div>
  );
}
