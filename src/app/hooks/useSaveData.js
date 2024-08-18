export const useSaveData = () => {
    const saveData = async (data) => {
      const response = await fetch('/api/saveData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      if (response.ok) {
        const result = await response.json();
        console.log(result.message);
      } else {
        console.error('Failed to save data');
      }
    };
  
    return { saveData };
  };
  