import { useRef, forwardRef, useState } from "react"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Input = forwardRef(( { textarea, children , datearea, classic, }, ref) => {
    const [date, setDate] = useState(new Date());

    return <section className="flex flex-col gap-1 my-4">
        
        <label className="text-sm font-bold uppercase text-stone-500">{children}</label>
        {textarea && <textarea ref={ref} className="w-64 px-2 py-1 rounded-sm bg-stone-200"></textarea>}
        {classic &&  <input ref={ref} className="w-64 px-2 py-1 rounded-sm bg-stone-200"></input>}
        {datearea && <div>
      <DatePicker ref={ref} selected={date} onChange={(date) => setDate(date)} />
    </div>}
    </section>
});

export default Input;