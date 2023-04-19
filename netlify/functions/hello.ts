import { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import faunadb from 'faunadb';

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {

  const q = faunadb.query

  // Acquire the secret and optional endpoint from environment variables
  const secret = process.env.FAUNADB_SECRET;
  var endpoint = process.env.FAUNADB_ENDPOINT;

  if (typeof secret === 'undefined' || secret === '') {
    console.error('The FAUNADB_SECRET environment variable is not set, exiting.');
    process.exit(1);
  }

  if (!endpoint) endpoint = 'https://db.fauna.com/'

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

  // Create a collection called 'myCollection'
  const result = await client.query(
    // q.CreateCollection({ name: 'myCollection' })
    q.Create(
      q.Ref(q.Collection('FDS'), '1'),
      {
        data: {
          type: 'apple',
          colors: ['red', 'green'],
          quantity: 15,
        },
      },
    )
  )
  .catch((err) => console.error(
    'Error: [%s] %s: %s',
    err.name,
    err.message,
    err.errors()[0].description,
  ))

  if (result) {
    console.log(result);
    return {
      statusCode: 200,
      body: JSON.stringify({ message: result }),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Hello World", test: process.env.test }),
  };
};

export { handler };