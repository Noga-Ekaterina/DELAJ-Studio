import React, {FormEvent, useEffect, useState} from 'react';
import { Formik, Form, Field } from 'formik';
import './career-form.scss';
import { raleway } from '@/fonts';
import classNames from 'classnames';
import career from "@/store/text/career";
import {IFormInput} from "@/typesData";
import {useLocale} from "@/components/_hooks/useLocale";
import {observer} from "mobx-react-lite";
import cn from "classnames";

interface PropsForm{
  vacancy: string
}

interface IField{
  [key: string]: any
  value: string
}

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
        console.log(setIsError(checkTel(value)))
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

const CareerItemForm = (props: PropsForm) => {
  const locale=useLocale()
  const {formText} = career
  const [inputsObj, setInputsObj] = useState<{ [key: string]: string }>({})
  const [isErrorsObj, setIsErrorsObj] = useState<{ [key: string]: boolean, acceptTerms: boolean }>({acceptTerms: true})
  const [isShowErrors, setIsShowErrors] = useState(false)
  const [isErrorAcceptTerm, setIsErrorAcceptTerm] = useState(false)

  const changeError=(name:string)=>{
    const func=(isError: boolean)=>{
      setIsErrorsObj(prevState => ({...prevState, [name]: isError}))
      console.log(isError)
    }

    return func
  }

  const handleCheked=(e: FormEvent<HTMLInputElement>)=> {
    setIsErrorsObj(prevState => ({
      ...prevState,
      acceptTerms: !(e.target as HTMLInputElement).checked
    }))

  }

  const handleSubmit= async (values: { [key: string]: string | boolean, acceptTerms: boolean })=>{
    if (!formText) return

    console.log("subm")
    let text= `<b>${props.vacancy}</b>%0A%0A`

    formText.inputs.map(input=>{
      text+=`<b>${input.placeholder.ru}:</b> ${values[input.name]}%0A`
    })

    text=text.replaceAll("+", "%2b")

    const resp= await fetch(
        `https://api.telegram.org/bot${process.env.NEXT_PUBLIC_TG_BOT_TOKEN}/sendMessage?chat_id=${process.env.NEXT_PUBLIC_CHAT_ID}&parse_mode=html&text=${text}`,
        {
          method: "POST",
          headers:{
            "Content-Type": "application/json"
          }
        }
    )

  }

  useEffect(() => {
    if (!formText) return

    const inputsResult: {[key: string]: string}={}
    const errorsResult: {[key: string]: boolean}={}

    formText.inputs.forEach(input=>{
      inputsResult[input.name]=""
      errorsResult[input.name]= true
    })


    setInputsObj(inputsResult)
    setIsErrorsObj(prevState => ({...prevState, ...errorsResult}))
  }, [formText]);

  useEffect(() => {
    setIsErrorAcceptTerm(isShowErrors && isErrorsObj.acceptTerms)
  }, [isShowErrors, isErrorsObj]);

  if (!formText) return <div/>

  return (
    <Formik
      initialValues={{
        ...inputsObj,
        acceptTerms: false as boolean
      }}
      onSubmit={(values: { [key: string]: string | boolean, acceptTerms: boolean }, {resetForm}) => {
        if (!formText) return


        let isErrors= false
        const inputs= formText.inputs
        for (let i=0; i<=inputs.length-1; i++){
          if (isErrorsObj[inputs[i].name]){
            isErrors=true
            break
          }
        }

        if (isErrors) {
          setIsShowErrors(true)
        }else {
          setIsShowErrors(false)
          handleSubmit(values)
          resetForm({
            values: {
              ...inputsObj,
              acceptTerms: false, // Обязательно сбрасывайте состояние чекбокса
            },
          });

        }
      }}
  >
    <Form className='career-form'>
      {
        formText.inputs.map((input, index)=>(
            <>
              <Field
                  name={input.name}
                  type="text"
                  render={({field}:IField)=>(
                      <Input
                          field={field}
                          input={input}
                          key={`career-form-${input.name}-${index}`}
                          isError={isErrorsObj[input.name]}
                          setIsError={changeError(input.name)}
                          isShowError={isShowErrors}
                      />
                  )}
              />
            </>
        ))
      }

      <div className="career-form__bottom">
        <label className="career-form__checkbox-wrapp" htmlFor="acceptTerms">
          <Field type="checkbox" name="acceptTerms" id='acceptTerms' onInput={handleCheked}/>
          <span
              className={cn(
                  "career-form__checkbox",
                  isErrorAcceptTerm && "career-form__checkbox--error"
              )}></span>
          <span className={cn(
              "career-form__checkbox-text",
              isErrorAcceptTerm && "career-form__checkbox-text--error"
          )}
          >
             {formText.acceptTerms[locale]}
          </span>
        </label>

        <button className={classNames('career-form__submit', raleway.className)} type="submit">{formText.button[locale]}</button>
      </div>
    </Form>
  </Formik>
  );
};

export default observer(CareerItemForm);