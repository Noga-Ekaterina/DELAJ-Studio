import { FC } from 'react';
import './showreel.scss';
import { IWithClass } from '@/types';
import classNames from 'classnames';

const Showreel: FC<IWithClass> = (props) => {
  return (
    <div className={classNames(props.className, 'showreel')}>
      <video className='showreel-main' width="320" height="240" controls={false} muted preload="none" autoPlay loop>
        <source src="/videos/showreel.mp4" type="video/mp4" />
        <track
          src="/path/to/captions.vtt"
          kind="subtitles"
          srcLang="en"
          label="English"
        />
      </video>
    </div>
  );
};

export default Showreel;