export async function POST(request: Request) {
  const body = await request.json();

  try {
    return Response.json({ body });
  } catch (error) {
    return Response.json({ error });
  }
}

// export function GET(request: Request) {
//   return Response.json({ hello: "world" });
// }
