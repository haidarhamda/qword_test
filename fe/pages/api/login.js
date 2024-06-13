import axios from 'axios';

export default async function handler(req, res) {
    // const { url } = req.query;
    // console.log(req)
    console.log(req.body);
    const { email, password } = req.body;
    console.log(email);
    console.log(password);
    // console.log(req.query);
    try {
        const response = await axios({
            method: req.method,
            url: 'localhost:3001/users/login',
            data: { email, password },
            headers: {
                'Content-Type': 'application/json',
            },
        });
        res.status(200).json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json({ message: 'Error fetching data' });
    }
}