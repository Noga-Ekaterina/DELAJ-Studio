import React, {FormEvent, useEffect, useState} from 'react';
import { Formik, Form, Field } from 'formik';
import './career-form.scss';
import { raleway } from '@/fonts';
import classNames from 'classnames';
import career from "@/store/text/career";
import {IForm, IFormInput} from "@/typesData";
import {useLocale} from "@/components/_hooks/useLocale";
import {observer} from "mobx-react-lite";
import cn from "classnames";
import {IField} from "@/types";
import Input from "@/components/_career/career-form/Input";

interface PropsForm{
  vacancy: string
  formText?: null|IForm
  isDisabled: boolean
}

const CareerItemForm = ({vacancy, formText, isDisabled}: PropsForm) => {
  const locale=useLocale()
  const [inputsObj, setInputsObj] = useState<{ [key: string]: string }>({})
  const [isErrorsObj, setIsErrorsObj] = useState<{ [key: string]: boolean, acceptTerms: boolean }>({acceptTerms: true})
  const [isShowErrors, setIsShowErrors] = useState(false)
  const [isErrorAcceptTerm, setIsErrorAcceptTerm] = useState(false)

  const changeError=(name:string)=>{
    const func=(isError: boolean)=>{
      setIsErrorsObj(prevState => ({...prevState, [name]: isError}))
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

    let text= `<b>${vacancy}</b>%0A%0A`

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
        <fieldset disabled={isDisabled}>
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

            <button className={classNames('career-form__submit', raleway.className)} type="submit">{isDisabled? formText.buttonDisabled[locale] : formText.button[locale]}</button>
          </div>
        </fieldset>
      </Form>
  </Formik>
  );
};

export default observer(CareerItemForm);