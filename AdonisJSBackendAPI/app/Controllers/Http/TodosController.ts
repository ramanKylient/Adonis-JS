import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Todo from "App/Models/Todo";

export default class TodosController {

    // GET /todo
    public async index({ response }: HttpContextContract) {
        const todos = await Todo.query();
        return response.json(todos);
    }

    // GET /todo/:id
    public async show({ response, params }: HttpContextContract) {
        try {
            const todo = await Todo.find(params.id);
            response.abortIf(!todo, "Todo not found", 404);
            if (todo) {
                return response.status(200).json({
                    success: true,
                    message: 'Data retrive successful',
                    data: todo,
                });
            }
        } catch (error) {
            return response.status(500).json({
                success: false,
                message: 'Data retrieval unsuccessful',
                error: error.message,
            });
        }
    }

    // POST /todo
    public async create({ request, response }: HttpContextContract) {
        try {
            const payload = request.only(['title', 'desc', 'done']);

            const todo = await Todo.create(payload);

            return response.status(200).json({
                success: true,
                message: 'Todo creation successful',
                data: todo,
            });
        } catch (error) {
            return response.status(500).json({
                success: false,
                message: 'Todo creation faild',
                error: error.message,
            });
        }
    }

    // PUT /todo/:id
    public async update({ request, response, params }: HttpContextContract) {
        try {
            const todo = await Todo.findOrFail(params.id);
            response.abortIf(!todo, "Todo not found", 404);
            const payload = request.only(['title', 'desc', 'done']);
            todo.merge(payload);
            await todo.save();
            return response.status(200).json({
                success: true,
                message: 'Update Successful',
                data: todo,
            });
        } catch (error) {
            return response.status(500).json({
                success: false,
                message: 'Update Unsuccessful',
                error: error.message,
            })
        }
    }

    // DELETE /post/:id
    public async delete({ response, params }: HttpContextContract) {
        try {
            const todo = await Todo.findOrFail(params.id);
            response.abortIf(!todo, "Todo not found", 404);
            await todo.delete();
            return response.status(200).json({
                success: true,
                message: "Delete Successful",
                data: todo,
            });
        } catch (error) {
            return response.status(401).json({
                success: false,
                message: 'Delete Unsuccessful',
                error: error.message,
            })
        }
    }


}
