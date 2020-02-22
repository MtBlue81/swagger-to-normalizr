// @ts-nocheck
import path from 'path';
import { writeFilePromise, readTemplates, render } from './utils';

class ActionTypesGenerator {
  constructor({
    outputPath = '',
    schemasFilePath = '',
    templatePath = {},
    operationIdList = [],
    useTypeScript = false,
    extension = 'js',
  }) {
    this.outputPath = outputPath;
    const { dir, name, ext } = path.parse(this.outputPath);
    this.outputDir = dir;
    this.outputFileName = `${name}.${extension}`;
    this.schemasFilePath = schemasFilePath.replace(ext, '');
    this.templatePath = templatePath;
    this.operationIdList = operationIdList;
    this.templates = readTemplates(['head', 'actionTypes'], this.templatePath);
    this.appendId = this.appendId.bind(this);
    this.write = this.write.bind(this);
    this.useTypeScript = useTypeScript;
  }

  appendId(id) {
    this.operationIdList.push(id.toUpperCase());
  }

  /**
   * actionTypes.jsを書き出し
   */
  write() {
    const text = render(
      this.templates.actionTypes,
      {
        operationIdList: this.operationIdList,
        schemasFile: path.relative(this.outputDir, this.schemasFilePath),
        useTypeScript: this.useTypeScript,
      },
      {
        head: this.templates.head,
      },
    );
    return writeFilePromise(path.join(this.outputDir, this.outputFileName), text);
  }
}

module.exports = ActionTypesGenerator;