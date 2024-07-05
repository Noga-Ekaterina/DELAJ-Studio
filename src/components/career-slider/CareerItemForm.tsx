import React from 'react';
import { Formik, Form, Field } from 'formik';
import './career-item-form.scss';

const CareerItemForm = () => {
  return (
    <Formik
      initialValues={{
        name: '',
        phone: '',
        email: '',
        portfolio: '',
        telegram: '',
        about: ''
      }}
      onSubmit={values => {
        
      }}
  >
    <Form className='career-item-form'>
      <label className="career-item-form__field">
        <Field id="name" name="name" placeholder="полное имя"/>
      </label>
      <label className="career-item-form__field">
        <Field id="phone" name="phone" placeholder="телефон"/>
      </label>
      <label className="career-item-form__field">
        <Field id="email" name="email" placeholder="E-mail"/>
      </label>
      <label className="career-item-form__field">
        <Field id="portfolio" name="portfolio" placeholder="портфолио"/>
      </label>
      <label className="career-item-form__field">
        <Field id="telegram" name="telegram" placeholder="telegram"/>
      </label>
      <label className="career-item-form__field">
        <Field id="about" name="about" placeholder="о себе"/>
      </label>
      <button type="submit">Submit</button>
    </Form>
  </Formik>
  );
};

export default CareerItemForm;