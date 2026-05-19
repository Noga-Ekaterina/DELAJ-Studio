'use client';

import dynamic from 'next/dynamic';
import type {ComponentType} from 'react';
import type {LottieRefCurrentProps} from 'lottie-react';

const LottieClient = dynamic(() => import('lottie-react'), {
  ssr: false,
}) as ComponentType<any>;

export type {LottieRefCurrentProps};
export default LottieClient;
