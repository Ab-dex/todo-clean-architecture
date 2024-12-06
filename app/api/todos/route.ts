import { getTodosController } from "@/src/interface-adapters/controllers/todos.controller"

export const dynamic = 'force-dynamic'

export async function GET(
  request: Request,
  { params }: { params: { fingerprint: string } }
) {
    const todos = await getTodosController()

  return Response.json({ success: true, data: todos }, { status: 200 })
}
