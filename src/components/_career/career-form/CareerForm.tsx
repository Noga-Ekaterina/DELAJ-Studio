import React, {FormEvent, Fragment, useEffect, useRef, useState} from 'react';
import {Formik, Form, Field, FormikHelpers} from 'formik';
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
import Alert from "@/components/_career/career-form/Alert";

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
  const [isSubmiting, setIsSubmiting] = useState(false)
  const [submitIsError, setSubmitIsError] = useState(false)
  const timeout=useRef<NodeJS.Timeout | null>(null)

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

  const handleSubmit= async (values: { [key: string]: string | boolean, acceptTerms: boolean }, {resetForm}: FormikHelpers<typeof values>) => {
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

      try {
        const response = await fetch('/api/form', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            values,
            vacancy,
          }),
        });

        const data = await response.json();

        if (!response.ok || response.status!=200) {
          throw new Error()
        }

        setSubmitIsError(false)
        // Действия при успешной отправке
        resetForm({
          values: {
            ...inputsObj,
            acceptTerms: false, // Обязательно сбрасывайте состояние чекбокса
          },
        });
        setTimeout(()=> setIsSubmiting(true), 100)

      } catch (err){
        setSubmitIsError(true)
        setIsSubmiting(true)
      } finally {
        timeout.current=setTimeout(()=> setIsSubmiting(false), 3000)

      }
    }
  }

  useEffect(() => {
    return ()=>{
      if (timeout.current){
        clearTimeout(timeout.current)
      }
    }
  }, []);

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
      onSubmit={handleSubmit}
  >
      <Form className='career-form'>
        <fieldset disabled={isDisabled}>
          {
            formText.inputs.map((input, index)=>(
                <Fragment key={`career-form-${input.name}-${index}`}>
                  <Field
                      name={input.name}
                      type="text"
                      render={({field}:IField)=>(
                          <Input
                              field={field}
                              input={input}
                              isError={isErrorsObj[input.name]}
                              setIsError={changeError(input.name)}
                              isShowError={isShowErrors}
                          />
                      )}
                  />
                </Fragment>
            ))
          }
          <Alert isShow={isSubmiting} key="alert"/>

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