import React, {useEffect, useState} from 'react';
import "./flashing-list.scss"
import cn from "classnames";

interface Props{
  strings: string[]
}

const FlashingList = ({strings}:Props) => {
  const [indexActive, setIndexActive] = useState(0)
  let timeout: ReturnType<typeof setTimeout>

  useEffect(() => {

    return ()=> clearTimeout(timeout)
  }, []);

  useEffect(() => {
    timeout= setTimeout(()=>{
      console.log(indexActive)
      if (indexActive>=strings.length-1)
        setIndexActive(0)
      else
        setIndexActive(prevState => prevState+1)
    }, 600)
  }, [indexActive]);

  return (
      <ul className="flashing-list">
        {
          strings.map((str, index)=>(
              <li
                  key={`flashing-list-${index}`}
                  className={cn(
                      "flashing-list__item",
                      index===indexActive && "flashing-list__item--active",
                  )}
              >
                {str}
              </li>
          ))
        }
      </ul>
  );
};

export default FlashingList;
