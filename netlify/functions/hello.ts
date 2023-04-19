import { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import faunadb from 'faunadb';
import { v4 as uuidv4 } from 'uuid';

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

  let error: object | undefined;
  const result = await client.query(
    // q.CreateCollection({ name: 'myCollection' })
    q.Create(
      q.Ref(q.Collection('FDS')),
      {
        data: {
          type: 'apple',
          colors: ['red', 'green'],
          quantity: 15,
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
      test: event
    };
  }

  if (error) {
    return {
      statusCode: 200,
      body: JSON.stringify({ message: error }),
      test: event
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Hello World", test: process.env.test }),
  };
};

export { handler };