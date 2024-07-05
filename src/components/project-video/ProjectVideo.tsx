'use client';
import { IWithClass } from '@/types';
import classNames from 'classnames';
import { FC } from 'react';
import './project-video.scss';

interface Props extends IWithClass {
  src: string
}

const ProjectVideo: FC<Props> = (props) => {
  return (
    <video className={classNames(props.className)} controls={false} muted preload="none" autoPlay loop>
      <source src={props.src} type="video/mp4" />
      <track
        src="/path/to/captions.vtt"
        kind="subtitles"
        srcLang="en"
        label="English"
      />
    </video>
  );
};

export default ProjectVideo;