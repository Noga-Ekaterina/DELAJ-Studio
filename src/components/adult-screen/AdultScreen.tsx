import {FC} from 'react';
import './adult-screen.scss';
import Link from 'next/link';
import { IWithClass } from '@/types';

const AdultScreen: FC<IWithClass> = () => {
  return (
    <Link href="/for-adult" className='adult-screen' prefetch={false}>
      
    </Link>
  );
};

export default AdultScreen;