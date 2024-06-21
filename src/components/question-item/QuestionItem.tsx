'use client';
import { FC, useState } from 'react';
import cn from 'classnames';

interface Props {
  title: string
  answer: string
}

const QuestionItem: FC<Props> = (props) => {
  const [opened, setOpened] = useState(false);
  const toggleOpened = () => {
    setOpened(state => !state);
  }

  return (
    <div className={cn("faq-list__row", opened && 'opened')} onClick={toggleOpened}>
      <p className='faq-list__row-title'>{props.title}</p>
      <p className='faq-list__row-answer'>{props.answer}</p>
    </div>
  );
};

export default QuestionItem;