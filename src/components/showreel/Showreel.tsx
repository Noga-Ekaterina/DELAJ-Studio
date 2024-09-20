import { FC } from 'react';
import './showreel.scss';
import { IWithClass } from '@/types';
import classNames from 'classnames';
import {observer} from "mobx-react-lite";
import store from "@/store/store";

interface Props extends IWithClass{
  video: string
}
const Showreel: FC<Props> = (props) => {
  const {showMainScreen}=store
  return (
    <div className={classNames(props.className, 'showreel')}>
      {
          !showMainScreen &&

          <video className='showreel-main' width="320" height="240" controls={false} muted preload="none" autoPlay loop>
             <source media="(max-width: 640px)" src={`/Assets/Videos/showreel-${props.video}-vertical.mp4`}
                     type="video/mp4"/>
             <source media="(min-width: 641px)" src={`/Assets/Videos/showreel-${props.video}.mp4`} type="video/mp4"/>
          </video>
      }
    </div>
  );
};

export default observer(Showreel);