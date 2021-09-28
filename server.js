import koa from 'koa';
import router from 'koa-router';
const routee = new router();
const send = require('koa-send');
import bodyparser from "koa-body";

const app = new koa();

routee.post('/message',async (ctx,next) => {
  const params_  = Object.keys(ctx.request.body);
  if(params_.indexOf('conversation_id') !== -1 && params_.indexOf('message') !== -1){
    const wordSplit = ctx.request.body.message.toLowerCase().split(' ');
    let words = ["hello","hi","goodbye","bye"];
    let high;
    for (let i = 0; i < wordSplit.length; i++) {
      let found = words.indexOf(wordSplit[i])
      if(found !== -1){
        high = words[found];
        break;
      }
    }
    let response = {
      "response_id":ctx.request.body.conversation_id,
      "message":""
    }
    switch(high) {
      case "hi":
      case "hello":
      response.message = "Welcome to Station Five";
      break;
      case "bye":
      case "goodbye":
      response.message = "Thank you, see you around";
      break;
      default:
      response.message = "Sorry, I don’t understand.";
    }

    ctx.body = response;
    ctx.status = 200;

  }else{
    ctx.body = "Parameters is incorrect. Correct parameters was 'conversation_id' & 'message' in JSON Format";
    ctx.status = 400;
  }
});

app.use(bodyparser({
		"multipart": false,
		"json":true,
		"form":true
	}))
  .use(routee.routes())
  .use(routee.allowedMethods());

app.listen(3020, () => {
  console.log("Started server on port 3020");
});
