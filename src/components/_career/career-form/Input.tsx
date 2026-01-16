import {IFormInput} from "@/typesData";
import {useLocale} from "@/components/_hooks/useLocale";
import React, {useEffect, useState} from "react";
import cn from "classnames";
import {IField} from "@/types";

interface IInputProps{
  input: IFormInput
  isError: boolean
  setIsError: (isError: boolean)=> void
  isShowError: boolean
  field: IField
}
const Input=({input, isError, setIsError, isShowError, field}:IInputProps)=>{
  const value= field.value??''
  const locale=useLocale()
  const [note, setNote] = useState("")

  useEffect(() => {
    if (!input.note) return

    const {text, highlighted}=input.note[locale]
    let result= text

    if (Array.isArray(highlighted)){
      highlighted.map(str=>{
        result=result.replace(str, `<span class="career-form__highlighted">${str}</span>`)
      })
    }

    setNote(result)
  }, [locale]);

  useEffect(() => {
    function checkTel(str: string) {
      // Регулярное выражение для проверки: строка должна начинаться с '+'
      // и далее могут быть только цифры, дефисы и пробелы
      const regex = /^\+[\d\s\-]*$/;
      const digitCount = (str.match(/\d/g) || []).length; // Считаем количество цифр

      if (regex.test(str)) {
        return digitCount>18
      } else {
        return true;
      }
    }

    function checkEmail(email: string) {
      // Регулярное выражение для проверки корректности электронной почты
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (regex.test(email)) {
        return false;
      } else {
        return true;
      }
    }

    setIsError(value.length==0)

    switch (input.type){
      case "tel":
        setIsError(checkTel(value))
        break
      case "email":
        setIsError(checkEmail(value))
        break
    }
  }, [value]);

  return (
      <label
          htmlFor={input.name}
          className={cn(
              "career-form__field",
              (isShowError && isError) && "career-form__field--error"
          )}
      >
        <div className="input-wrap">
          <input {...field} id={input.name}/>
        </div>
        <div
            className="career-form__block-placeholder"
            style={{opacity: value.length>0? 0:1}}
        >
          <span className="career-form__placeholder">{input.placeholder[locale]}</span>
          <p className="career-form__note" dangerouslySetInnerHTML={{__html: note}}></p>
        </div>

        <p className="career-form__error-text">
          {
              (value.length>0 && isError && isShowError && input.error) && <>{input.error[locale]}</>
          }
        </p>
      </label>
  )
}

export default Input