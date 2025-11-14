// utils/healthTips.js
export const healthTips = [
    "Drink at least 8 glasses of water daily.",
    "Get 7-8 hours of sleep nightly.",
    "Eat at least 5 servings of fruits and vegetables.",
    "Practice deep breathing for 5 minutes daily.",
    "Limit sugar and processed foods.",
    "Take a 10-minute walk every day.",
    "Take regular breaks from screens.",
    "Do strength training twice a week.",
    "Maintain good posture throughout the day.",
    "Wash hands frequently to avoid germs.",
    "Walk 15000 stepsevery day."
  ];
  
  export const getDailyTips = () => {
    const today = new Date();
    const seed = today.getDate() + today.getMonth() + today.getFullYear();
  
    const shuffled = [...healthTips].sort(() => 0.5 - Math.random() + seed * 0.0001);
    return shuffled.slice(0, 3); // pick 3 tips daily
  };
  