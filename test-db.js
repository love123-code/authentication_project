import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

console.log('MONGO_URI:', process.env.MONGO_URI);

const testConnection = async () => {
    const timeoutPromise = new Promise((resolve) => {
        setTimeout(() => {
            console.error('✗ Connection timed out after 10 seconds');
            process.exit(1);
        }, 10000);
    });

    try {
        await Promise.race([
            mongoose.connect(process.env.MONGO_URI),
            timeoutPromise
        ]);
        console.log('✓ MongoDB connected successfully');
        await mongoose.connection.close();
        console.log('✓ Connection closed');
        process.exit(0);
    } catch (error) {
        console.error('✗ Error:', error.code);
        console.error('✗ Message:', error.message);
        if (error.message.includes('ENOTFOUND') || error.message.includes('ETIMEDOUT')) {
            console.error('\nPossible causes:');
            console.error('1. IP not whitelisted in MongoDB Atlas');
            console.error('2. Network/firewall blocking connection');
            console.error('3. Incorrect cluster URL');
        }
        process.exit(1);
    }
};

testConnection();
