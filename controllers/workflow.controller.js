import { createRequire } from 'module';
import Subscription from '../models/subscription.model';
import dayjs from 'dayjs';
import { log } from 'console';
const require = createRequire(import.meta.url);
const { serve } = require('@upstash/workflow/express');

const REMINDERS = [1, 2, 3, 4, 5, 7]

export const sendReminders = serve(async (context) => {
    const { subscriptionId } = context.requestPayload;

    const subscription = await fetchSubscription(context, subscriptionId);

    if (!subscription || subscription.status !== 'active') {
        return
    }
    const renewalDate = dayjs(subscription.renewalDate);

    if (renewalDate.isBefore(dayjs())) {
        return
    }
    for (const daysBefore of REMINDERS) {
        const remiderDate = renewalDate.subtract(daysBefore, "day")

        if (remiderDate.isAfter(dayjs())) {
            await sleepUntilReminder(context, `Reminder ${daysBefore} days before`, remiderDate)
        }

        await triggerReminder(context, )
    }


    // const daysUntilRenewal = renewalDate.diff(dayjs(), 'day');

})

const sleepUntilReminder = async (context, label, date) => {
    console.log("Sleep until " + date);

    await context.sleepUntil(label, date.toDate())

}

const triggerReminder = async(context, label) => {
        return await context.run(label, () => {
            console.log('Triggering reminder');
            // sms , email ...
            
        })
}

const fetchSubscription = async (context, subscriptionId) => {
    return await context.run('get subscription', () => {
        return Subscription.findById(subscriptionId).populate('user', 'name email');
    })
}
