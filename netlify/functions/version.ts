import { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {

  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      },
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ version: 'v0.0.7' }),
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  };
};

export { handler };