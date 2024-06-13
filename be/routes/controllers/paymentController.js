const prisma = require('../utils/prisma');

const createPayment = async (req, res) => {
    try {
        const { amount, userId } = req.body;
        const payment = await prisma.payment.create({
            data: {
                amount: parseFloat(amount),
                description: 'Payment',
                userId: parseInt(userId)
            }
        });
        res.status(201).json(payment);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const getPayments = async (req, res) => {
    try {
        const payments = await prisma.payment.findMany({
            where: {
                userId: parseInt(req.params.userId)
            }
        });
        res.status(200).json(payments);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const getPaymentsByEmail = async (req, res) => {
    try {
        const payments = await prisma.payment.findMany({
            where: {
                user: {
                    email: req.params.email
                }
            }
        });
        res.status(200).json(payments);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = {createPayment, getPayments, getPaymentsByEmail};