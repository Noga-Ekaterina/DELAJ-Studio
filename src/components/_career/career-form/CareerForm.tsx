import React, {useEffect, useState} from 'react';
import { Formik, Form, Field } from 'formik';
import './career-form.scss';
import { raleway } from '@/fonts';
import classNames from 'classnames';
import career from "@/store/text/career";
import {IFormInput} from "@/typesData";
import {useLocale} from "@/components/_hooks/useLocale";

interface IInputProps{
  input: IFormInput
}
const Input=({input}:IInputProps)=>{
  const [value, setValue] = useState('')
  const locale=useLocale()
  const [note, setNote] = useState("")

  useEffect(() => {
    if (!input.note) return

    const {text, red, underline}=input.note[locale]
    let result= text

    if (red){
      red.map(str=>{
        result=result.replace(str, `<span class="red">${str}</span>`)
      })
    }

    if (underline){
      underline.map(str=>{
        result=result.replace(str, `<span class="underline">${str}</span>`)
      })
    }

    setNote(result)
  }, [locale]);

  useEffect(() => {
    console.log(value)
  }, [value]);

  return (
      <label htmlFor={input.name} className="career-form__field">
        <div className="input-wrap">
          <Field id={input.name} name={input.name} type={input.type}
            onInput={(e: React.FormEvent<HTMLInputElement>) => setValue((e.target as HTMLInputElement).value)}
          />
        </div>
        <div
            className="career-form__block-placeholder"
            style={{opacity: value.length>0? 0:1}}
        >
          <span className="career-form__placeholder">{input.placeholder[locale]}</span>
          <p className="career-form__note" dangerouslySetInnerHTML={{__html: note}}></p>
        </div>
      </label>
  )
}

const CareerItemForm = () => {
  const locale=useLocale()
  const {formText} = career
  const [inputsObj, setInputsObj] = useState<{ [key: string]: string }>({})

  useEffect(() => {
    if (!formText) return

    const result: {[key: string]: string}={}

    formText.inputs.forEach(input=>{
      result[input.name]=""
    })

    setInputsObj(result)
  }, [formText]);

  if (!formText) return <div/>

  return (
    <Formik
      initialValues={{
        ...inputsObj,
        acceptTerms: false
      }}
      onSubmit={values => {
        
      }}
  >
    <Form className='career-form'>
      {
        formText.inputs.map((input, index)=>(
            <Input input={input} key={`career-form-${input.name}-${index}`}/>
        ))
      }

      <div className="career-form__bottom">
        <label className="career-form__checkbox-wrapp">
          <Field type="checkbox" name="acceptTerms" required id='acceptTerms'/>
          <span className="career-form__checkbox"></span>
          <span className="career-form__checkbox-text">{formText.acceptTerms[locale]}</span>
        </label>

        <button className={classNames('career-form__submit', raleway.className)} type="submit">{formText.button[locale]}</button>
      </div>
    </Form>
  </Formik>
  );
};

export default CareerItemForm;