import {FC} from 'react';
import './adult-screen.scss';
import Image from 'next/image';

//Images
import japLogo from '../../../public/images/kids/sceen-red-logo.svg';
import adultLogo from '../../../public/images/adult/logo.svg';
import screenBandit from '../../../public/images/adult/screen-bandit.png';

import TextLogo from '../text-logo/TextLogo';
import { courierNew } from '@/fonts';
import cn from 'classnames';
import { Transition, TransitionStatus } from 'react-transition-group';

interface Props {
  isOpened: boolean
}

const transition = {transition: '0.4s'};
const yellowBanditStyles = {
  entering: { right: '30px' },
  entered:  { right: '30px' },
  exiting:  { right: '-350px' },
  exited:  { right: '-350px' },
  unmounted: { right: '-350px' }
}

const AdultScreen: FC<Props> = ({ isOpened }) => { 
  const className = cn('adult-screen', isOpened ? 'opened' : '');

  return (
    <div className={className}>
                
      <div className="adult-screen__logo-wrap">
        
            <Image 
              src={japLogo} 
              className='adult-screen__jap-logo' 
              style={transition}
              alt=""
            />
        
            <Image 
              src={adultLogo} 
              className='adult-screen__big-logo'
              style={transition}
              alt=""
            />
        <TextLogo className='adult-screen__text-logo'/>
      </div>
  
      <div className={cn("adult-screen__bottom-text", courierNew.className)}>
        <p>6-22.ПАВ.(00:50)</p>
        <p>
          Ночь. Молния сверкает. 
          Льет цветной дождь. В Питере гроза. <br />
          &#60;...&#62;
        </p>
      </div>

      <Transition in={isOpened} timeout={300}>
        {state => (
          <Image 
            src={screenBandit} 
            className='adult-screen__bandit' 
            style={{
              ...transition, 
              ...yellowBanditStyles[state]
            }}
            alt=""/>
        )}
      </Transition>
    </div>
  );
};

export default AdultScreen;