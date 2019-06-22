import LineReader from 'browser-line-reader';

const comment = {
    oneLine: '//',
    multiline: {
      startComment: '/*',
      endComment: '*/',
      nmbSymbolComment: 2
    }
  },
  allowedExt = /(\.js)$/i;

function deleteComment (file) {
  const fileName = file.name,
    FILE_ERROR = 'File not found or invalid file type';

  let result = [];

  if(!file || !allowedExt.exec(fileName)) {
    return FILE_ERROR;
  }

  return new Promise((resolve, reject) => {
    let lineReader = new LineReader(file),
      isMultilineComment = false;

      // if set true lines below will be excluded
      lineReader.readLines((line) => {
        let isIncludeEndMultilineComment = line.includes(comment.multiline.endComment),
          startIndexCommment = line.indexOf(comment.multiline.startComment),
          endIndexCommment = line.indexOf(comment.multiline.endComment),
          startIndexSingleLineComment = line.indexOf(comment.oneLine),
          cuttedLine, commentText;

        if(!isMultilineComment) {
          let isIncludeStartMultilineComment =  line.includes(comment.multiline.startComment),
              isIncludeOneLineComment = line.includes(comment.oneLine);

          let commentCases = {
            isStartOneLineComment: isIncludeOneLineComment,
            isStartEndMultilineComment: isIncludeStartMultilineComment && isIncludeEndMultilineComment,
            // if multiline comment placed on one line
            isStartMultilineComment: isIncludeStartMultilineComment && !isIncludeEndMultilineComment
          };

          if(commentCases.isStartEndMultilineComment) {
            // remove multiline comment from line
            commentText = line.substring(startIndexCommment, endIndexCommment + comment.multiline.nmbSymbolComment);
            result.push(line.replace(commentText, ''));
          }
          else if (commentCases.isStartMultilineComment) {
            isMultilineComment = true;
            cuttedLine = line.slice(0, startIndexCommment);

            if(cuttedLine.length) {
              result.push(cuttedLine);
            }
          }
          else if(commentCases.isStartOneLineComment) {
            cuttedLine = line.slice(0, startIndexSingleLineComment);

            if(cuttedLine.length) {
                result.push(cuttedLine);
            }
          }
          else if(!commentCases.isStartOneLineComment) {
            result.push(line);
          }
      }
      else if(isMultilineComment && isIncludeEndMultilineComment) {
        cuttedLine = line.slice(endIndexCommment + comment.multiline.nmbSymbolComment);

        if(cuttedLine.length) {
          result.push(cuttedLine);
        }

        isMultilineComment = false;
      }
    })
      .then((numLinesRead) => {
        resolve(result);
      })
      .catch((err) => {
        reject(err);
      });
  });
}


const fileInput = document.getElementsByClassName('file-input')[0],
  resultContainer = document.getElementsByClassName('result-container')[0];

const CHANGE_ACTION = 'change';

fileInput.addEventListener(CHANGE_ACTION, (e) => {
  let currInput = e.currentTarget,
    currFile = currInput.files[0];

  let result = deleteComment(currFile);
  result
    .then( (result) => resultContainer.innerHTML = result.join('\n'))
    .catch( (err) => resultContainer.innerHTML = err)
});
