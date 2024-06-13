const prisma = require('../utils/prisma');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY || 'secret';
const saltRounds = 10;

const login = async (req, res) => {
    const { email, password } = req.body;
    try{
        const user = await prisma.user.findFirst({
            where: {
            email: email,
            },
        });
        console.log(user);
        console.log(String(email));
        console.log(String(password));
        bcrypt.compare(password, user.password, (err, result) => {
            if (err) {
                res.status(500).json({ message: err.message });
                return;
            }
            if (result) {
                res.status(200).json({ message: 'Login success',
                    user: user,
                    token: jwt.sign(req.body, secretKey, { expiresIn: '30d' })
                });
            } else {
                res.status(401).json({ message: 'Login failed' });
            }
        })
    }
        // if (user && user.password === password) {
        //     res.status(200).json({ message: 'Login success',
        //         token: jwt.sign(req.body, secretKey, { expiresIn: '30d' })
        //      });
        // } else {
        //     res.status(401).json({ message: 'Login failed' });
        // }
    // }
    catch(err){
        res.status(500).json({ message: err.message });
    }
}

const register = async (req, res) => {
    const { email, name, password } = req.body;
    try{
        const existingUser = await prisma.user.findFirst({
            where: {
                email: email,
            },
        });
        if (existingUser) {
            res.status(400).json({ message: 'User already exists' });
            return;
        }
        bcrypt.hash(password, saltRounds, async (err, hash) => {
            if (err) {
                res.status(500).json({ message: err.message });
                return;
            }
            const user = await prisma.user.create({
                data: {
                    email: email,
                    name: name,
                    password: hash,
                },
            });
            res.status(201).json({ message: 'User created',});
        });
    }
        // const user = await prisma.user.create({
        //     data: {
        //         email: email,
        //         name: name,
        //         password: password,
        //     },
        // });
        // res.status(201).json(user);
    // }
    catch(err){
        res.status(500).json({ message: err.message });
    }
}

module.exports = {login,register};