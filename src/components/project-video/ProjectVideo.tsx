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
    <video className={classNames(props.className)} controls preload="metadata">
      <source src={props.src} type="video/mp4" />
    </video>
  );
};

export default ProjectVideo;