import React from 'react';
import { Formik, Form, Field } from 'formik';
import './career-form.scss';
import { raleway } from '@/fonts';
import classNames from 'classnames';

const CareerItemForm = () => {
  return (
    <Formik
      initialValues={{
        name: '',
        phone: '',
        email: '',
        portfolio: '',
        telegram: '',
        about: '',
        acceptTerms: false
      }}
      onSubmit={values => {
        
      }}
  >
    <Form className='career-form'>
      <label className="career-form__field">
        <div className="input-wrap">
          <Field id="name" name="name" placeholder="полное имя"/>
        </div>
      </label>
      <label className="career-form__field">
        <div className="input-wrap">
          <Field id="phone" name="phone" placeholder="телефон"/>
        </div>
      </label>
      <label className="career-form__field">
        <div className="input-wrap">
          <Field id="email" name="email" placeholder="E-mail"/>
        </div>
      </label>
      <label className="career-form__field">
        <div className="input-wrap">
          <Field id="portfolio" name="portfolio" placeholder="портфолио"/>
        </div>
        <p>постоянная ссылка, желательно на открытый источник</p>
      </label>
      <label className="career-form__field">
        <div className="input-wrap">
          <Field id="telegram" name="telegram" placeholder="telegram"/>
        </div>
      </label>
      <label className="career-form__field">
        <div className="input-wrap">
          <Field id="about" name="about" placeholder="о себе"/>
        </div>
        <p>опыт работы, софт</p>
        <div className="career-form__field-notice">
          <p>дополнительные способы связи</p>
          <p className='red-notice'><strong>не прикладывать</strong> ссылки на диски!</p>
        </div>
      </label>
      <div className="career-form__bottom">
        <div className="career-form__checkbox">
          <Field type="checkbox" name="acceptTerms" required/>
          <label htmlFor='acceptTerms'>Я согласен на обработку персональных данных</label>
        </div>

        <button className={classNames('career-form__submit', raleway.className)} type="submit">откликнуться</button>
      </div>
    </Form>
  </Formik>
  );
};

export default CareerItemForm;