import { useState } from "react";
import DatePicker from "react-datepicker";

export default function DatePick() {
  const [value, setValue] = useState(new Date());
  return <DatePicker selected={value} onChange={(date) => setValue(date)} />;
}
