const Greeting = () => {
    const getGreeting = () => {
      const currentHour = new Date().getHours(); // Get the current hour (0 - 23)
      
      if (currentHour < 12) {
        return 'Good Morning';
      } else if (currentHour < 18) {
        return 'Good Afternoon';
      } else {
        return 'Good Evening';
      }
    };
  
    return getGreeting();
  };
  
  export default Greeting;
  