import React, {FC} from 'react';
import CareerPage from "@/components/_career/career-page/CareerPage";

interface Props {
  params: {
    id: string
  }
}
const Page:FC<Props> = ({params}) => {
  const {id} =params

  return(
      <CareerPage id={Number(id)}/>
  )
};

export default Page;
