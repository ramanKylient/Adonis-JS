import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User';

export default class AuthController {
    public async login({ request, auth }: HttpContextContract) {

        try {
            const email = request.input("email");
            const password = request.input("password");

            const token = await auth.use("api").attempt(email, password, {
                expiresIn: "10 days",
            });

            return {
                success: true,
                message: 'Login successful',
                data: token.toJSON(),
            };
        } catch (error) {
            return {
                success: false,
                message: 'Login failed',
                error: error.message,
            };
        }
    }

    public async register({ request, auth }: HttpContextContract) {
        const name = request.input('name');
        const email = request.input('email');
        const password = request.input('password');

        try {
            const user = await User.create({ name, email, password });
            const token = await auth.use('api').login(user, {
                expiresIn: '10 days',
            });

            return {
                success: true,
                message: 'Registration successful',
                data: token.toJSON(),
            };
        } catch (error) {
            return {
                success: false,
                message: 'Registration failed',
                error: error.message,
            };
        }
    }
}
