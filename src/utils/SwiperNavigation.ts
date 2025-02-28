import {MutableRefObject} from "react";
import {SwiperRef} from "swiper/react";

export class SwiperNavigation {
  // Объявляем свойство swiper
  private swiper: MutableRefObject<SwiperRef | null>;

  constructor(swiper: MutableRefObject<SwiperRef | null>) {
    this.swiper = swiper;
    // console.log(swiper)
  }

  goToSlide(index: number) {
    if (this.swiper.current) {
      this.swiper.current.swiper.slideTo(index); // Перемотка на нужный слайд
    }
  }

  goToNext(){
    if (this.swiper.current)
      this.swiper.current?.swiper?.slideNext()
  }

  goToPrev(){
    if (this.swiper.current)
      this.swiper.current?.swiper?.slidePrev()
  }

  isStart(){
    if (this.swiper.current){
      const { activeIndex,} = this.swiper.current.swiper;

      return activeIndex==0
    }else
      return true
  }

  isEnd(viemSlide: number){
    if (this.swiper.current){
      const {slides, activeIndex,} = this.swiper.current.swiper;

      return activeIndex==slides.length-viemSlide
    }else
      return true
  }
}
