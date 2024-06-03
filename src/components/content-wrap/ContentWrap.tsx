import { IWithChildren, IWithClass } from '@/types';
import {FC} from 'react';
import contentWrapImage from '../../../public/images/content-wrap-image.png'
import Image from 'next/image';
import cn from 'classnames';
import './content-wrap.scss'

interface Props extends IWithChildren, IWithClass {} 

const ContentWrap: FC<Props> = (props) => {
  const className = cn('content-wrap', props.className);

  return (
    <div className={className}>
        <Image 
          className='content-wrap__image'
          src={contentWrapImage} 
          alt="" 
        />
        { props.children }
    </div>
  );
};

export default ContentWrap;