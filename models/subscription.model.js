import mongoose from 'mongoose';

const subscriptionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Subscription must belong to a user']
  },
  plan: {
    type: String,
    enum: ['basic', 'premium', 'pro'],
    required: [true, 'Subscription must have a plan']
  },
  startDate: {
    type: Date,
    default: Date.now
  },
  endDate: {
    type: Date,
    required: [true, 'Subscription must have an end date']
  },
  status: {
    type: String,
    enum: ['active', 'cancelled', 'expired'],
    default: 'active'
  },
  autoRenew: {
    type: Boolean,
    default: true
  },
  paymentMethod: {
    type: String,
    required: [true, 'Payment method is required']
  },
  lastPaymentDate: {
    type: Date
  },
  nextPaymentDate: {
    type: Date
  },
  price: {
    type: Number,
    required: [true, 'Subscription must have a price']
  },
  currency: {
    type: String,
    default: 'USD'
  }
}, {
  timestamps: true
});

// Pre-save hook to calculate nextPaymentDate if missing
subscriptionSchema.pre('save', function(next) {
  if (!this.nextPaymentDate && this.endDate) {
    // Assuming the renewal period is monthly
    const renewalPeriod = 30 * 24 * 60 * 60 * 1000; // 30 days in milliseconds
    this.nextPaymentDate = new Date(this.endDate.getTime() + renewalPeriod);
  }
  if (this.nextPaymentDate < new Date()) {
    this.status = "expired"
  }
  next();
});

// Index to improve query performance
subscriptionSchema.index({ user: 1, status: 1 });

// Virtual property to check if the subscription is active
subscriptionSchema.virtual('isActive').get(function() {
  return this.status === 'active' && this.endDate > new Date();
});

// Instance method to renew the subscription
subscriptionSchema.methods.renew = async function(duration) {
  const newEndDate = new Date(this.endDate.getTime() + duration);
  this.endDate = newEndDate;
  this.status = 'active';
  await this.save();
};

// Static method to find active subscriptions
subscriptionSchema.statics.findActiveSubscriptions = function() {
  return this.find({ 
    status: 'active', 
    endDate: { $gt: new Date() } 
  });
};

const Subscription = mongoose.model('Subscription', subscriptionSchema);

export default Subscription;