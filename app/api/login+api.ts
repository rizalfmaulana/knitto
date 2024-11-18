export async function POST(request: Request, response: Response) {
  const body = await request.json();
  const key = "47110492-9fd8e97bcb9649c6f535f60ac";

  try {
    if (body.username !== "admin" || body.password !== "admin") {
      return new Response("Invalid credentials", {
        status: 401,
      });
    } else {
      return Response.json({ message: "Login successful", key });
    }
  } catch (error) {
    return new Response("Something went wrong", {
      status: 404,
    });
  }
}
