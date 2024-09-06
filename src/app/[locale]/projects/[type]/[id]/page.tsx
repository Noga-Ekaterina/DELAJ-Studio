import { IProject } from '@/types';
import { GetServerSideProps } from 'next';
import { FC } from 'react';
import { circe, halvar } from '@/fonts';
import getDuration from '@/utils/getDuration';
import classNames from 'classnames';
import BasicFooter from '@/components/basic-footer/BasicFooter';
import {observer} from "mobx-react-lite";
import projects from "@/store/text/Projects";
import Project from "@/components/project/Project";

interface Props {
  params: {
    id: string,
    locale: string
    type: string
  }
}

const Page: FC<Props> =({ params }) => {
  const { id, type } = params;

  console.log(params.locale)
  console.log("project page")


  // const pathToMaterials = path.join(process.cwd(), 'public') + '/projects-materials/' + id;
  // const files: string[] = fs.readdirSync(pathToMaterials).sort(
  //   (a: string, b: string) => {
  //     const aNum = +a.slice(0, a.indexOf('.'));
  //     const bNum = +b.slice(0, b.indexOf('.'));
  //     return (aNum > bNum) ? 1 : -1
  //   }
  // );

  return (
    <div className='project'>
      <Project id={id} type={type}/>
      <BasicFooter />
    </div>
  );
};

export default Page;