import React from 'react';
import { Transition } from 'react-transition-group';
import {transitionStyles} from "@/vars";

// Типы для пропсов компонента
interface Props {
  isShow: boolean;
}

const styles: { [key: string]: React.CSSProperties } = {
  entering: { opacity: 1 },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
  exited: { opacity: 0 },
};

const Alert = ({isShow}: Props) => {
  return (
      <Transition in={isShow} timeout={700} unmountOnExit>
        {(state) => (
            <div
                style={{
                  ...transitionStyles,
                  ...styles[state],
                }}
                className="career-form__alert"
            >
              отправлено
            </div>
        )}
      </Transition>
  );
};

export default Alert;
