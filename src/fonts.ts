import Font from 'next/font/local';

export const halvar = Font({
  src: [
    {path: '../public/fonts/HalvarBreit-Bd.ttf', weight: '700'},
  ],
});

export const courierPrime = Font({
  src: [
    {path: '../public/fonts/CourierPrime-Bold.ttf', weight: '700'},
  ]
})

export const courierNew = Font({
  src: [
    {path: '../public/fonts/courier-new-bold.otf', weight: '700'},
  ]
})

export const circe = Font({
  src: [
    {path: '../public/fonts/circe.ttf', weight: '400'},
    {path: '../public/fonts/circe-extrabold.ttf', weight: '800'},
    {path: '../public/fonts/circe-bold.ttf', weight: '700'},
  ]
});