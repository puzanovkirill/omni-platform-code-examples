function getGreeting() {
  const greetings: string[] = ['night', 'morning', 'day', 'evening'];
  const timeOfDay = Math.trunc(new Date().getHours() / 6);
  return greetings[timeOfDay];
}

export default getGreeting;
