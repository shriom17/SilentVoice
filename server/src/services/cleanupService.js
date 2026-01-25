import cron from 'node-cron';
import Feedback from '../models/Feedback.js';

// Delete inactive feedback that has been inactive for more than 7 days
export const deleteExpiredInactiveFeedback = async () => {
    try {
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        const result = await Feedback.deleteMany({
            isActive: false,
            inactiveSince: { $lte: sevenDaysAgo, $ne: null }
        });

        console.log(`Cleanup job executed: ${result.deletedCount} inactive feedback(s) deleted`);
        return result.deletedCount;
    } catch (error) {
        console.error('Error in cleanup job:', error);
        throw error;
    }
};

// Schedule cleanup job to run daily at 2 AM
export const startCleanupScheduler = () => {
    // Cron expression: "0 2 * * *" means run at 2:00 AM every day
    cron.schedule('0 2 * * *', async () => {
        console.log('Running scheduled cleanup job for inactive feedback...');
        await deleteExpiredInactiveFeedback();
    });

    console.log('Cleanup scheduler started: Inactive feedback will be deleted after 7 days (runs daily at 2 AM)');
};
