const fs = require('fs');
const path = require('path');

export default function(dirPath: string) {
  const directoryPath = path.join(__dirname, 'public', dirPath);

  function getFilesRecursively(directoryPath: string, filesList: string[]) {
      const files = fs.readdirSync(directoryPath);

      //@ts-ignore
      files.forEach((file) => {
          const filePath = path.join(directoryPath, file);
          const stat = fs.lstatSync(filePath);

          if (stat.isDirectory()) {
              getFilesRecursively(filePath, filesList);
          } else {
              filesList.push(filePath);
          }
      });
  }

  const filesList: string[] = [];
  getFilesRecursively(directoryPath, filesList);

  return filesList;
}
