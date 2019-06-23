const readline = require('readline'),
  fs = require('fs');

const fileName = 'test.js',
  options = {flags: 'w'};

let readFile = readline.createInterface({
    input: fs.createReadStream(`../${fileName}`)
  }),
  // create stream for writing file without comments;
  writeStream = fs.createWriteStream(`./result/${fileName}`, options);


readFile.on('line', deleteComments());
readFile.on('close', () => writeStream.end());

const singleLineComment = '//',
  startMultilineComment = '/*',
  endMultilineComment = '*/',
  commentLength = 2;
  
function deleteComments(line) {
  let isMultiline = false;

  return function (line) {
    const isContainsSingleLineComment = line.includes(singleLineComment),
      isContainsStartMultilineComment = line.includes(startMultilineComment),
      isContainsEndMultilineComment = line.includes(endMultilineComment),
      isContainsMultilineComment = isContainsStartMultilineComment && isContainsEndMultilineComment;

    const startCommentIndex = line.indexOf(startMultilineComment);
      endCommentIndex = line.indexOf(endMultilineComment),
      startSingleCommentIndex = line.indexOf(singleLineComment);

    let cutLine;

    if(isMultiline) {
      if(isContainsEndMultilineComment) {
        cutLine = line.slice(endCommentIndex + commentLength);

        if(cutLine.length) {
            writeStream.write(`${cutLine}\n`);
        }

        isMultiline = false;
      }
    }
    else {
      if(isContainsMultilineComment) {
        let comment = line.substring(startCommentIndex, endCommentIndex + commentLength);

        writeStream.write(`${line.replace(comment, '')}\n`);
      }
      else if (isContainsStartMultilineComment) {
        cutLine = line.slice(0, startCommentIndex);

        if(cutLine.length) {
            writeStream.write(`${cutLine}\n`);
        }

        isMultiline = true;
      }
      else if (isContainsSingleLineComment) {
        cutLine = line.slice(0, startSingleCommentIndex);

        if(cutLine.length) {
            writeStream.write(`${cutLine}\n`);
        }
      }
      else {
        // otherwise write unchanged line
        writeStream.write(`${line}\n`);
      }
    }
  }
};
