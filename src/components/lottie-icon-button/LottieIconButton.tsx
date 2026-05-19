'use client';

import {ButtonHTMLAttributes, useCallback, useEffect, useRef, useState} from 'react';
import Lottie, {LottieRefCurrentProps} from '@/components/lottie-client/LottieClient';

type AnimationData = unknown;

type BaseProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> & {
  iconClassName?: string;
  animationData: AnimationData;
  hoverAnimationData?: AnimationData;
  outAnimationData?: AnimationData;
  hoverSpeed?: number;
  hoverEnabled?: boolean;
  loop?: boolean;
  autoplay?: boolean;
  resetHoverOnAnimationChange?: boolean;
  onComplete?: () => void;
  onHoverChange?: (isHover: boolean, isWasHover: boolean) => void;
};

type ReverseHoverProps = BaseProps & {
  variant?: 'reverse-hover';
};

type SwapHoverProps = BaseProps & {
  variant: 'swap-hover';
  hoverAnimationData: AnimationData;
  outAnimationData: AnimationData;
  hoverSpeed?: number;
};

type Props = ReverseHoverProps | SwapHoverProps;

const LottieIconButton = (props: Props) => {
  const {
    className,
    iconClassName,
    animationData,
    hoverAnimationData,
    outAnimationData,
    hoverSpeed,
    hoverEnabled = true,
    loop = false,
    autoplay = true,
    resetHoverOnAnimationChange = false,
    onComplete,
    onHoverChange,
    variant = 'reverse-hover',
    type = 'button',
    onMouseOver,
    onMouseOut,
    onClick,
    ...buttonProps
  } = props;
  const [isHover, setIsHover] = useState(false);
  const [isWasHover, setIsWasHover] = useState(false);
  const [canHover, setCanHover] = useState(false);
  const ref = useRef<LottieRefCurrentProps | null>(null);
  const isHoverActive = hoverEnabled && canHover;

  const isSwapHover = variant === 'swap-hover';
  const currentAnimationData = isSwapHover
    ? isHover && isHoverActive
      ? hoverAnimationData
      : isWasHover && isHoverActive
        ? outAnimationData
        : animationData
    : isWasHover && isHoverActive && hoverAnimationData
      ? hoverAnimationData
      : animationData;
  const shouldPlay = autoplay || isWasHover;

  useEffect(() => {
    const hoverMedia = window.matchMedia('(hover: hover) and (pointer: fine)');

    const updateCanHover = () => {
      setCanHover(hoverMedia.matches);
    };

    updateCanHover();
    hoverMedia.addEventListener('change', updateCanHover);

    return () => {
      hoverMedia.removeEventListener('change', updateCanHover);
    };
  }, []);

  useEffect(() => {
    if (canHover) return;

    setIsHover(false);
    setIsWasHover(false);
  }, [canHover]);

  useEffect(() => {
    if (!resetHoverOnAnimationChange) return;

    setIsHover(false);
    setIsWasHover(false);
  }, [animationData, resetHoverOnAnimationChange]);

  const playCurrentAnimation = useCallback(() => {
    if (!shouldPlay) return;

    if (!isSwapHover) {
      ref.current?.setDirection(isHoverActive && isWasHover && !isHover ? -1 : 1);
    }

    ref.current?.play();
  }, [isHover, isHoverActive, isSwapHover, isWasHover, shouldPlay]);

  useEffect(() => {
    if (isSwapHover) {
      if (isWasHover && hoverSpeed) {
        ref.current?.setSpeed(hoverSpeed);
      }

      playCurrentAnimation();
      return;
    }

    playCurrentAnimation();
  }, [currentAnimationData, hoverSpeed, isSwapHover, isWasHover, playCurrentAnimation]);

  return (
    <button
      {...buttonProps}
      className={className}
      type={type}
      onMouseOver={(event) => {
        if (isHoverActive) {
          setIsHover(true);
          setIsWasHover(true);
          onHoverChange?.(true, true);
        }
        onMouseOver?.(event);
      }}
      onMouseOut={(event) => {
        if (isHoverActive) {
          setIsHover(false);
          onHoverChange?.(false, isWasHover);
        }
        onMouseOut?.(event);
      }}

      onClick={(event) => {
        if (isHoverActive) {
          setIsHover(false);
        }
        onClick?.(event);
      }}
    >
      <Lottie
        animationData={currentAnimationData}
        autoplay={autoplay}
        className={iconClassName}
        loop={loop}
        lottieRef={ref}
        onComplete={onComplete}
        onDOMLoaded={playCurrentAnimation}
      />
    </button>
  );
};

export default LottieIconButton;
