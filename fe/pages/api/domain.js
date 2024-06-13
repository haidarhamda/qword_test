import axios from 'axios';

export default async function handler(req, res) {
    const { url } = req.query;
    console.log(url);
    console.log(req.query);
    try {
        const response = await axios.get(url);
        res.status(200).json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json({ message: 'Error fetching data' });
    }
}

// export default function handler(
//   req,
//   res
// ) {
//   res.status(200).json({ message: 'Hello from Next.js!' })
// }