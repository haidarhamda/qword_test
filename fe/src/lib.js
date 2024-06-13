import { cookies } from "next/headers";

export async function login(formData) {
    const user = formData.get('user');
    const token = formData.get('token');

    const expires = new Date(Date.now() + 30 * 60 * 60 * 24);
    
    cookies.set('user', user, {expires});
    cookies.set('token', token, {expires});
}