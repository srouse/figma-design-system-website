import { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import faunadb from 'faunadb';

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  const q = faunadb.query
  const secret = process.env.FAUNADB_SECRET;

  if (typeof secret === 'undefined' || secret === '') {
    console.error('The FAUNADB_SECRET environment variable is not set, exiting.');
    process.exit(1);
  }

  const endpoint = 'https://db.fauna.com/';

  var mg, domain, port, scheme
  if ((mg = endpoint.match(/^(https?):\/\/([^:]+)(:(\d+))?/))) {
    scheme = mg[1] || 'https'
    domain = mg[2] || 'db.fauna.com'
    port = mg[4] || 443
  }

  // Instantiate a client
  const client = new faunadb.Client({
    secret: secret,
    domain: domain,
    port: port as any,
    scheme: scheme as any,
  });

  const requestBody = event.body ? JSON.parse(event.body) : undefined;
  if (!requestBody) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'no data sent' }),
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    };
  }
  const id = await client.query(q.NewId());
  let error: object | undefined;
  const result = await client.query(
    // q.CreateCollection({ name: 'myCollection' })
    q.Create(
      q.Ref(q.Collection('FDS'), id),
      {
        data: {
          wid: requestBody.wid,
          tokens:requestBody.tokens,
        },
      },
    )
  )
  .catch((err) => {
    error = [
      'Error: [%s] %s: %s',
      err.name,
      err.message,
      err.errors()[0].description
    ];
  });

  if (result) {
    return {
      statusCode: 200,
      body: JSON.stringify({ message: result }),
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    };
  }

  if (error) {
    return {
      statusCode: 200,
      body: JSON.stringify({ message: error }),
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'nothing done' }),
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  };
};

export { handler };