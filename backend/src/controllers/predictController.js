import { Prediction } from '../models/Prediction.js';

/**
 * Predicts burnout score, risk level, and generates actionable recommendation recommendations.
 */
const calculateBurnoutPrediction = (data) => {
  const { employeeName, department, workloadLevel, weeklyHours, jobSatisfaction, remoteWork, sickDays } = data;

  // 1. Workload contribution (Max 40 points)
  const workloadContrib = workloadLevel * 8; // 8 to 40

  // 2. Hours contribution (Max 35 points)
  // Working more than 40 hours increases risk, heavy load after 50
  let hoursContrib = 0;
  if (weeklyHours > 40) {
    hoursContrib = Math.min(35, (weeklyHours - 40) * 1.5);
  } else if (weeklyHours < 30) {
    // Underemployment/underwork can also have minor disengagement if satisfaction is low
    hoursContrib = Math.max(0, (30 - weeklyHours) * 0.5);
  }

  // 3. Satisfaction contribution (Max 30 points)
  // Lower satisfaction = higher burnout risk
  const satisfactionContrib = (6 - jobSatisfaction) * 6; // 6 to 30

  // 4. Sick days contribution (Max 15 points)
  const sickDaysContrib = Math.min(15, sickDays * 1.2);

  // 5. Remote work modifier
  // Remote work can reduce burnout if satisfaction is high, but increase it (isolation) if satisfaction is low
  let remoteModifier = 0;
  if (remoteWork) {
    remoteModifier = jobSatisfaction >= 3 ? -6 : 4;
  } else {
    remoteModifier = 2; // Commute stress
  }

  // Calculate Base
  let score = workloadContrib + hoursContrib + satisfactionContrib + sickDaysContrib + remoteModifier;

  // Add random variance (+/- 3%) to mock physical AI engine variance
  const variance = Math.floor(Math.random() * 7) - 3;
  score = Math.max(0, Math.min(100, Math.round(score + variance)));

  // Risk Classification
  let riskLevel = 'Low';
  let recommendation = '';

  if (score >= 70) {
    riskLevel = 'High';
    if (weeklyHours > 50) {
      recommendation = `CRITICAL: ${employeeName} has a high risk of burnout primarily driven by excessive hours (${weeklyHours} hrs/week). Immediate action: Enforce dynamic caps on weekly working hours, reallocate tasks, and mandate a minimum 3-day recovery leave.`;
    } else if (jobSatisfaction <= 2) {
      recommendation = `CRITICAL: ${employeeName} is suffering from acute job dissatisfaction (Rating: ${jobSatisfaction}/5) alongside high stress. Immediate action: Host a safe, confidential support dialogue, review potential role adjustments or team conflicts, and offer professional counseling resources.`;
    } else {
      recommendation = `CRITICAL: ${employeeName} displays severe signs of over-exhaustion. Immediate action: Temporarily scale back current project scope, reassign workload to other team members, and check in on mental health support options.`;
    }
  } else if (score >= 40) {
    riskLevel = 'Medium';
    if (weeklyHours > 45) {
      recommendation = `ALERT: Elevated risk detected. Recommend monitoring ${employeeName}'s overtime, introducing flexible hour arrangements, and ensuring they do not work on weekends or holidays.`;
    } else if (sickDays > 8) {
      recommendation = `ALERT: High sick leave rate (${sickDays} days) suggests underlying wellness issues. Suggest offering flexible work hours, wellness coaching, or health assistance benefits.`;
    } else {
      recommendation = `ALERT: Moderate risk. Suggest structured check-ins, encouraging usage of accumulated paid time off (PTO), and reviewing project timelines to prevent high stress transition.`;
    }
  } else {
    riskLevel = 'Low';
    if (jobSatisfaction >= 4) {
      recommendation = `EXCELLENT: ${employeeName} shows stable well-being. Continue supporting their positive environment and acknowledge their high satisfaction.`;
    } else {
      recommendation = `HEALTHY: Low burnout risks detected. Maintain active wellness communication. Suggest keeping an eye on job satisfaction factors to keep engagement high.`;
    }
  }

  return {
    predictedScore: score,
    riskLevel,
    recommendation
  };
};

export const createPrediction = async (req, res) => {
  const { employeeName, department, workloadLevel, weeklyHours, jobSatisfaction, remoteWork, sickDays } = req.body;
  const userId = req.user ? req.user.id : 'guest';

  try {
    const trimmedName = employeeName.trim();
    const analysis = calculateBurnoutPrediction({
      employeeName: trimmedName,
      department,
      workloadLevel,
      weeklyHours,
      jobSatisfaction,
      remoteWork,
      sickDays
    });

    // Check if an existing assessment already exists for this employee for this user (case-insensitive)
    const escapedName = trimmedName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    let prediction = await Prediction.findOne({
      userId,
      employeeName: { $regex: new RegExp(`^${escapedName}$`, 'i') }
    });

    if (prediction) {
      // Update the existing record instead of creating a duplicate
      prediction.employeeName = trimmedName;
      prediction.department = department;
      prediction.workloadLevel = workloadLevel;
      prediction.weeklyHours = weeklyHours;
      prediction.jobSatisfaction = jobSatisfaction;
      prediction.remoteWork = remoteWork;
      prediction.sickDays = sickDays;
      prediction.predictedScore = analysis.predictedScore;
      prediction.riskLevel = analysis.riskLevel;
      prediction.recommendation = analysis.recommendation;
      await prediction.save();

      return res.status(200).json({
        success: true,
        message: 'Burnout prediction updated successfully.',
        prediction
      });
    }

    // Create a new record if employee does not exist yet
    prediction = await Prediction.create({
      userId,
      employeeName: trimmedName,
      department,
      workloadLevel,
      weeklyHours,
      jobSatisfaction,
      remoteWork,
      sickDays,
      ...analysis
    });

    return res.status(201).json({
      success: true,
      message: 'Burnout prediction calculated successfully.',
      prediction
    });
  } catch (error) {
    console.error('Error creating prediction:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error calculating burnout prediction.'
    });
  }
};

export const getPredictions = async (req, res) => {
  const userId = req.user ? req.user.id : 'guest';

  try {
    // Return latest first
    const predictions = await Prediction.find({ userId }).sort({ updatedAt: -1, createdAt: -1 });

    // Deduplicate by employeeName (case-insensitive) to ensure only 1 entry per person is returned
    const seen = new Set();
    const uniquePredictions = [];
    for (const item of predictions) {
      const key = item.employeeName?.trim().toLowerCase();
      if (key && !seen.has(key)) {
        seen.add(key);
        uniquePredictions.push(item);
      }
    }

    return res.status(200).json({
      success: true,
      predictions: uniquePredictions
    });
  } catch (error) {
    console.error('Error fetching predictions:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error retrieving predictions list.'
    });
  }
};

export const deletePrediction = async (req, res) => {
  const { id } = req.params;
  const userId = req.user ? req.user.id : 'guest';

  try {
    const prediction = await Prediction.findById(id);
    if (!prediction) {
      return res.status(404).json({
        success: false,
        message: 'Prediction record not found.'
      });
    }

    // Authorization check
    if (prediction.userId !== userId) {
      return res.status(403).json({
        success: false,
        message: 'Unauthorized to delete this prediction record.'
      });
    }

    await Prediction.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: 'Prediction record deleted successfully.'
    });
  } catch (error) {
    console.error('Error deleting prediction:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error deleting prediction record.'
    });
  }
};
